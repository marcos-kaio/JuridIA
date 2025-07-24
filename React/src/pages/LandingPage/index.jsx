import JuridiaLogo from '../../assets/juridia_logo.jpg';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../services/authService';
import { uploadAndSimplifyPdf } from '../../services/chatService';
import { useNotification } from '../../context/NotificationContext';

function LandingPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Clique para anexar ou arraste seu arquivo');
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { showNotification } = useNotification();

  // Refs para cada seção que queremos observar
  const sectionRefs = {
    home: useRef(null),
    'how-it-works': useRef(null),
    about: useRef(null),
    faq: useRef(null),
  };

  useEffect(() => {
    // Lógica do Intersection Observer para destacar o link ativo
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // Observa em relação ao viewport
      rootMargin: '0px',
      threshold: 0.4, // Ativa quando 40% da seção está visível
    });

    // Anexa o observer a cada uma das seções
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Limpeza ao desmontar o componente
    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []); // Executa apenas uma vez

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
  }

  const handleStart = () => {
    if(logged){
      navigate("/chat");
    } else{
      navigate("/login");
    }
  }

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

  // Função para gerar as classes do link de navegação dinamicamente
  const navLinkClass = (sectionId) =>
    `text-xl font-semibold no-underline py-2.5 transition-colors ${
      activeSection === sectionId
        ? 'text-[#0DACAC] underline'
        : 'text-[#1F2A44]'
    }`;

  return (
    <>
      <div className="w-full max-w-[1512px] mx-auto text-[#1F2A44] font-poppins bg-[#F4F7FB]">
        {/* ===== HEADER ===== */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-32 px-20 bg-[#F4F7FB] shadow-md">
          <div className="absolute bottom-0 left-20 right-20 h-0.5 bg-[#007B9E]"></div>
          <img className="w-[290px] h-[79px]" src={JuridiaLogo} alt="Logo da JuridIA" />
          <nav className="flex gap-10">
            <a href="#home" className={navLinkClass('home')}>Home</a>
            <a href="#how-it-works" className={navLinkClass('how-it-works')}>Como funciona</a>
            <a href="#about" className={navLinkClass('about')}>Sobre</a>
            <a href="#faq" className={navLinkClass('faq')}>FAQ</a>
          </nav>
          {
            logged ?
            (<div className="w-16 h-16 cursor-pointer" onClick={handleLeave}>
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_121_535)"><path d="M22 12C22 13.5913 21.3679 15.1174 20.2426 16.2426C19.1174 17.3679 17.5913 18 16 18C14.4087 18 12.8826 17.3679 11.7574 16.2426C10.6321 15.1174 10 13.5913 10 12C10 10.4087 10.6321 8.88258 11.7574 7.75736C12.8826 6.63214 14.4087 6 16 6C17.5913 6 19.1174 6.63214 20.2426 7.75736C21.3679 8.88258 22 10.4087 22 12Z" fill="#0DACAC"/><path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16ZM16 2C13.3636 2.00014 10.7807 2.74473 8.54881 4.14806C6.31688 5.55139 4.52657 7.55642 3.38393 9.93239C2.24129 12.3084 1.79277 14.9587 2.09 17.5783C2.38722 20.198 3.41811 22.6804 5.064 24.74C6.484 22.452 9.61 20 16 20C22.39 20 25.514 22.45 26.936 24.74C28.5819 22.6804 29.6128 20.198 29.91 17.5783C30.2072 14.9587 29.7587 12.3084 28.6161 9.93239C27.4734 7.55642 25.6831 5.55139 23.4512 4.14806C21.2193 2.74473 18.6364 2.00014 16 2Z" fill="#0DACAC"/></g><defs><clipPath id="clip0_121_535"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>
            </div>) :
            (<div className="flex items-center gap-4">
              <Link to="/login" className="font-bold text-xl rounded-md cursor-pointer no-underline bg-[#0DACAC] text-white py-3 px-8">Entrar</Link>
              <Link to="/register" className="font-bold text-xl rounded-md cursor-pointer no-underline bg-[#F4F7FB] text-[#1F2A44] border border-[#1F2A44] py-3 px-6">Cadastre-se</Link>
            </div>)
          }
        </header>

        <main className="pt-32">
          {/* ===== HERO SECTION ===== */}
          <section ref={sectionRefs.home} id="home" className="flex justify-center text-center py-20 px-10">
            <div className="max-w-[705px]">
              <h1 className="text-5xl font-bold leading-tight mb-4">Entenda seus contratos de verdade com o poder da <span className="text-[#0DACAC]">IA</span></h1>
              <p className="font-montserrat text-xl leading-relaxed mb-8">
                Transforme juridiquês em linguagem simples e visual<br />
                <span className="text-[#0DACAC] font-bold">Rápido, seguro e direto na palma da sua mão.</span>
              </p>
              <button onClick={handleStart} className="inline-block bg-[#0DACAC] text-white font-montserrat text-2xl font-bold rounded-lg border-none py-4 px-20 cursor-pointer no-underline">Comece agora!</button>
            </div>
          </section>

          {/* ===== CONTRACT SIMPLIFIER SECTION ===== */}
          <section className="flex flex-col items-center text-center py-20 px-10">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Simplifique seu contrato</h2>
            <p className="font-montserrat text-xl leading-relaxed max-w-[605px] mb-10">Faça o upload do seu contrato em formato pdf ou .txt e nossa Inteligência Artificial irá fornecer uma explicação clara e concisa dos termos mais importantes.</p>
            <div className="w-full max-w-5xl bg-[#EBEBEB] shadow-sm rounded-[50px] p-6">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf,.txt" className="hidden"/>
              <div className="h-[186px] bg-[rgba(226,232,240,0.24)] shadow-inner rounded-[37px] flex items-center justify-center border-2 border-dashed border-[#b0b0b0] mb-6 cursor-pointer text-black text-4xl" onClick={handleAreaClick}>
                <p>{fileName}</p>
              </div>
              <button className="w-full h-[67px] bg-[#F4F7FB] shadow-md rounded-[37px] border-none text-[#1F2A44] text-4xl font-bold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={handleSimplify} disabled={loading || !file}>
                {loading ? 'Simplificando...' : 'Simplificar contrato'}
              </button>
            </div>
          </section>

          {/* ===== HOW IT WORKS SECTION ===== */}
          <section ref={sectionRefs['how-it-works']} id="how-it-works" className="flex flex-col items-center text-center py-20 px-10 scroll-mt-32">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Como funciona?</h2>
            <div className="flex justify-center gap-8 flex-wrap w-full">
              <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
                <h3 className="text-3xl font-bold mb-6">1&#41; Anexe seu contrato</h3>
                <p className="font-montserrat text-xl font-bold leading-relaxed">Faça o upload do seu documento em formato .pdf ou .txt de forma rápida e segura.</p>
              </div>
              <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
                <h3 className="text-3xl font-bold mb-6">2&#41; Nossa IA analisa</h3>
                <p className="font-montserrat text-xl font-bold leading-relaxed">Nossa inteligência artificial processa o texto, identificando termos complexos e cláusulas chave.</p>
              </div>
              <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
                <h3 className="text-3xl font-bold mb-6">3&#41; Simplificação pronta</h3>
                <p className="font-montserrat text-xl font-bold leading-relaxed">Obtenha uma explicação clara e objetiva do seu contrato, em linguagem acessível.</p>
              </div>
            </div>
          </section>

          {/* ===== ABOUT SECTION ===== */}
          <section ref={sectionRefs.about} id="about" className="bg-white flex flex-col items-center text-center py-20 px-10 scroll-mt-32">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Sobre a JuridIA</h2>
            <p className="text-3xl leading-relaxed max-w-6xl">
              Na JuridIA, acreditamos que todos têm o direito de entender completamente os documentos que assinam. Nossa missão é quebrar as barreiras do <span className="text-[#0DACAC]">"juridiquês"</span>, utilizando o poder da Inteligência Artificial para tornar contratos e termos legais acessíveis a todos.<br/>Combinamos tecnologia de ponta com um compromisso com a clareza e a simplicidade, para que você possa tomar decisões informadas com confiança.
            </p>
          </section>

          {/* ===== FAQ SECTION ===== */}
          <section ref={sectionRefs.faq} id="faq" className="flex flex-col items-center text-center py-20 px-10 scroll-mt-32">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Perguntas Frequentes</h2>
            <div className="flex flex-col gap-5 w-full max-w-4xl mt-10">
              <div className="bg-[#0DACAC] shadow-inner rounded-3xl p-8 text-white text-3xl font-semibold text-left cursor-pointer">A JuridIA é segura para usar com meus contratos?</div>
              <div className="bg-[#0DACAC] shadow-inner rounded-3xl p-8 text-white text-3xl font-semibold text-left cursor-pointer">Quais tipos de arquivo posso enviar?</div>
              <div className="bg-[#0DACAC] shadow-inner rounded-3xl p-8 text-white text-3xl font-semibold text-left cursor-pointer">Quão precisa é a simplificação da IA?</div>
              <div className="bg-[#0DACAC] shadow-inner rounded-3xl p-8 text-white text-3xl font-semibold text-left cursor-pointer">A IA consegue entender qualquer tipo de contrato?</div>
            </div>
          </section>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="bg-[#1F2A44] text-white text-center py-10 px-5">
          <p className="m-0 font-light text-3xl">© JuridIA. Todos os direitos reservados.</p>
          <p className="m-0 font-extralight text-2xl mt-2">Simplificando o complexo, um contrato por vez.</p>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;