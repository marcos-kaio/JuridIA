import { useNotification } from '../context/NotificationContext';
import { useEffect, useState } from 'react';

// Ícones SVG para cada tipo de notificação
const icons = {
  success: (
    <svg
      className='w-6 h-6 mr-3'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      ></path>
    </svg>
  ),
  error: (
    <svg
      className='w-6 h-6 mr-3'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
      ></path>
    </svg>
  ),
  info: (
    <svg
      className='w-6 h-6 mr-3'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      ></path>
    </svg>
  ),
};

const Notification = () => {
  const { notification, hideNotification } = useNotification();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(hideNotification, 300); // allow fade-out to finish
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  const handleClose = () => {
    setShow(false);
    setTimeout(hideNotification, 300);
  };

  if (notification == null) return;

  const { message, type } = notification;

  // Novas classes de estilo mais suaves
  const baseClasses =
    'fixed top-5 right-5 flex items-center p-4 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out z-[2000]';
  const typeClasses = {
    success: 'bg-green-600', // Um verde um pouco mais escuro
    error: 'bg-red-600', // Um vermelho um pouco mais escuro
    info: 'bg-blue-600', // Um azul um pouco mais escuro
  };

  // Classes para a animação de entrada e saída
  const animationClasses = show
    ? 'opacity-100 translate-x-0'
    : 'opacity-0 translate-x-12';

  return (
    <div
      className={`${baseClasses} ${
        typeClasses[type] || typeClasses.info
      } ${animationClasses}`}
    >
      {icons[type]}
      <span>{message}</span>
      <button
        onClick={handleClose}
        className='ml-4 p-1 rounded-full hover:bg-black/20'
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Notification;
