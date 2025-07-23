// Função para criar a instrução do sistema
export function buildSystemInstruction(doc) {
  return `Este chat é sobre o documento cujo texto original é:\n ${doc.originalText}. Responda às perguntas do usuário com base neste contexto.`;
}

// Função para formatar o histórico do chat para a API
export function formatChatHistory(history) {
  return history.map((message) => ({
    role: message.role === "ai" ? "model" : "user", // A IA agora é 'model'
    parts: [{ text: message.content }],
  }));
}