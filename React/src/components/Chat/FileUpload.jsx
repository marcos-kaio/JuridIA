import React, { useState } from 'react';

export const FileUpload = ({ onSimplify }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado');
  const [isSimplifying, setIsSimplifying] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleSimplifyClick = async () => {
      if (!file) return;
      setIsSimplifying(true);
      await onSimplify(file);
      setIsSimplifying(false);
      setFile(null);
      setFileName('Nenhum arquivo selecionado');
  }

  return (
    <div className="flex justify-end w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#E2E8F0] text-black rounded-tr-none">
        <label htmlFor="file-upload" className={`inline-flex items-center px-4 py-2 text-white rounded-2xl shadow-md transition ${isSimplifying ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0DACAC] hover:bg-[#1FBDBD] cursor-pointer'}`}>
          {isSimplifying ? "Simplificando..." : (file ? "Simplificar" : "Escolher arquivo")}
        </label>
        <input type="file" disabled={isSimplifying} accept="application/pdf" id='file-upload' className='hidden' onChange={handleFileChange} onClick={handleSimplifyClick} />
        <p className="text-gray-700 text-sm italic mt-1">{fileName}</p>
      </div>
    </div>
  );
};