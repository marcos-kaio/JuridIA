import './MainPopUp.css';

function MainPopUp({ isOpen, onClose, children }) {
  if (!isOpen) return null; // caso não esteja aberto, retorna nada
  return (
    <div className='overlay' onClick={onClose}>
      <div className='popup' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default MainPopUp;
