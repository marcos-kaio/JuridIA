import React from 'react';
import { useNavigate } from 'react-router-dom';
import { downloadSimplifiedPdf } from '../../services/chatService';
import { useNotification } from '../../context/NotificationContext';
import juridiaLogoLivro from '../../assets/juridia_logo_livro.png';

export const ChatHeader = ({ activeConversation }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

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
            URL.revokeObjectURL(url); // Libera a memória
        }
    } catch (error) {
        showNotification("Não foi possível obter o arquivo.", 'error');
    }
  };

  const handlePrint = async (docId) => {
    try {
      const blob = await downloadSimplifiedPdf(docId);
      const url = URL.createObjectURL(blob);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      
      const cleanup = () => {
        document.body.removeChild(iframe);
        URL.revokeObjectURL(url);
      };
      
      document.body.appendChild(iframe);

      iframe.onload = () => {
        try {
          // Define o evento que será chamado APÓS a impressão
          iframe.contentWindow.onafterprint = cleanup;
          
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        } catch (e) {
          showNotification("Não foi possível abrir o diálogo de impressão.", 'error');
          cleanup(); // Limpa se houver um erro ao tentar imprimir
        }
      };

    } catch (error) {
      showNotification("Não foi possível obter o arquivo para impressão.", 'error');
    }
  };

  const handleCompare = (docId) => {
    navigate(`/compare/${docId}`);
  };

  return (
    <header className="p-4 px-6 flex items-center justify-between gap-4 border-b border-[#007B9E]">
      <div className='flex items-center gap-4'>
        <img src={juridiaLogoLivro} alt="JuridIA Logo" className="h-12" />
        <h1 className="text-[#007B9E] text-3xl font-poppins font-bold m-0">JuridiBot</h1>
        <div className="flex items-center gap-2 text-[#0DE20D]">
          <div className="w-3 h-3 bg-[#0DE20D] rounded-full"></div>
          Online
        </div>
      </div>
      {activeConversation?.hasPdf && (
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-600">Arquivo:</span>
          <button onClick={() => handleDownload(activeConversation.id, true)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
            Visualizar
          </button>
          <button onClick={() => handleDownload(activeConversation.id, false)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
            Baixar
          </button>
          <button onClick={() => handleCompare(activeConversation.id)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
            Comparar
          </button>
          <button onClick={() => handlePrint(activeConversation.id)} className="bg-[#0DACAC] text-white px-3 py-1.5 rounded-md hover:bg-[#089a9a] transition-colors text-sm font-semibold">
            Imprimir
          </button>
        </div>
      )}
    </header>
  );
};