import './RegisterPage.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="content-box">
        
        <div className="form-header">
          <h1 className="title">Sign up</h1>
          <p className="subtitle">
            Preencha suas informações abaixo para criar uma conta
          </p>
        </div>

        <div className="form-grid">
          {/* Coluna da Esquerda */}
          <div className="input-column">
            <div className="input-container">
              <div className="input-icon">
                {/* Ícone de Email */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="email" placeholder="Digite seu E-mail" className="input-field" />
            </div>
            <div className="input-container">
              <div className="input-icon">
                 {/* Ícone de Usuário */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="text" placeholder="Digite seu nome" className="input-field" />
            </div>
            <div className="input-container">
              <div className="input-icon">
                {/* Ícone de Calendário */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="text" placeholder="Data de nascimento" className="input-field" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} />
            </div>
          </div>
          
          {/* Coluna da Direita */}
          <div className="input-column">
            <div className="input-container">
              <div className="input-icon">
                {/* Ícone de Livro */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3H7C8.10457 3 9 3.89543 9 5V21C9 19.8954 8.10457 19 7 19H2V3Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 3H17C15.8954 3 15 3.89543 15 5V21C15 19.8954 15.8954 19 17 19H22V3Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <select className="input-field" defaultValue="">
                <option value="" disabled>Escolaridade</option>
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
                <option value="superior">Ensino Superior</option>
              </select>
            </div>
            <div className="input-container">
              <div className="input-icon">
                {/* Ícone de Senha */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="password" placeholder="Digite sua senha" className="input-field" />
            </div>
            <div className="input-container">
              <div className="input-icon">
                {/* Ícone de Senha */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="password" placeholder="Confirme sua senha" className="input-field" />
            </div>
          </div>
        </div>

        <div className="actions-container">
            <button className="register-button">Registrar</button>
            <div className="login-link">
                <span className="text-dark">Já tem uma conta? </span>
                <Link to="../Login" className="text-link">Entre aqui</Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;