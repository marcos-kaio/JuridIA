import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../services/authService';
import JuridiaLogo from '../../assets/juridia_logo.png';

// Importando os componentes de seção
import { HeroSection } from '../../components/Landing/HeroSection';
import { ContractSimplifierSection } from '../../components/Landing/ContractSimplifierSection';
import { HowItWorksSection } from '../../components/Landing/HowItWorksSection';
import { AboutSection } from '../../components/Landing/AboutSection';
import { FaqSection } from '../../components/Landing/FaqSection';

function LandingPage() {
  const [logged, setLogged] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const sectionRefs = {
    home: useRef(null),
    'contract-simplifier': useRef(null), // Adicionado para referência
    'how-it-works': useRef(null),
    about: useRef(null),
    faq: useRef(null),
  };

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    });

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    async function verificarLogin() {
      const { valid } = await checkAuth();
      setLogged(valid);
    }
    verificarLogin();
  }, []);

  const handleLeave = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_name");
    window.location.reload();
  };

  const handleStart = () => {
    if(logged){
      navigate("/chat");
    } else{
      navigate("/login");
    }
  };

  const navLinkClass = (sectionId) =>
    `text-xl font-semibold no-underline py-2.5 transition-colors ${
      activeSection === sectionId
        ? 'text-[#0DACAC] underline'
        : 'text-[#1F2A44]'
    }`;

  return (
    <div className="w-full text-[#1F2A44] font-poppins bg-[#F4F7FB]">
      <header className="fixed top-0 left-0 right-0 z-50 h-32 bg-[#F4F7FB] shadow-md">
        <div className="w-full max-w-[1512px] mx-auto h-full flex items-center justify-between px-20">
          <img className="w-[290px] h-[79px]" src={JuridiaLogo} alt="Logo da JuridIA" />
          <nav className="flex gap-10">
            <a href="#home" className={navLinkClass('home')}>Home</a>
            <a href="#how-it-works" className={navLinkClass('how-it-works')}>Como funciona</a>
            <a href="#about" className={navLinkClass('about')}>Sobre</a>
            <a href="#faq" className={navLinkClass('faq')}>FAQ</a>
          </nav>
          {logged ? (
            <div className="w-16 h-16 cursor-pointer" onClick={handleLeave}>
              {/* Profile Icon SVG */}
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_121_535)"><path d="M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z" fill="#0DACAC"/><path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z" fill="#0DACAC"/></g><defs><clipPath id="clip0_121_535"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-bold text-xl rounded-md cursor-pointer no-underline bg-[#0DACAC] text-white py-3 px-8">Entrar</Link>
              <Link to="/register" className="font-bold text-xl rounded-md cursor-pointer no-underline bg-[#F4F7FB] text-[#1F2A44] border border-[#1F2A44] py-3 px-6">Cadastre-se</Link>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007B9E]"></div>
      </header>

      <main className="pt-32">
        <HeroSection onStartClick={handleStart} sectionRef={sectionRefs.home} />
        <ContractSimplifierSection sectionRef={sectionRefs['contract-simplifier']} logged={logged} />
        <HowItWorksSection sectionRef={sectionRefs['how-it-works']} />
        <AboutSection sectionRef={sectionRefs.about} />
        <FaqSection sectionRef={sectionRefs.faq} />
      </main>

      <footer className="bg-[#1F2A44] text-white text-center py-10 px-5">
          <div className="max-w-[1512px] mx-auto">
            <p className="m-0 font-light text-3xl">© JuridIA. Todos os direitos reservados.</p>
            <p className="m-0 font-extralight text-2xl mt-2">Simplificando o complexo, um contrato por vez.</p>
          </div>
      </footer>
    </div>
  );
}

export default LandingPage;