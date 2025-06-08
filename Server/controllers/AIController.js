import { callGemini } from "../services/geminiService.js";
import { generatePdf } from "../utils/generatePdf.js";

export default async function AIControler(req, res) {
  try {
    const pdfBuffer = req.file.buffer; // recebe arquivo do buffer
    const simplifiedText = await callGemini(pdfBuffer); // envia pdf para a API
    const outPdfBuffer = await generatePdf(simplifiedText); // transforma texto simplificado em pdf

    // retorna documento simplificado no formato pdf
    res
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", 'attachment; filename="simplificado.pdf"')
      .send(outPdfBuffer);
  } catch (err) {
    console.error("simplifyController error:", err);
    res.status(500).json({ error: "Erro ao simplificar o documento." });
  }
}
