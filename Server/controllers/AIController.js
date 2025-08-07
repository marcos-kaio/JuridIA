import { callGeminiForComparison } from '../services/geminiService.js';
import { generatePdfFromMarkdown } from '../utils/generatePdf.js';
import { Document, Chat, User } from '../models/db.js';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function simplifyPdfBuffer(buffer, userId) {
  const user = await User.findByPk(userId);
  const educationLevel = user ? user.escolaridade : 'medio'; // Padrão medio

  const { text } = await pdfParse(buffer);

  let attempts = 0;
  const maxAttempts = 3;
  let simplifiedJson;

  while (attempts < maxAttempts) {
    try {
      // Passa o nível de escolaridade para a chamada da API
      simplifiedJson = await callGeminiForComparison(text, educationLevel);

      const comparisonData = simplifiedJson.comparison;
      const title = simplifiedJson.title;

      const simplifiedMarkdown = comparisonData
        .map((pair) => pair.simplified)
        .join('\n\n');
      const simplifiedPdf = await generatePdfFromMarkdown(simplifiedMarkdown);

      return {
        originalText: text,
        title: title,
        comparisonData: comparisonData,
        pdf: simplifiedPdf,
      };
    } catch (error) {
      attempts++;
      if (error.status === 503 && attempts < maxAttempts) {
        console.log(
          `Modelo sobrecarregado. Tentativa ${attempts} de ${maxAttempts}. Tentando novamente em 2 segundos...`
        );
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
    if (!pdfBuffer || !userId) throw new Error('Faltando arquivo ou usuário.');

    // A chamada à função agora inclui o userId
    const { originalText, title, comparisonData, pdf } =
      await simplifyPdfBuffer(pdfBuffer, userId);

    doc = await Document.create({
      userId,
      originalText,
      title,
      comparisonData,
      simplifiedUrl: pdf,
      status: 'done',
    });

    if (doc) {
      await Chat.create({
        documentId: doc.id,
        role: 'ai',
        content:
          'Seu documento foi simplificado! Em que posso ajudar? Fique à vontade para perguntar qualquer coisa sobre o conteúdo.',
      });
    }

    res.setHeader('X-Document-Id', doc.id);
    res.status(200).json({
      message: 'Documento simplificado com sucesso!',
      documentId: doc.id,
    });
  } catch (err) {
    console.error('Erro no AIController:', err);
    const errorMessage =
      err.status === 503
        ? 'A IA está sobrecarregada no momento. Por favor, tente novamente mais tarde.'
        : 'Falha ao simplificar documento.';

    res.status(500).json({ error: errorMessage });
    if (doc) await doc.update({ status: 'error' });
  }
}
