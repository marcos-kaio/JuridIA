// Componente para um item da lista de conversas na barra lateral
const ConversationItem = ({ text, isActive = false }) => (
  <button className={`w-full p-4 bg-[#F4F7FB] rounded-lg border-2 text-center text-lg font-semibold font-montserrat cursor-pointer
    ${isActive 
      ? 'bg-[#0DACAC] text-[#F4F7FB] border-[#F4F7FB]' 
      : 'border-[#0DACAC] text-[#0DACAC]'
    }`}
  >
    {text}
  </button>
);

const ChatPage = () => {
  return (
    <div className="w-screen h-screen bg-[#1F2A44] flex overflow-hidden">
      {/* Barra Lateral (ASIDE) - escondida em telas pequenas */}
      <aside className="hidden md:flex flex-col flex-shrink-0 w-[260px] bg-[#1F2A44] p-5 gap-5 border-r border-[#323f58]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16">
             <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_121_535)"><path d="M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z" fill="#0DACAC"/><path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z" fill="#0DACAC"/></g><defs><clipPath id="clip0_121_535"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>
          </div>
          <button className="w-full p-3 bg-[#F4F7FB] rounded-lg flex items-center justify-center gap-2.5 text-lg font-montserrat font-medium cursor-pointer hover:bg-gray-200 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Nova conversa</span>
          </button>
        </div>
        <div className="flex-grow flex flex-col gap-2.5 overflow-y-auto">
          <ConversationItem text="Conversa atual" isActive={true} />
          <ConversationItem text="Contrato Fulano" />
          <ConversationItem text="Contrato Ciclano" />
        </div>
        <div className="mt-auto pl-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17L21 12M21 12L16 7M21 12H9M9 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2H9" stroke="#0DACAC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </aside>

      {/* Área Principal do Chat (MAIN) */}
      <main className="flex-grow bg-[#F4F7FB] rounded-lg my-5 mr-5 md:my-5 md:mr-5 md:ml-0 flex flex-col overflow-hidden border-2 border-[#007B9E]">
        <header className="p-4 px-6 flex items-center gap-4 border-b border-[#007B9E]">
          <div className="bot-identity">
            <svg width="48" height="48" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">/* ... (conteúdo do SVG) ... */</svg>
          </div>
          <h1 className="text-[#007B9E] text-3xl font-poppins font-bold m-0">JuridiBot</h1>
          <div className="flex items-center gap-2 text-[#0DE20D]">
            <div className="w-3 h-3 bg-[#0DE20D] rounded-full"></div>
            Online
          </div>
        </header>

        <div className="flex-grow p-7 overflow-y-auto flex flex-col gap-5">
          {/* Mensagem do usuário */}
          <div className="flex justify-end w-full">
            <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#E2E8F0] text-black rounded-tr-none">
              <span>Sim! preciso entender sobre todos os passos desse contrato!</span>
            </div>
          </div>
          {/* Mensagem do Bot */}
          <div className="flex justify-start w-full">
            <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#0DACAC] text-white rounded-tl-none">
              <span>Otimo documento! ele é sobre contrato juridico da empresa extra! deseja simplificar o contrato?</span>
            </div>
          </div>
        </div>

        <footer className="p-5 px-7 bg-[#F4F7FB]">
          <div className="flex items-center bg-white border border-[#007B9E] rounded-2xl p-1 pr-2 pl-5">
            <input type="text" placeholder="Pergunte algo" className="flex-grow border-none bg-transparent p-2.5 text-base focus:outline-none" />
            <button className="flex items-center justify-center w-11 h-11 bg-[#0DACAC] rounded-full border-none cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;