import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext.jsx';
import { checkAuth, updateEducation } from '../../services/authService.js';
import { getChats, deleteChat } from '../../services/chatService.js';
import MainPopUp from '../../components/MainPopUp';
import api from '../../services/api.js';

const UserIcon = (props) => (
  <svg
    {...props}
    width='64'
    height='64'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z'
      fill='#F4F7FB'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z'
      fill='#F4F7FB'
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [escolaridade, setEscolaridade] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { valid, user: userData } = await checkAuth();
      if (valid) {
        setUser(userData);
        setEscolaridade(userData.escolaridade || '');
      } else {
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    delete api.defaults.headers.common['Authorization'];
    showNotification('Logout realizado com sucesso!', 'success');
    navigate('/login', { replace: true });
  };

  const handleDeleteAllChats = async () => {
    try {
      const response = await getChats();
      const chats = response.data;
      if (chats.length === 0) {
        showNotification('Não há conversas para excluir.', 'info');
        setIsModalOpen(false);
        return;
      }
      await Promise.all(chats.map((chat) => deleteChat(chat.id)));
      showNotification(
        'Todas as conversas foram excluídas com sucesso!',
        'success'
      );
    } catch (error) {
      console.error('Erro ao excluir todas as conversas:', error);
      showNotification('Ocorreu um erro ao excluir as conversas.', 'error');
    } finally {
      setIsModalOpen(false);
      navigate('/chat', { replace: true });
    }
  };

  const handleEducationChange = (e) => {
    setEscolaridade(e.target.value);
  };

  const handleUpdateEducation = async () => {
    try {
      await updateEducation({ escolaridade });
      showNotification(
        'Nível de escolaridade atualizado com sucesso!',
        'success'
      );
    } catch (error) {
      console.error('Erro ao atualizar a escolaridade:', error);
      showNotification(
        error.message || 'Não foi possível atualizar a escolaridade.',
        'error'
      );
    }
  };

  return (
    <div className='w-screen h-screen bg-[#1F2A44] flex justify-center items-center p-4'>
      <div className='w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl flex overflow-hidden relative'>
        <button
          onClick={() => navigate(-1)}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10'
        >
          <CloseIcon />
        </button>
        {/* Sidebar */}
        <aside className='w-1/3 bg-[#0DACAC] p-6 flex flex-col text-white'>
          <div className='flex items-center gap-4 mb-8'>
            <UserIcon />
            <span className='text-xl font-bold'>
              {user?.username || 'Usuário'}
            </span>
          </div>
          <nav className='flex flex-col gap-2'>
            <a
              href='#'
              className='p-3 rounded-md bg-white/20 text-white font-semibold flex justify-between items-center'
            >
              Geral
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className='w-2/3 p-8 flex flex-col gap-6 overflow-y-auto'>
          <h1 className='text-3xl font-bold text-[#1F2A44] border-b pb-2 border-gray-300'>
            Geral
          </h1>

          <div className='flex justify-between items-center'>
            <label htmlFor='escolaridade-select'>Nível de Escolaridade</label>
            <div className='flex items-center gap-2'>
              <select
                id='escolaridade-select'
                value={escolaridade}
                onChange={handleEducationChange}
                className='p-2 border rounded-md bg-white'
              >
                <option value='' disabled>
                  Selecione...
                </option>
                <option value='fundamental'>Ensino Fundamental</option>
                <option value='medio'>Ensino Médio</option>
                <option value='superior'>Ensino Superior</option>
              </select>
              <button
                onClick={handleUpdateEducation}
                className='px-4 py-2 bg-[#0DACAC] text-white rounded-md hover:bg-[#089a9a] transition-colors'
              >
                Salvar
              </button>
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <span>Excluir todos os chats</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              Excluir Tudo
            </button>
          </div>

          <div className='flex-grow border-t border-gray-300 mt-auto pt-6'>
            <div className='flex justify-between items-center'>
              <span>Sair deste dispositivo</span>
              <button
                onClick={handleLogout}
                className='px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition-colors'
              >
                Sair
              </button>
            </div>
          </div>
        </main>
      </div>

      <MainPopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className='text-center p-4'>
          <h3 className='mb-5 text-lg font-normal text-gray-200'>
            Tem certeza que deseja excluir TODAS as suas conversas? <br />
            <span className='font-bold text-white'>
              Essa ação não pode ser desfeita.
            </span>
          </h3>
          <div className='flex justify-center gap-4'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='px-6 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors'
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteAllChats}
              className='px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors'
            >
              Sim, Excluir Tudo
            </button>
          </div>
        </div>
      </MainPopUp>
    </div>
  );
};

export default ProfilePage;