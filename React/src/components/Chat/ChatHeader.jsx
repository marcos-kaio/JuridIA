import React from 'react';
import { useNavigate } from 'react-router-dom';
import { downloadSimplifiedPdf } from '../../services/chatService';
import { useNotification } from '../../context/NotificationContext';
import juridiaLogoLivro from '../../assets/juridia_logo_livro.png';

export const ChatHeader = ({ activeConversation }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const downloadAndOpen = async (docId) => {
    try {
      const blob = await downloadSimplifiedPdf(docId);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch {
      showNotification('Não foi possível obter o arquivo.', 'error');
    }
  };

  const downloadAndSave = async (docId) => {
    try {
      const blob = await downloadSimplifiedPdf(docId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `simplificado_${docId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      showNotification('Não foi possível obter o arquivo.', 'error');
    }
  };

  const handleCompare = (docId) => {
    navigate(`/compare/${docId}`);
  };

  const buttonClass =
    'bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold';

  return (
    <header className='p-4 px-6 flex items-center justify-between gap-4 border-b border-[#007B9E]'>
      <div className='flex items-center gap-4'>
        <img src={juridiaLogoLivro} alt='JuridIA Logo' className='h-12' />
        <h1 className='text-[#007B9E] text-3xl font-poppins font-bold m-0'>
          JuridiBot
        </h1>
        <div className='flex items-center gap-2 text-[#0DE20D]'>
          <div className='w-3 h-3 bg-[#0DE20D] rounded-full' />
          Online
        </div>
      </div>

      {activeConversation?.hasPdf && (
        <div className='flex items-center gap-4'>
          <span className='font-semibold text-gray-600'>Arquivo:</span>
          <button
            onClick={() => downloadAndOpen(activeConversation.id)}
            className={buttonClass}
          >
            Visualizar
          </button>
          <button
            onClick={() => downloadAndSave(activeConversation.id)}
            className={buttonClass}
          >
            Baixar
          </button>
          <button
            onClick={() => handleCompare(activeConversation.id)}
            className={buttonClass}
          >
            Comparar
          </button>
        </div>
      )}
    </header>
  );
};
