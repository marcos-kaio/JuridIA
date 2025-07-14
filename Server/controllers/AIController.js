import { callGeminiPdf } from "../Server/services/geminiService.js";
import { generatePdfFromMarkdown } from "../Server/utils/generatePdf.js";
import { Document } from "../Server/models/db.js";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function simplifyPdfBuffer(buffer) {
  const { text } = await pdfParse(buffer);
  const simplifiedText = await callGeminiPdf(buffer);
  const pdf = await generatePdfFromMarkdown(simplifiedText);
  return { originalText: text, simplifiedText, pdf };
}

export default async function AIController(req, res) {
  let doc;
  const pdfBuffer = req.file?.buffer;
  const userId = req.user?.id;

  try {
    if (!pdfBuffer || !userId) throw new Error("Faltando arquivo ou usuário.");

    const { originalText, pdf } = await simplifyPdfBuffer(pdfBuffer);

    doc = await Document.create({
      userId,
      originalUrl: pdfBuffer,
      simplifiedUrl: null,
      originalText,
      status: "processing",
    });

    await doc.update({ simplifiedUrl: pdf, status: "done" });

    res
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", 'attachment; filename="simplificado.pdf"')
      .send(pdf);
  } catch (err) {
    console.error("Erro no AIController:", err);
    res.status(500).json({ error: "Falha ao simplificar documento." });
    if (doc) await doc.update({ status: "error" });
  }
}