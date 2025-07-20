import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChats, getChathistory, sendMessage, uploadAndSimplifyPdf, deleteChat, downloadSimplifiedPdf } from '../../services/chatService'; // Importe a nova função
import ReactMarkdown from "react-markdown";

// Componente do ícone da lixeira
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
    <button onClick={onChangeChat} className="w-full text-left text-lg font-semibold font-montserrat cursor-pointer bg-transparent border-none">
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

const UserMessage = ({userContent, sent=false, onClickFile=null}) => {
  return(
    <div className="flex justify-end w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#E2E8F0] text-black rounded-tr-none">
        <span onClick={onClickFile} className={sent ? "font-semibold cursor-pointer underline" : ""}>{userContent}</span>
      </div>
    </div>
  )
}

const BotMessage = ({botContent}) => {
  return (
    <div className="flex justify-start w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#0DACAC] text-white rounded-tl-none">
        <ReactMarkdown>{botContent}</ReactMarkdown>
      </div>
    </div>
  )
}

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

  const [conversations, setConversations] = useState([]);

  const configureConvos = async () => {
    try {
      const response = await getChats();
      if (response && response.data) {
        const chats = response.data;
        const parsedChats = chats.map((chat) => ({
          id: chat.id,
          title: `Conversa ${chat.id}`,
          hasPdf: chat.status === "done",
          updatedAt: chat.updatedAt,
        }));
        
        parsedChats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

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
    if (messageContent.trim() === ""){
      return;
    }
    const userMessageForUI = {
      role: 'user',
      content: messageContent,
      tempId: Date.now(),
    };

    const message = messageContent;
    setMessageContent("");
    setMessages(prevMessages => [...prevMessages, userMessageForUI]);

    try{
      await sendMessage(activeConversationId, message);
      await fetchHistory();
      await configureConvos();
    } catch (err){
      console.error("Erro ao enviar mensagem: ", err);
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.tempId !== userMessageForUI.tempId)
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

  const handleDeleteChat = async (idToDelete) => {
    if (window.confirm(`Tem certeza que deseja excluir a ${conversations.find(c => c.id === idToDelete)?.title}?`)) {
        try {
            await deleteChat(idToDelete);
            
            const updatedConversations = conversations.filter(c => c.id !== idToDelete);
            setConversations(updatedConversations);

            if (activeConversationId === idToDelete) {
                if (updatedConversations.length > 0) {
                    setActiveConversationId(updatedConversations[0].id);
                } else {
                    setActiveConversationId(null);
                    setMessages([]);
                }
            }
        } catch (error) {
            console.error("Erro ao deletar a conversa:", error);
            alert("Não foi possível deletar a conversa.");
        }
    }
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

      const newConversation = {
        id: newConvoId,
        title: `Conversa ${newConvoId}`,
        hasPdf: true, 
        updatedAt: new Date().toISOString()
      };
      
      setConversations(prev => [newConversation, ...prev.filter(c => !c.id.toString().startsWith('new-chat-'))]);
      setActiveConversationId(newConvoId);
      setMessages([]);
  
    } catch (error) {
      console.error("Erro ao simplificar o PDF:", error);
      alert(`Ocorreu um erro ao simplificar o arquivo: ${error.message}`);
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
        alert("Não foi possível obter o arquivo.");
    }
  };

  return (
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
              onDelete={(e) => { e.stopPropagation(); handleDeleteChat(convo.id); }}
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
                <div className="bot-identity">
                    <svg width="48" height="48" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.850586" width="60.5682" height="60.5682" fill="url(#pattern_bot)"/><defs><pattern id="pattern_bot" patternContentUnits="objectBoundingBox" width="1" height="1"><use href="#image_bot" transform="scale(0.015625)"/></pattern><image id="image_bot" width="64" height="64" href="data:image/png;base64,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"/></defs></svg>
                </div>
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
  );
};

export default ChatPage;