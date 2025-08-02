import api from "./api.js";

export const getChats = async () => {
  try {
    // Adiciona headers para evitar o cache da requisição
    const chats = await api.get("/chat/find", {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    return chats;
  } catch (err) {
    console.error("Erro ao buscar chats: ", err);
    throw err;
  }
};

export const getChathistory = async (docId) => {
  try {
    const chatHistory = await api.get(`/chat/${docId}`);
    return chatHistory;
  } catch (err) {
    console.error("Erro ao buscar histórico de chat: ", err);
    throw err;
  }
};

export const sendMessage = async (docId, userMessage) => {
  try {
    const answer = await api.post(`/chat/ask/${docId}`, {
      question: userMessage,
    });
    return answer;
  } catch (err) {
    console.error("Erro ao enviar mensagem: ", err);
    throw err;
  }
};

export const uploadAndSimplifyPdf = async (formData) => {
  try {
    return await api.post(
      `/document/simplify`,
      formData,
      { 
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob" 
      }
    );
  } catch (err) {
    console.error("Erro ao enviar e simplificar arquivo: ", err);
    throw err;
  }
};

export const deleteChat = async (docId) => {
  try {
    const response = await api.delete(`/chat/drop/${docId}`);
    return response;
  } catch (err) {
    console.error("Erro ao deletar chat: ", err);
    throw err;
  }
};

export const downloadSimplifiedPdf = async (docId) => {
  try {
    const response = await api.get(`/document/download/${docId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao baixar o PDF: ", err);
    throw err;
  }
};