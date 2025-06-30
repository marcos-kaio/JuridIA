import { callGemini } from "../services/geminiService.js";
import { generatePdf } from "../utils/generatePdf.js";
import { Document } from "../models/db.js";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export default async function AIControler(req, res) {
  let doc;
  try {
    const pdfBuffer = req.file.buffer; // recebe arquivo do buffer
    // requere userId para armazenar o documento - estrutura de teste por enquanto
    const userId = Number(req.body.userId);

    const { text: originalText } = await pdfParse(pdfBuffer); // extrai texto do pdf

    // aloca informações iniciais na tabela
    doc = await Document.create({
      userId,
      originalUrl: pdfBuffer,
      simplifiedUrl: null,  
      originalText,
      status: "processing",
    });

    const simplifiedText = await callGemini(doc.originalUrl); // envia pdf para a API
    const outPdfBuffer = await generatePdf(simplifiedText); // transforma texto simplificado em pdf

    // atualiza banco de dados com blob do pdf simplificado
    await doc.update({
      simplifiedUrl: outPdfBuffer,
      status: "done",
    });

    // retorna documento simplificado no formato pdf
    res
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", 'attachment; filename="simplificado.pdf"')
      .send(doc.simplifiedUrl);
  } catch (err) {
    console.error("simplifyController error:", err);
    res.status(500).json({ error: "Erro ao simplificar o documento." });
    if (doc) await doc.update({ status: "error" });
  }
}
