import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

// Função para obter a instrução de estilo com base na escolaridade
function getStyleInstruction(educationLevel) {
  switch (educationLevel) {
    case 'fundamental':
      return 'Utilize uma linguagem muito simples, direta e didática, como se estivesse explicando para alguém com pouca familiaridade no assunto. Use exemplos práticos e evite termos técnicos.';
    case 'medio':
      return 'Utilize uma linguagem clara e objetiva. Se precisar usar um termo técnico, explique-o de forma breve.';
    case 'superior':
    default:
      return 'Utilize uma linguagem precisa e completa. Termos técnicos podem ser usados, mas devem ser explicados para garantir a clareza.';
  }
}

export function buildGeminiComparisonPrompt(originalText, educationLevel) {
  // Gera a instrução de estilo com base na escolaridade
  const styleInstruction = getStyleInstruction(educationLevel);

  return `Você é um assistente jurídico especializado em simplificar documentos complexos.
    Responda única e exclusivamente em português.
    Analise o seguinte texto de contrato, gere um título curto e descritivo para ele, e depois divida-o em parágrafos ou cláusulas significativas.
    
    // INSTRUÇÃO ADICIONAL IMPORTANTE: A simplificação deve seguir este estilo de linguagem: "${styleInstruction}".

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
    ${originalText}`;
}

export async function callGeminiForComparison(text, educationLevel) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  });

  // Passa a escolaridade para a função que monta o prompt
  const prompt = buildGeminiComparisonPrompt(text, educationLevel);
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const jsonText = response.text();
  return JSON.parse(jsonText);
}

export async function chatWithGemini(history, systemInstruction, userMessage) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemInstruction,
  });

  const chat = model.startChat({ history: history });

  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  return response.text();
}
