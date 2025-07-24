import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { uploadAndSimplifyPdf } from '../../services/chatService';

export const ContractSimplifierSection = ({ sectionRef, logged }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Clique para anexar ou arraste seu arquivo');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleSimplify = async () => {
    if (!logged) {
      showNotification("Você precisa estar logado para simplificar um documento.", 'error');
      navigate('/login');
      return;
    }

    if (!file) {
      showNotification('Por favor, selecione um arquivo primeiro.', 'error');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadAndSimplifyPdf(formData);
      showNotification('Documento enviado! Redirecionando para o chat...', 'success');
      navigate('/chat');
    } catch (err) {
      console.error('Erro ao simplificar o arquivo:', err);
      showNotification('Ocorreu um erro ao simplificar o arquivo. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contract-simplifier" className="py-20 px-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Simplifique seu contrato</h2>
        <p className="font-montserrat text-xl leading-relaxed max-w-[605px] mb-10">
          Faça o upload do seu contrato em formato pdf e nossa Inteligência Artificial irá fornecer uma explicação clara e concisa dos termos mais importantes.
        </p>
        <div className="w-full bg-[#EBEBEB] shadow-sm rounded-[50px] p-6">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />
          <div 
            className="h-[186px] bg-[rgba(226,232,240,0.24)] shadow-inner rounded-[37px] flex items-center justify-center border-2 border-dashed border-[#b0b0b0] mb-6 cursor-pointer text-black text-4xl" 
            onClick={handleAreaClick}
          >
            <p>{fileName}</p>
          </div>
          <button 
            className="w-full h-[67px] bg-[#F4F7FB] shadow-md rounded-[37px] border-none text-[#1F2A44] text-4xl font-bold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" 
            onClick={handleSimplify} 
            disabled={loading || !file}
          >
            {loading ? 'Simplificando...' : 'Simplificar contrato'}
          </button>
        </div>
      </div>
    </section>
  );
};