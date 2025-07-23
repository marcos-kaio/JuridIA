import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

// ... (a função callGeminiForComparison permanece a mesma) ...
export function buildGeminiComparisonPrompt(originalText) {
  return (
    `Você é um assistente jurídico especializado em simplificar documentos complexos.
    Analise o seguinte texto de contrato e divida-o em parágrafos ou cláusulas significativas.
    Para cada parte, forneça o texto original e uma versão simplificada em português claro e acessível.
    Sua resposta DEVE ser um objeto JSON contendo uma única chave "comparison".
    O valor de "comparison" deve ser um array de objetos, onde cada objeto tem duas chaves: "original" e "simplified".

    Exemplo de Resposta:
    {
      "comparison": [
        {
          "original": "Pelo presente instrumento particular de contrato, de um lado: REPRESENTANTE: Sr. Armando César Monteiro...",
          "simplified": "Este contrato é feito entre duas partes: o Representante, Sr. Armando César Monteiro..."
        },
        {
          "original": "CLÁUSULA PRIMEIRA - DO OBJETO: Concessão total e irrestrita ao REPRESENTANTE de poderes para uso da imagem...",
          "simplified": "1. Uso de Imagem: Você autoriza o representante a usar sua imagem, voz e nome."
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


// Função de chat ATUALIZADA
export async function chatWithGemini(history, systemInstruction, userMessage) {
  // Inicializa o modelo com a instrução do sistema
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction,
  });

  // Inicia o chat apenas com o histórico de mensagens
  const chat = model.startChat({ history: history });
  
  // Envia a nova mensagem do usuário
  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  return response.text();
}