import Logo from "../../components/Logo";
import MainPopUp from "../../components/MainPopUp";
import "./styles.css";
import { useState } from "react";
import axios from "axios";

function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // define se o popup está aberto ou não
  const [file, setFile] = useState(); // arquivo a ser enviado
  const [loading, setLoading] = useState(false); // carregamento de envio
  const [link, setLink] = useState(); // link final de download

  // funções para controlar popup:
  const abrirPopup = () => {
    setIsPopupOpen(true);
  };
  const fecharPopup = () => {
    setIsPopupOpen(false);
  };

  // funções para enviar o arquivo:

  const sendFile = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const resp = await axios.post("http://localhost:8081/simplify", form, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(resp.data);
      setLink(url);
    } catch (err) {
      console.error("Erro ao enviar o arquivo:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="landing-page-container">
        {/* ===== HEADER ===== */}
        <header className="header">
          <div className="header-line"></div>
          <Logo />
          <nav className="header-nav">
            <a href="#" className="nav-link active">
              Home
            </a>
            <a href="#" className="nav-link">
              Como funciona
            </a>
            <a href="#" className="nav-link">
              Sobre
            </a>
            <a href="#" className="nav-link">
              FAQ
            </a>
          </nav>
          <div className="header-actions">
            <button className="btn btn-primary">Entrar</button>
            <button className="btn btn-secondary">Cadastre-se</button>
          </div>
        </header>

        <main>
          {/* ===== HERO SECTION ===== */}
          <section className="hero-section">
            <div className="hero-content">
              <h1>
                Entenda seus contratos de verdade com o poder da{" "}
                <span className="highlight-text">IA</span>
              </h1>
              <p className="hero-subtitle">
                Transforme juridiquês em linguagem simples e visual
                <br />
                <span className="highlight-text bold">
                  Rápido, seguro e direto na palma da sua mão.
                </span>
              </p>
              <button className="btn-hero">Comece agora!</button>
            </div>
            {/* A imagem do personagem/ilustração iria aqui */}
          </section>

          {/* ===== CONTRACT SIMPLIFIER SECTION ===== */}
          <section className="simplifier-section">
            <h2>Simplifique seu contrato</h2>
            <p>
              Faça o upload do seu contrato em formato pdf ou .txt e nossa
              Inteligência Artificial irá fornecer uma explicação clara e
              concisa dos termos mais importantes.
            </p>
            <div className="upload-area">
              <div className="drop-zone">
                <p>Clique para anexar ou arraste seu arquivo</p>
              </div>
              <button className="btn-simplify" onClick={abrirPopup}>
                Simplificar contrato
              </button>
            </div>
          </section>

          {/* ===== HOW IT WORKS SECTION ===== */}
          <section className="how-it-works-section">
            <h2>Como funciona?</h2>
            <div className="cards-container">
              <div className="how-card">
                <h3>Anexe seu contrato</h3>
                <p>
                  Faça o upload do seu documento em formato .pdf ou .txt de
                  forma rápida e segura.
                </p>
              </div>
              <div className="how-card">
                <h3>Nossa IA analisa</h3>
                <p>
                  Nossa inteligência artificial processa o texto, identificando
                  termos complexos e cláusulas chave.
                </p>
              </div>
              <div className="how-card">
                <h3>3. Simplificação pronta</h3>
                <p>
                  Obtenha uma explicação clara e objetiva do seu contrato, em
                  linguagem acessível.
                </p>
              </div>
            </div>
          </section>

          {/* ===== ABOUT SECTION ===== */}
          <section className="about-section">
            <h2>Sobre a JuridIA</h2>
            <p className="about-text">
              Na JuridIA, acreditamos que todos têm o direito de entender
              completamente os documentos que assinam. Nossa missão é quebrar as
              barreiras do <span className="highlight-text">"juridiquês"</span>,
              utilizando o poder da Inteligência Artificial para tornar
              contratos e termos legais acessíveis a todos.
              <br />
              Combinamos tecnologia de ponta com um compromisso com a clareza e
              a simplicidade, para que você possa tomar decisões informadas com
              confiança.
            </p>
          </section>

          {/* ===== FAQ SECTION ===== */}
          <section className="faq-section">
            <h2>Perguntas Frequentes</h2>
            <div className="faq-list">
              <div className="faq-item">
                A JuridIA é segura para usar com meus contratos?
              </div>
              <div className="faq-item">
                Quais tipos de arquivo posso enviar?
              </div>
              <div className="faq-item">
                Quão precisa é a simplificação da IA?
              </div>
              <div className="faq-item">
                A IA consegue entender qualquer tipo de contrato?
              </div>
            </div>
          </section>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <p>© JuridIA. Todos os direitos reservados.</p>
          <p className="footer-subtitle">
            Simplificando o complexo, um contrato por vez.
          </p>
        </footer>
      </div>

      {/* Componente do popup: */}
      <MainPopUp isOpen={isPopupOpen} onClose={fecharPopup}>
        {!link ? (
          <>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button disabled={loading} onClick={() => file && sendFile()}>
              {!loading ? "Simplificar arquivo" : "Simplificando..."}
            </button>
          </>
        ) : (
          <>
            <a href={link} target="_blank" download="simplificado.pdf">
              Baixe aqui
            </a>
            <a href={link} target="_blank">
              Acesse o arquivo
            </a>
          </>
        )}
      </MainPopUp>
    </>
  );
}

export default LandingPage;
