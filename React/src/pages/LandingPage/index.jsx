import JuridiaLogo from '../../assets/juridia_logo.png';
import MainPopUp from '../../components/MainPopUp';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(null);

  const abrirPopup = () => setIsPopupOpen(true);
  const fecharPopup = () => setIsPopupOpen(false);

  const sendFile = async () => {
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const resp = await axios.post('http://localhost:8081/simplify', form, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(resp.data);
      setLink(url);
    } catch (err) {
      console.error('Erro ao enviar o arquivo:', err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-[1512px] mx-auto text-[#1F2A44] font-poppins bg-[#F4F7FB]">
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

          {/* ===== HOW IT WORKS SECTION ===== */}
          <section className="flex flex-col items-center text-center py-20 px-10">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Como funciona?</h2>
            <div className="flex justify-center gap-8 flex-wrap w-full">
              <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
                <h3 className="text-3xl font-bold mb-6">Anexe seu contrato</h3>
                <p className="font-montserrat text-xl font-bold leading-relaxed">Faça o upload do seu documento em formato .pdf ou .txt de forma rápida e segura.</p>
              </div>
              <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
                <h3 className="text-3xl font-bold mb-6">Nossa IA analisa</h3>
                <p className="font-montserrat text-xl font-bold leading-relaxed">Nossa inteligência artificial processa o texto, identificando termos complexos e cláusulas chave.</p>
              </div>
              <div className="w-[410px] bg-[#1F2A44] shadow-md rounded-[50px] p-12 text-[#F4F7FB]">
                <h3 className="text-3xl font-bold mb-6">3. Simplificação pronta</h3>
                <p className="font-montserrat text-xl font-bold leading-relaxed">Obtenha uma explicação clara e objetiva do seu contrato, em linguagem acessível.</p>
              </div>
            </div>
          </section>

          {/* ===== ABOUT SECTION ===== */}
          <section className="bg-white flex flex-col items-center text-center py-20 px-10">
            <h2 className="text-5xl font-bold leading-tight text-[#1F2A44] mb-6">Sobre a JuridIA</h2>
            <p className="text-3xl leading-relaxed max-w-6xl">
              Na JuridIA, acreditamos que todos têm o direito de entender completamente os documentos que assinam. Nossa missão é quebrar as barreiras do <span className="text-[#0DACAC]">"juridiquês"</span>, utilizando o poder da Inteligência Artificial para tornar contratos e termos legais acessíveis a todos.<br/>Combinamos tecnologia de ponta com um compromisso com a clareza e a simplicidade, para que você possa tomar decisões informadas com confiança.
            </p>
          </section>

          {/* ===== FAQ SECTION ===== */}
          <section className="flex flex-col items-center text-center py-20 px-10">
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

      {/* Componente do popup: */}
      <MainPopUp isOpen={isPopupOpen} onClose={fecharPopup}>
        {!link ? (
          <>
            <input
              className='text-white mb-4'
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              className='w-1/3 border border-black rounded-md cursor-pointer mt-auto p-1 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
              disabled={loading || !file}
              onClick={sendFile}
            >
              {!loading ? "Simplificar" : "Simplificando..."}
            </button>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 text-white'>
            <a href={link} target="_blank" download="simplificado.pdf" className='underline text-xl'>Baixe aqui o seu arquivo</a>
            <a href={link} target="_blank" className='underline text-xl'>ou acesse-o por este link</a>
          </div>
        )}
      </MainPopUp>
    </>
  );
}

export default LandingPage;