function MainPopUp({isOpen, onClose, children}) {
    if (!isOpen) return null // caso não esteja aberto, retorna nada
    return ( 
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
            <div 
                className="bg-[#153852] py-5 px-7 shadow-lg z-[1000] border border-[#f4f7fb] rounded-lg w-2/5 h-[300px] flex flex-col items-center justify-center"
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default MainPopUp;