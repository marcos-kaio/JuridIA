import {
  Button,
  ChatBotIcon,
  ExitIcon,
  FilePlusIcon,
  SendIcon,
  UserIcon,
} from '../../components/utilities';

// Componente para um item da lista de conversas na barra lateral

const Message = ({ isBot, children }) => {
  const userStyles = `bg-gray-200 text-stone-950 rounded-tr-none ml-auto`;
  const botStyles = `bg-cyan-700 text-white rounded-tl-none mr-auto`;

  return (
    <div
      className={`max-w-3/5 p-4 rounded-2xl ${isBot ? botStyles : userStyles}`}
    >
      <span>{children}</span>
    </div>
  );
};

const ChatPage = () => {
  return (
    <div className='w-dvw h-dvh bg-blue-950 flex overflow-hidden'>
      {/* Barra Lateral (ASIDE) */}
      <aside className='w-full min-w-48 md:max-w-72 px-3 py-5 hidden md:flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10'>
            <UserIcon />
          </div>
          <Button
            variant='secondary'
            className='flex items-center justify-center gap-2'
          >
            <FilePlusIcon />
            <span>Nova conversa</span>
          </Button>
        </div>
        <div className='flex flex-col gap-4 overflow-y-auto flex-1'>
          <Button variant='primary'>Conversa atual</Button>
          <Button variant='tertiary'>Contrato Fulano</Button>
          <Button variant='tertiary'>Contrato Ciclano</Button>
        </div>
        <div className='mt-auto pl-3'>
          <ExitIcon />
        </div>
      </aside>

      {/* Área Principal do Chat (MAIN) */}
      <main
        className='flex-1 h-dvh md:h-auto bg-gray-50 md:rounded-sm m-0 md:m-5 
                  flex flex-col overflow-hidden md:border-2 md:border-cyan-600'
      >
        <header className='px-4 py-5 flex items-center gap-4 border-b border-cyan-100'>
          <div>
            <ChatBotIcon />
          </div>
          <h1 className='text-cyan-600 text-2xl font-semibold m-0'>
            JuridiBot
          </h1>
          <div className='flex items-center gap-1 text-green-500'>
            <div className='w-3 h-3 bg-green-500 rounded-full'></div> Online
          </div>
        </header>

        <div className='flex-1 p-7 overflow-y-auto flex flex-col gap-5'>
          <Message isBot={true}>bot</Message>
          <Message isBot={false}>bot</Message>
        </div>

        <footer className='px-5 py-6'>
          <div className='flex items-center bg-white border border-cyan-600 rounded-lg p-2 px-5'>
            <input
              type='text'
              placeholder='Pergunte algo'
              className='flex-1 border-0 bg-transparent mr-4'
            />
            <button
              className='flex items-center justify-center w-9 h-9 bg-cyan-500 
                              rounded-full border-none cursor-pointer hover:bg-cyan-600 transition-colors'
            >
              <SendIcon className='*:stroke-white' />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
