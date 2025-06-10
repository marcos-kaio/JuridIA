import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_TOKEN }); // inclua um arquivo .env no diretório server com a API Key

export async function callGemini(pdfBuffer) {
  // configuração para análise da API
  const base64 = pdfBuffer.toString("base64");
  const contents = [
    { text: "Simplifique este documento para leigos:" },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: base64,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });

  return response.text;
}
