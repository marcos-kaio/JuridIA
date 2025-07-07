import api from "./api.js"

export const getChats = async () => {
    try{
        const chats = await api.get("http://localhost:8081/chat/find");
        return chats;
    } catch(err){
        console.error("Erro ao buscar chats: ", err)
    }
}

export const getChathistory = async (docId) => {
    try{
        const chatHistory = await api.get(`http://localhost:8081/chat/${docId}`);
        return chatHistory;
    } catch(err){
        console.error("Erro ao buscar histórico de chat: ", err)
    }
}

export const sendMessage = async (docId, userMessage) => {
    try{
        const answer = await api.post(`http://localhost:8081/chat/ask/${docId}`, {
            question: userMessage
        });
        return answer;
    } catch(err){
        console.error("Erro ao enviar mensagem: ", err)
    }
}