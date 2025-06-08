import { callGemini } from "../services/geminiService.js";
import { generatePdf } from "../utils/generatePdf.js";

export default async function AIControler(req, res) {
  try {
    const pdfBuffer = req.file.buffer; // recebe arquivo do buffer
    const simplifiedText = await callGemini(pdfBuffer); // envia pdf para a API
    
    // const outPdfBuffer = await generatePdf(simplifiedText); // gera pdf a partir da resposta
    // console.log('Tamanho do PDF gerado:', outPdfBuffer.length);

    res
      .header("Content-Type", "text")
      //.header("Content-Disposition", 'attachment; filename="simplificado.pdf"')
      .send(simplifiedText); // retornando por enquanto em formato de texto
  } catch (err) {
    console.error("AIController error: ", err);
    res.status(500).json({ error: "erro ao simplificar o documento." });
  }
}
