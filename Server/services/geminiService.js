import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

export function buildGeminiComparisonPrompt(originalText) {
  return (
    `Você é um assistente jurídico especializado em simplificar documentos complexos.
    Analise o seguinte texto de contrato, gere um título curto e descritivo para ele, e depois divida-o em parágrafos ou cláusulas significativas.
    
    Sua resposta DEVE ser um objeto JSON contendo duas chaves: "title" e "comparison".

    - "title": Uma string contendo o título. O título deve ser conciso e focar no objeto principal e nas partes envolvidas. EVITE começar com palavras como "Contrato de".
    - "comparison": Um array de objetos, onde cada objeto tem duas chaves: "original" e "simplified".

    Exemplos de Títulos Bons:
    - "Representação Artística: A. Monteiro e I. Nascimento"
    - "Aluguel de Imóvel Residencial"
    - "Prestação de Serviços de Design Gráfico"

    Exemplo de Resposta Completa:
    {
      "title": "Representação Artística: A. Monteiro e I. Nascimento",
      "comparison": [
        {
          "original": "Pelo presente instrumento particular de contrato...",
          "simplified": "Este contrato é feito entre duas partes..."
        }
      ]
    }

    Texto do Contrato para Análise:
    ---
    ${originalText}`
  );
}

export async function callGeminiForComparison(text) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = buildGeminiComparisonPrompt(text);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const jsonText = response.text();
  return JSON.parse(jsonText);
}

export async function chatWithGemini(history, systemInstruction, userMessage) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction,
  });

  const chat = model.startChat({ history: history });
  
  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  return response.text();
}