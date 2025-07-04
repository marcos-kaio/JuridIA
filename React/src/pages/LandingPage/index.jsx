import JuridiaLogo from '../../assets/juridia_logo.png';
import MainPopUp from '../../components/MainPopUp';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const abrirPopup = () => {
    setIsPopupOpen(true);
  };

  const fecharPopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-[1512px] mx-auto text-[#1F2A44] font-poppins">
        {/* ===== HEADER ===== */}
        <header className="relative flex items-center justify-between h-32 px-20">
          <div className="absolute bottom-0 left-20 right-20 h-0.5 bg-[#007B9E]"></div>
          <img className="w-[290px] h-[79px]" src={JuridiaLogo} alt="Logo da JuridIA" />
          <nav className="flex gap-10">
            <a href="#" className="text-xl font-semibold text-[#0DACAC] no-underline py-2.5 underline">Home</a>
            <a href="#" className="text-xl font-semibold text-[#1F2A44] no-underline py-2.5">Como funciona</a>
            <a href="#" className="text-xl font-semibold text-[#1F2A44] no-underline py-2.5">Sobre</a>
            <a href="#" className="text-xl font-semibold text-[#1F2A44] no-underline py-2.5">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="font-bold text-xl rounded-md cursor-pointer no-underline bg-[#0DACAC] text-white py-3 px-8">Entrar</Link>
            <Link to="/register" className="font-bold text-xl rounded-md cursor-pointer no-underline bg-[#F4F7FB] text-[#1F2A44] border border-[#1F2A44] py-3 px-6">Cadastre-se</Link>
          </div>
        </header>

        <main>
          {/* ===== HERO SECTION ===== */}
          <section className="flex justify-center text-center py-20 px-10">
            <div className="max-w-[705px]">
              <h1 className="text-5xl font-bold leading-tight mb-4">Entenda seus contratos de verdade com o poder da <span className="text-[#0DACAC]">IA</span></h1>
              <p className="font-montserrat text-xl leading-relaxed mb-8">
                Transforme juridiquês em linguagem simples e visual<br />
                <span className="text-[#0DACAC] font-bold">Rápido, seguro e direto na palma da sua mão.</span>
              </p>
              <Link to="/chat" className="inline-block bg-[#0DACAC] text-white font-montserrat text-2xl font-bold rounded-lg border-none py-4 px-20 cursor-pointer no-underline">Comece agora!</Link>
            </div>
          </section>

          {/* ===== CONTRACT SIMPLIFIER SECTION ===== */}
          <section className="flex flex-col items-center text-center py-20 px-10">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Simplifique seu contrato</h2>
            <p className="font-montserrat text-xl leading-relaxed max-w-[605px] mb-10">Faça o upload do seu contrato em formato pdf ou .txt e nossa Inteligência Artificial irá fornecer uma explicação clara e concisa dos termos mais importantes.</p>
            <div className="w-full max-w-5xl bg-[#EBEBEB] shadow-sm rounded-[50px] p-6">
              <div className="h-[186px] bg-[rgba(226,232,240,0.24)] shadow-inner rounded-[37px] flex items-center justify-center border-2 border-dashed border-[#b0b0b0] mb-6 cursor-pointer text-black text-4xl">
                <p>Clique para anexar ou arraste seu arquivo</p>
              </div>
              <button className="w-full h-[67px] bg-[#F4F7FB] shadow-md rounded-[37px] border-none text-[#1F2A44] text-4xl font-bold cursor-pointer" onClick={abrirPopup}>Simplificar contrato</button>
            </div>
          </section>

           {/* ... (Restante do seu JSX com classes Tailwind) ... */}
        </main>
      </div>

      <MainPopUp isOpen={isPopupOpen} onClose={fecharPopup}>
        {/* ... (Conteúdo do Popup) ... */}
      </MainPopUp>
    </>
  );
}

export default LandingPage;