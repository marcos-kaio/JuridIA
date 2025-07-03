import JuridiaLogo from '../../assets/juridia_logo.png';
import MainPopUp from '../../components/MainPopUp';
import { Button, Title } from '../../components/utilities';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState();

  const abrirPopup = () => {
    setIsPopupOpen(true);
  };
  const fecharPopup = () => {
    setIsPopupOpen(false);
  };

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
      <div>
        <div className='w-full max-w-7xl m-auto text-blue-950'>
          {/* ===== HEADER ===== */}
          <header className='flex items-center justify-between px-20 py-8 relative h-32'>
            <div className='absolute bottom-0 left-20 right-20 h-0.5 bg-cyan-600'></div>
            <img className='w-36' src={JuridiaLogo} alt='Logo da JuridIA' />
            <nav className='flex gap-9'>
              <a href='#' className='text-lg font-medium text-blue-950 px-2'>
                Home
              </a>
              <a href='#' className='text-lg font-medium text-blue-950 px-2'>
                Como funciona
              </a>
              <a href='#' className='text-lg font-medium text-blue-950 px-2'>
                Sobre
              </a>
              <a href='#' className='text-lg font-medium text-blue-950 px-2'>
                FAQ
              </a>
            </nav>
            <div className='flex gap-4 items-center'>
              {/* O botão "Entrar" agora é um Link */}
              <Link to='/login' className='min-w-30'>
                <Button>Entrar</Button>
              </Link>
              <Link to='/register' className=''>
                <Button variant='secondary'>Cadastre-se</Button>
              </Link>
            </div>
          </header>

          <main>
            {/* ===== HERO SECTION ===== */}
            <section className='flex items-center justify-center px-4 pt-16'>
              <div className='w-full max-w-3xl flex items-center text-center justify-center flex-col gap-5'>
                <Title>
                  Entenda seus contratos de verdade com o poder da{' '}
                  <span className='text-cyan-600'>IA</span>
                </Title>
                <p className='text-lg'>
                  Transforme juridiquês em linguagem simples e visual
                  <br />
                  <span className='text-cyan-600 font-medium bold'>
                    Rápido, seguro e direto na palma da sua mão.
                  </span>
                </p>
                <Link to='/chat'>
                  <Button className='w-full max-w-80'>Comece agora!</Button>
                </Link>
              </div>
              {/* A imagem do personagem/ilustração iria aqui */}
            </section>

            {/* ===== CONTRACT SIMPLIFIER SECTION ===== */}
            <section className='flex flex-col items-center justify-center px-10 pt-20 text-center gap-4'>
              <Title size={4}>Simplifique seu contrato</Title>
              <p className='w-full mb-4 max-w-xl '>
                Faça o upload do seu contrato em formato pdf ou .txt e nossa
                Inteligência Artificial irá fornecer uma explicação clara e
                concisa dos termos mais importantes.
              </p>
              <div className='w-full max-w-4xl rounded-lg'>
                <div
                  className={`text-xl py-10 mt-4 mb-8 cursor-pointer shadow-lg rounded-4xl 
                            flex items-center justify-center border-2 border-dashed
                            text-black font-medium hover:bg-gray-50 transition-colors`}
                >
                  <p>Clique para anexar ou arraste seu arquivo</p>
                </div>
                <Button onClick={abrirPopup}>Simplificar contrato</Button>
              </div>
            </section>

            {/* ===== HOW IT WORKS SECTION ===== */}
            <section className='flex flex-col items-center justify-center px-10 pt-20 text-center gap-4'>
              <Title size={4} className='mb-6'>
                Como funciona?
              </Title>
              <div className='flex justify-center gap-8 flex-wrap w-full'>
                <div className='w-80 bg-gray-900 rounded-xl p-8 text-white'>
                  <h3 className='font-medium text-2xl mb-2'>
                    1. Anexe seu contrato
                  </h3>
                  <p className='text-gray-200'>
                    Faça o upload do seu documento em formato .pdf ou .txt de
                    forma rápida e segura.
                  </p>
                </div>
                <div className='w-80 bg-gray-900 rounded-xl p-8 text-white'>
                  <h3 className='font-medium text-2xl mb-2'>
                    2. Nossa IA analisa
                  </h3>
                  <p className='text-gray-200'>
                    Nossa inteligência artificial processa o texto,
                    identificando termos complexos e cláusulas chave.
                  </p>
                </div>
                <div className='w-80 bg-gray-900 rounded-xl p-8 text-white'>
                  <h3 className='font-medium text-2xl mb-2'>
                    3. Simplificação pronta
                  </h3>
                  <p className='text-gray-200'>
                    Obtenha uma explicação clara e objetiva do seu contrato, em
                    linguagem acessível.
                  </p>
                </div>
              </div>
            </section>

            {/* ===== ABOUT SECTION ===== */}
            <section className='flex flex-col items-center justify-center px-10 pt-20 text-center gap-4'>
              <Title size={4}>Sobre a JuridIA</Title>
              <p className='text-xl max-w-4xl'>
                Na JuridIA, acreditamos que todos têm o direito de entender
                completamente os documentos que assinam. Nossa missão é quebrar
                as barreiras do{' '}
                <span className='text-cyan-500'>"juridiquês"</span>, utilizando
                o poder da Inteligência Artificial para tornar contratos e
                termos legais acessíveis a todos.
                <br />
                Combinamos tecnologia de ponta com um compromisso com a clareza
                e a simplicidade, para que você possa tomar decisões informadas
                com confiança.
              </p>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className='flex flex-col items-center justify-center px-10 pt-20 text-center gap-4'>
              <Title size={4}>Perguntas Frequentes</Title>
              <div className='flex flex-col gap-5 w-full max-w-4xl mt-8'>
                <div className='bg-cyan-700 shadow-lg rounded-xl p-6 text-white text-2xl font-medium text-left cursor-pointer'>
                  A JuridIA é segura para usar com meus contratos?
                </div>
                <div className='bg-cyan-700 shadow-lg rounded-xl p-6 text-white text-2xl font-medium text-left cursor-pointer'>
                  Quais tipos de arquivo posso enviar?
                </div>
                <div className='bg-cyan-700 shadow-lg rounded-xl p-6 text-white text-2xl font-medium text-left cursor-pointer'>
                  Quão precisa é a simplificação da IA?
                </div>
                <div className='bg-cyan-700 shadow-lg rounded-xl p-6 text-white text-2xl font-medium text-left cursor-pointer'>
                  A IA consegue entender qualquer tipo de contrato?
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className='bg-gray-900 text-white py-10 font-medium mt-20 px-8 w-full text-center'>
          <p>© JuridIA. Todos os direitos reservados.</p>
          <p className='footer-subtitle'>
            Simplificando o complexo, um contrato por vez.
          </p>
        </footer>
      </div>

      {/* Componente do popup: */}
      <MainPopUp isOpen={isPopupOpen} onClose={fecharPopup}>
        {!link ? (
          <>
            <input
              type='file'
              accept='application/pdf'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button disabled={loading} onClick={() => file && sendFile()}>
              {!loading ? 'Simplificar arquivo' : 'Simplificando...'}
            </button>
          </>
        ) : (
          <>
            <a href={link} target='_blank' download='simplificado.pdf'>
              Baixe aqui
            </a>
            <a href={link} target='_blank'>
              Acesse o arquivo
            </a>
          </>
        )}
      </MainPopUp>
    </>
  );
}

export default LandingPage;
