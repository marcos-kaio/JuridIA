import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChats, getChathistory, sendMessage, uploadAndSimplifyPdf, deleteChat, downloadSimplifiedPdf } from '../../services/chatService';
import ReactMarkdown from "react-markdown";
import { useNotification } from '../../context/NotificationContext';
import MainPopUp from '../../components/MainPopUp';
import juridiaLogoLivro from '../../assets/juridia_logo_livro.png'; // Importe a nova imagem

// --- Ícones e Componentes Utilitários ---
const TrashIcon = ({...props}) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
);

const ConversationItem = ({ text, isActive = false, onChangeChat, onDelete }) => (
  <div className={`relative flex items-center justify-between w-full p-4 rounded-lg border-2 group
    ${isActive
      ? 'bg-[#0DACAC] text-[#F4F7FB] border-[#F4F7FB]'
      : 'bg-[#F4F7FB] border-[#0DACAC] text-[#0DACAC]'
    }`}
  >
    <button
      onClick={onChangeChat}
      title={text}
      className="w-full text-left text-lg font-semibold font-montserrat cursor-pointer bg-transparent border-none overflow-hidden whitespace-nowrap text-ellipsis pr-8"
    >
      {text}
    </button>
    <button
        onClick={onDelete}
        className={`absolute right-2 p-1 rounded-full transition-opacity opacity-0 group-hover:opacity-100
        ${isActive ? 'text-white hover:bg-white/20' : 'text-red-500 hover:bg-red-100'}`}
        aria-label="Deletar conversa"
    >
      <TrashIcon />
    </button>
  </div>
);

const UserMessage = ({userContent}) => (
    <div className="flex justify-end w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#E2E8F0] text-black rounded-tr-none">
        <span>{userContent}</span>
      </div>
    </div>
);

const BotMessage = ({botContent}) => (
    <div className="flex justify-start w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#0DACAC] text-white rounded-tl-none">
        <ReactMarkdown>{botContent}</ReactMarkdown>
      </div>
    </div>
);

const BotLoadingMessage = () => (
    <div className="flex justify-start w-full">
        <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#0DACAC] text-white rounded-tl-none">
            <div className="flex items-center justify-center space-x-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
        </div>
    </div>
);


const SendPdf = ({OnFileChange, file, OnSimplify, isLoading}) => {
  const isFileSelected = file !== "Nenhum arquivo selecionado";

  return (
    <div className="flex justify-end w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#E2E8F0] text-black rounded-tr-none">
        <label onClick={isLoading ? null : (isFileSelected ? OnSimplify : null)} htmlFor="file-upload" className={`inline-flex items-center px-4 py-2 text-white rounded-2xl shadow-md transition
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#0DACAC] hover:bg-[#1FBDBD] cursor-pointer'
            }
          `}>
          {isLoading
            ? "Simplificando..."
            : (isFileSelected ? "Simplificar" : "Escolher arquivo")
          }
        </label>
        <input type="file" disabled={isLoading} accept="application/pdf" id='file-upload' className='hidden' onChange={OnFileChange}/>
        <p className="text-gray-700 text-sm italic mt-1">{file}</p>
      </div>
    </div>
  )
}

const ChatPage = () => {
  const [activeConversationId, setActiveConversationId] = useState();
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado');
  const [isSimplifying, setIsSimplifying] = useState(false);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [conversations, setConversations] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const handleOpenDeleteModal = (id, title) => {
    setChatToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setChatToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!chatToDelete) return;

    try {
        await deleteChat(chatToDelete.id);

        const updatedConversations = conversations.filter(c => c.id !== chatToDelete.id);
        setConversations(updatedConversations);

        if (activeConversationId === chatToDelete.id) {
            if (updatedConversations.length > 0) {
                setActiveConversationId(updatedConversations[0].id);
            } else {
                setActiveConversationId(null);
                setMessages([]);
            }
        }
        showNotification('Conversa deletada com sucesso!', 'success');
    } catch (error) {
        console.error("Erro ao deletar a conversa:", error);
        showNotification("Não foi possível deletar a conversa.", 'error');
    } finally {
        handleCloseDeleteModal();
    }
  };

  useEffect(() => {
    const pendingQuestion = sessionStorage.getItem('juridia-question');
    if (pendingQuestion) {
      setMessageContent(pendingQuestion);
      sessionStorage.removeItem('juridia-question');
    }
  }, []);

  const configureConvos = async () => {
    try {
      const response = await getChats();
      if (response && response.data) {
        const chats = response.data;
        const parsedChats = chats.map((chat) => ({
          id: chat.id,
          title: chat.title || `Conversa ${chat.id}`,
          hasPdf: chat.status === "done",
          updatedAt: chat.updatedAt,
        }));

        setConversations(parsedChats);

        if (parsedChats.length > 0 && !conversations.some(c => c.id === activeConversationId)) {
          setActiveConversationId(parsedChats[0].id);
        }
      }
    } catch (error) {
        console.error("Erro ao configurar conversas:", error);
    }
  }

  useEffect(() => {
    configureConvos();
  }, []);

  const fetchHistory = async () => {
    if (!activeConversationId || activeConversationId.toString().startsWith('new-chat-')) {
        setMessages([]);
        return;
    };
    try {
      const response = await getChathistory(activeConversationId);
      setMessages(response.data);
    } catch (error) {
      console.error("Falha ao buscar o histórico do chat:", error);
      setMessages([]);
    }
  };

  useEffect(() => {
      fetchHistory();
  }, [activeConversationId]);

  const handleNewChat = () => {
    const existingNewChat = conversations.find(c => c.id.toString().startsWith('new-chat-'));
    if (existingNewChat) {
      setActiveConversationId(existingNewChat.id);
      return;
    }

    const newChatId = `new-chat-${Date.now()}`;
    const newConversation = {
      id: newChatId,
      title: `Nova Conversa`,
      hasPdf: false,
      updatedAt: new Date().toISOString()
    };

    setConversations(c => [newConversation, ...c]);
    setActiveConversationId(newChatId);
    setMessages([]);
  }

  const handleSendMessage = async () => {
    if (messageContent.trim() === "") return;

    const userMessageForUI = { role: 'user', content: messageContent, tempId: `user-${Date.now()}` };
    const loadingMessageForUI = { role: 'ai', isLoading: true, tempId: `loading-${Date.now()}` };

    const message = messageContent;
    setMessageContent("");
    setMessages(prevMessages => [...prevMessages, userMessageForUI, loadingMessageForUI]);

    try {
      await sendMessage(activeConversationId, message);
      await fetchHistory();
      await configureConvos();
    } catch (err) {
      console.error("Erro ao enviar mensagem: ", err);
      showNotification("Erro ao obter resposta da IA.", 'error');
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.tempId !== userMessageForUI.tempId && msg.tempId !== loadingMessageForUI.tempId)
      );
    }
  }

  const handleLeave = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_name");
    navigate("/", { replace: true });
  }

  const handleChangeChat = (id) => {
    setActiveConversationId(id);
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  }

  const activeConversation = useMemo(() =>
    conversations.find(convo => convo.id === activeConversationId),
    [activeConversationId, conversations]
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUploadAndSimplify = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setIsSimplifying(true);

    try {
      const resp = await uploadAndSimplifyPdf(formData);

      const newConvoIdHeader = resp.headers['x-document-id'];
      if (!newConvoIdHeader) {
          throw new Error("ID do novo documento não foi retornado pelo servidor.");
      }

      const newConvoId = parseInt(newConvoIdHeader, 10);
      if (isNaN(newConvoId)) {
        throw new Error("ID retornado pelo servidor é inválido.");
      }

      await configureConvos();
      setActiveConversationId(newConvoId);

      showNotification('Documento simplificado com sucesso!', 'success');

    } catch (error) {
      console.error("Erro ao simplificar o PDF:", error);
      const errorMessage = error.response?.data?.error || `Ocorreu um erro ao simplificar o arquivo.`;
      showNotification(errorMessage, 'error');
    } finally {
      setFile(null);
      setFileName('Nenhum arquivo selecionado');
      setIsSimplifying(false);
    }
  }

  const handleDownload = async (docId, openInNewTab = false) => {
    try {
        const blob = await downloadSimplifiedPdf(docId);
        const url = URL.createObjectURL(blob);

        if (openInNewTab) {
            window.open(url, '_blank');
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = `simplificado_${docId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } catch (error) {
        console.error("Falha ao processar o arquivo para download/visualização.", error);
        showNotification("Não foi possível obter o arquivo.", 'error');
    }
  };

  const handleCompare = (docId) => {
    navigate(`/compare/${docId}`);
  };

  return (
    <>
      <MainPopUp isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="text-center p-4">
            <svg className="mx-auto mb-4 w-12 h-12 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-200">
                Tem certeza que deseja excluir a conversa <br/>
                <span className="font-medium text-white break-all">"{chatToDelete?.title}"</span>?
            </h3>
            <div className="flex justify-center gap-4">
                <button
                    onClick={handleCloseDeleteModal}
                    className="px-6 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleConfirmDelete}
                    className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors"
                >
                    Excluir
                </button>
            </div>
        </div>
      </MainPopUp>

      <div className="w-screen h-screen bg-[#1F2A44] flex overflow-hidden">
        <aside className="hidden md:flex flex-col flex-shrink-0 w-[260px] bg-[#1F2A44] p-5 gap-5 border-r border-[#323f58]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16">
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_121_535)"><path d="M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z" fill="#0DACAC"/><path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z" fill="#0DACAC"/></g><defs><clipPath id="clip0_121_535"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>
            </div>
            <button onClick={handleNewChat} className="w-full p-3 bg-[#F4F7FB] rounded-lg flex items-center justify-center gap-2.5 text-lg font-montserrat font-medium cursor-pointer hover:bg-gray-200 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Nova conversa</span>
            </button>
          </div>
          <div className="flex-grow flex flex-col gap-2.5 overflow-y-auto">
            {conversations.map((convo) => (
              <ConversationItem
                key={convo.id}
                text={convo.title}
                isActive={convo.id === activeConversationId}
                onChangeChat={() => handleChangeChat(convo.id)}
                onDelete={(e) => { e.stopPropagation(); handleOpenDeleteModal(convo.id, convo.title); }}
              />
            ))}
          </div>
          <div className="mt-auto pl-2.5">
            <svg  onClick={handleLeave} className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17L21 12M21 12L16 7M21 12H9M9 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2H9" stroke="#0DACAC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </aside>
        <main className="flex-grow bg-[#F4F7FB] rounded-lg my-5 mr-5 md:my-5 md:mr-5 md:ml-0 flex flex-col overflow-hidden border-2 border-[#007B9E]">
          <header className="p-4 px-6 flex items-center justify-between gap-4 border-b border-[#007B9E]">
              <div className='flex items-center gap-4'>
                  <img src={juridiaLogoLivro} alt="JuridIA Logo" className="h-12" />
                  <h1 className="text-[#007B9E] text-3xl font-poppins font-bold m-0">JuridiBot</h1>
                  <div className="flex items-center gap-2 text-[#0DE20D]">
                      <div className="w-3 h-3 bg-[#0DE20D] rounded-full"></div>
                      Online
                  </div>
              </div>
              {activeConversation && activeConversation.hasPdf && (
                  <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-600">Arquivo Simplificado:</span>
                      <button onClick={() => handleDownload(activeConversationId, true)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
                      Visualizar
                      </button>
                      <button onClick={() => handleDownload(activeConversationId, false)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
                      Baixar
                      </button>
                      <button onClick={() => handleCompare(activeConversationId)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
                          Comparar
                      </button>
                  </div>
              )}
          </header>
          <div ref={chatContainerRef} className="flex-grow p-7 overflow-y-auto flex flex-col gap-5">
            {activeConversation && !activeConversation.hasPdf && (
              <SendPdf
                  file={fileName}
                  OnFileChange={handleFileChange}
                  OnSimplify={handleUploadAndSimplify}
                  isLoading={isSimplifying}
              />
            )}
            {messages.map((msg, index) => {
              const messageKey = msg.id || msg.tempId || `${msg.role}-${index}`;

              if (msg.isLoading) {
                return <BotLoadingMessage key={messageKey} />;
              }

              return msg.role === 'user'
                ? <UserMessage key={messageKey} userContent={msg.content} />
                : <BotMessage key={messageKey} botContent={msg.content} />
            })}
          </div>
          <footer className="p-5 px-7 bg-[#F4F7FB]">
            <div className="flex items-center bg-white border border-[#007B9E] rounded-2xl p-1 pr-2 pl-5">
              {activeConversation && activeConversation.hasPdf ? (
                <>
                  <input
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
                    type="text"
                    placeholder="Pergunte algo"
                    className="flex-grow border-none bg-transparent p-2.5 text-base focus:outline-none"
                  />
                  <button onClick={handleSendMessage} className="flex items-center justify-center w-11 h-11 bg-[#0DACAC] rounded-full border-none cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </>
              ) : (
                <p className="text-gray-500 p-2.5 text-base w-full text-center">Envie um arquivo para iniciar a conversa.</p>
              )}
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default ChatPage;