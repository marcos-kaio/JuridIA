import { callGeminiForComparison } from "../services/geminiService.js";
import { generatePdfFromMarkdown } from "../utils/generatePdf.js";
import { Document, Chat } from "../models/db.js"; // Importar o modelo Chat
import pdfParse from "pdf-parse/lib/pdf-parse.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function simplifyPdfBuffer(buffer) {
  const { text } = await pdfParse(buffer);
  
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const simplifiedJson = await callGeminiForComparison(text);
      const comparisonData = simplifiedJson.comparison;
      const title = simplifiedJson.title; // Extrai o novo título
      
      const simplifiedMarkdown = comparisonData.map(pair => pair.simplified).join('\n\n');
      const simplifiedPdf = await generatePdfFromMarkdown(simplifiedMarkdown);
      
      return { 
        originalText: text, 
        title: title, // Retorna o título
        comparisonData: comparisonData,
        pdf: simplifiedPdf 
      };
    } catch (error) {
      attempts++;
      if (error.status === 503 && attempts < maxAttempts) {
        console.log(`Modelo sobrecarregado. Tentativa ${attempts} de ${maxAttempts}. Tentando novamente em 2 segundos...`);
        await delay(2000);
      } else {
        throw error;
      }
    }
  }
}

export default async function AIController(req, res) {
  let doc;
  const pdfBuffer = req.file?.buffer;
  const userId = req.user?.id;

  try {
    if (!pdfBuffer || !userId) throw new Error("Faltando arquivo ou usuário.");

    const { originalText, title, comparisonData, pdf } = await simplifyPdfBuffer(pdfBuffer);

    doc = await Document.create({
      userId,
      originalText,
      title, // Salva o título no banco
      comparisonData,
      simplifiedUrl: pdf,
      status: "done",
    });

    // Adiciona a mensagem inicial do bot ao histórico do chat
    if (doc) {
        await Chat.create({
            documentId: doc.id,
            role: 'ai',
            content: 'Seu documento foi simplificado! Em que posso ajudar? Fique à vontade para perguntar qualquer coisa sobre o conteúdo.'
        });
    }

    res.setHeader('X-Document-Id', doc.id);
    res.status(200).json({
      message: "Documento simplificado com sucesso!",
      documentId: doc.id
    });
    
  } catch (err) {
    console.error("Erro no AIController:", err);
    const errorMessage = err.status === 503 
      ? "A IA está sobrecarregada no momento. Por favor, tente novamente mais tarde."
      : "Falha ao simplificar documento.";
      
    res.status(500).json({ error: errorMessage });
    if (doc) await doc.update({ status: "error" });
  }
}