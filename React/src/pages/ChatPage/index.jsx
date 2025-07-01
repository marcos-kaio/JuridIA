import './ChatPage.css'; 

// Componente para um item da lista de conversas na barra lateral
const ConversationItem = ({ text, isActive = false }) => (
  <button className={`conversation-item ${isActive ? 'active' : ''}`}>
    {text}
  </button>
);

const ChatPage = () => {
  return (
    <div className="chat-page">
      {/* Barra Lateral (ASIDE) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* Ícone de Usuário */}
          <div className="user-icon">
             <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_121_535)"><path d="M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z" fill="#0DACAC"/><path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z" fill="#0DACAC"/></g><defs><clipPath id="clip0_121_535"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>
          </div>
          <button className="new-chat-button">
            {/* Ícone de File Plus */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Nova conversa</span>
          </button>
        </div>
        <div className="conversation-list">
          <ConversationItem text="Conversa atual" isActive={true} />
          <ConversationItem text="Contrato Fulano" />
          <ConversationItem text="Contrato Ciclano" />
        </div>
        <div className="sidebar-footer">
          {/* Ícone de Sair */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17L21 12M21 12L16 7M21 12H9M9 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2H9" stroke="#0DACAC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </aside>

      {/* Área Principal do Chat (MAIN) */}
      <main className="chat-area">
        <header className="chat-header">
          <div className="bot-identity">
            {/* Ícone do Chatbot */}
            <svg width="48" height="48" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.850586" width="60.5682" height="60.5682" fill="url(#pattern_bot)"/><defs><pattern id="pattern_bot" patternContentUnits="objectBoundingBox" width="1" height="1"><use href="#image_bot" transform="scale(0.015625)"/></pattern><image id="image_bot" width="64" height="64" href="data:image/png;base64,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"/></defs></svg>
          </div>
          <h1 className="bot-name">JuridiBot</h1>
          <div className="bot-status">
            <div className="status-indicator"></div>
            Online
          </div>
        </header>

        <div className="message-list">
          <div className="message-container">
            {/* Mensagem do usuário */}
            <div className="message user-message">
              <span>Sim! preciso entender sobre todos os passos desse contrato!</span>
            </div>
          </div>
          <div className="message-container bot-message-container">
            {/* Mensagem do Bot */}
            <div className="message bot-message">
              <span>Otimo documento! ele é sobre contrato juridico da empresa extra! deseja simplificar o contrato?</span>
            </div>
          </div>
        </div>

        <footer className="chat-footer">
          <div className="entry-field-wrapper">
            <input type="text" placeholder="Pergunte algo" className="entry-field" />
            <button className="send-button">
              {/* Ícone de Enviar */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;