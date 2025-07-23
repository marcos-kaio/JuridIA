import { callGeminiForComparison } from "../services/geminiService.js";
import { generatePdfFromMarkdown } from "../utils/generatePdf.js"; // Precisamos desta função de volta
import { Document } from "../models/db.js";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

// Função auxiliar para esperar um tempo (delay)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function simplifyPdfBuffer(buffer) {
  const { text } = await pdfParse(buffer);
  
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      const simplifiedJson = await callGeminiForComparison(text);
      const comparisonData = simplifiedJson.comparison;

      // 1. Juntar todos os textos simplificados do JSON em um único texto (Markdown)
      const simplifiedMarkdown = comparisonData.map(pair => pair.simplified).join('\n\n');
      
      // 2. Gerar o PDF a partir desse texto Markdown
      const simplifiedPdf = await generatePdfFromMarkdown(simplifiedMarkdown);

      // 3. Retornar tudo o que precisamos
      return { 
        originalText: text, 
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

    const { originalText, comparisonData, pdf } = await simplifyPdfBuffer(pdfBuffer);

    doc = await Document.create({
      userId,
      originalText,
      comparisonData,
      simplifiedUrl: pdf, 
      status: "done",
    });

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