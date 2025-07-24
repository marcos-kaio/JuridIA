import { useState, useEffect, useCallback } from 'react';
import { getChathistory, sendMessage } from '../services/chatService';
import { useNotification } from '../context/NotificationContext';

export const useChatHistory = (conversationId, onMessageSent) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const fetchHistory = useCallback(async () => {
    if (!conversationId || String(conversationId).startsWith('new-chat-')) {
      setMessages([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await getChathistory(conversationId);
      setMessages(response.data);
    } catch (error) {
      console.error("Falha ao buscar o histórico do chat:", error);
      setMessages([]);
      showNotification("Não foi possível carregar o histórico.", 'error');
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, showNotification]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSendMessage = useCallback(async (messageContent) => {
    if (messageContent.trim() === "") return;

    const userMessageForUI = { role: 'user', content: messageContent, tempId: `user-${Date.now()}` };
    setMessages(prev => [...prev, userMessageForUI]);
    setIsLoading(true);

    try {
      await sendMessage(conversationId, messageContent);
      await fetchHistory(); // Recarrega o histórico para obter a resposta real
      if (onMessageSent) onMessageSent(); // Callback para atualizar a lista de conversas
    } catch (err) {
      console.error("Erro ao enviar mensagem: ", err);
      showNotification("Erro ao obter resposta da IA.", 'error');
      setMessages(prev => prev.filter(msg => msg.tempId !== userMessageForUI.tempId));
    } finally {
        setIsLoading(false);
    }
  }, [conversationId, fetchHistory, onMessageSent, showNotification]);

  return { messages, isLoading, handleSendMessage, setMessages };
};