function MainPopUp({ isOpen, onClose, children }) {
  if (!isOpen) return null; // caso não esteja aberto, retorna nada
  return (
    <div
      className='fixed top-0 left-0 w-dvw h-dvh bg-black/50 flex items-center justify-center z-10'
      onClick={onClose}
    >
      <div
        className='min-w-72 bg-blue-950 p-5 shadow-lg z-100 border 
          rounded-lg w-2/5 h-80 flex flex-col items-center justify-center
        '
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default MainPopUp;
