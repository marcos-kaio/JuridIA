import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_TOKEN });

export function buildGeminiPdfPrompt(buffer) {
  return [
    { text: "Simplifique este documento para leigos:" },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: buffer.toString("base64"),
      },
    },
  ];
}

export async function callGemini(buffer) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: buildGeminiPdfPrompt(buffer),
  });
  return response.text;
}

export async function chatWithGemini(messages) {
  const contents = messages.map(m => ({ role: m.role, text: m.text }));
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });
  return response.text;
}
