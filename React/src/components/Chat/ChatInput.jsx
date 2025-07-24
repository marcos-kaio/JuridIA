import React, { useState } from 'react';

export const ChatInput = ({ onSendMessage, disabled }) => {
  const [content, setContent] = useState('');

  const handleChange = (e) => setContent(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setContent('');
  };

  return (
    <footer className='p-5 px-7 bg-[#F4F7FB]'>
      <div className='flex items-center bg-white border border-[#007B9E] rounded-2xl p-1 pr-2 pl-5'>
        {disabled ? (
          <p className='text-gray-500 p-2.5 text-base w-full text-center'>
            Envie um arquivo para iniciar a conversa.
          </p>
        ) : (
          <>
            <input
              value={content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type='text'
              placeholder='Pergunte algo'
              className='flex-grow border-none bg-transparent p-2.5 text-base focus:outline-none'
            />
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className='flex items-center justify-center w-11 h-11 bg-[#0DACAC] rounded-full border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity'
              aria-label='Enviar mensagem'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22 2L11 13'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 2L15 22L11 13L2 9L22 2Z'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </footer>
  );
};
