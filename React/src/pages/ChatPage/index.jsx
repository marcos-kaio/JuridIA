import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import MainPopUp from '../../components/MainPopUp';
import { useConversations } from '../../hooks/useConversations';
import { useChatHistory } from '../../hooks/useChatHistory';
import { uploadAndSimplifyPdf } from '../../services/chatService';

import { ConversationList } from '../../components/Chat/ConversationList';
import { ChatHeader } from '../../components/Chat/ChatHeader';
import { MessageList } from '../../components/Chat/MessageList';
import { ChatInput } from '../../components/Chat/ChatInput';

const ChatPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    isDeleteModalOpen,
    chatToDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    handleNewChat,
    fetchConversations
  } = useConversations();

  const { messages, isLoading, handleSendMessage, setMessages } = useChatHistory(activeConversationId, fetchConversations);

  const activeConversation = useMemo(
    () => conversations.find(c => c.id === activeConversationId),
    [activeConversationId, conversations]
  );
  
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_name");
    navigate("/", { replace: true });
  };
  
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const resp = await uploadAndSimplifyPdf(formData);
      const newConvoId = resp.headers['x-document-id'];
      
      if (!newConvoId) throw new Error("ID do novo documento não retornado.");

      await fetchConversations();
      setActiveConversationId(parseInt(newConvoId, 10));
      showNotification('Documento simplificado com sucesso!', 'success');
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || `Ocorreu um erro ao simplificar o arquivo.`;
      showNotification(errorMessage, 'error');
    }
  };

  return (
    <>
      <MainPopUp isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="text-center p-4">
            <h3 className="mb-5 text-lg font-normal text-gray-200">
                Tem certeza que deseja excluir a conversa <br/>
                <span className="font-medium text-white break-all">"{chatToDelete?.title}"</span>?
            </h3>
            <div className="flex justify-center gap-4">
                <button onClick={handleCloseDeleteModal} className="px-6 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500">Cancelar</button>
                <button onClick={handleConfirmDelete} className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500">Excluir</button>
            </div>
        </div>
      </MainPopUp>

      <div className="w-screen h-screen bg-[#1F2A44] flex overflow-hidden">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={setActiveConversationId}
          onDelete={handleOpenDeleteModal}
          onNewChat={handleNewChat}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow bg-[#F4F7FB] rounded-lg my-5 mr-5 md:my-5 md:mr-5 md:ml-0 flex flex-col overflow-hidden border-2 border-[#007B9E]">
          <ChatHeader activeConversation={activeConversation} />
          
          <MessageList
            messages={messages}
            isLoading={isLoading && messages.length > 0} // Só mostra loading se já houver mensagens
            showUploader={!activeConversation?.hasPdf}
            onFileUpload={handleFileUpload}
          />
          
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={!activeConversation?.hasPdf}
          />
        </main>
      </div>
    </>
  );
};

export default ChatPage;