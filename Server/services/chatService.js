// Função auxiliar para gerar a instrução de estilo
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

// Função para criar a instrução do sistema, agora com a escolaridade
export function buildSystemInstruction(doc, educationLevel) {
  const styleInstruction = getStyleInstruction(educationLevel);
  return `Este chat é sobre o documento cujo texto original é:\n ${doc.originalText}. Responda às perguntas do usuário com base neste contexto e seguindo esta instrução de estilo: "${styleInstruction}".`;
}

// Função para formatar o histórico do chat para a API (sem alterações)
export function formatChatHistory(history) {
  return history.map((message) => ({
    role: message.role === 'ai' ? 'model' : 'user',
    parts: [{ text: message.content }],
  }));
}
