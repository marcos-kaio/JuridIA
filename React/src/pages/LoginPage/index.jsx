import './LoginPage.css';

// Um componente simples para a ilustração, para manter o código limpo
const LoginIllustration = () => (
  <div className="illustration-container">
    {/* A ilustração (SVG complexo) pode ser inserida aqui ou como um <img> */}
    <p style={{ fontSize: '2rem', color: 'white' }}>Ilustração aqui</p>
  </div>
);

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Coluna da Esquerda (Ilustração) - Será escondida em telas pequenas */}
      <div className="login-content-field">
        <LoginIllustration />
      </div>

      {/* Coluna da Direita (Formulário) */}
      <div className="login-form-container">
        
        <div className="form-header">
          <h1 className="form-title">Login</h1>
          <p className="form-subtitle">Acesse sua conta usando e-mail e senha</p>
        </div>

        <div className="input-wrapper">
          <div className="input-icon">
            {/* Ícone de Email */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <input type="email" placeholder="Digite seu E-mail" className="input-field" />
        </div>

        <div className="input-wrapper">
          <div className="input-icon">
            {/* Ícone de Senha */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <input type="password" placeholder="Digite sua senha" className="input-field" />
        </div>

        <a href="#" className="forgot-password-link">Esqueci a senha</a>

        <button className="login-button">Login</button>
        
        <div className="signup-link">
          <span className="text-dark">Não tem uma conta? </span>
          <a href="/register" className="text-link">Cadastre-se</a>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;