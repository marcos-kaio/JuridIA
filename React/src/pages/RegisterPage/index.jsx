import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin, register } from '../../services/authService.js';
import { useNotification } from '../../context/NotificationContext.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    birthday: '',
    escolaridade: '',
    password: ''
  });
  // Novo estado para a confirmação de senha
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'birthday') {
      const onlyNums = value.replace(/\D/g, '');
      let formattedDate = onlyNums;

      if (onlyNums.length > 4) {
        formattedDate = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
      } else if (onlyNums.length > 2) {
        formattedDate = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`;
      }
      
      setUserInfo(c => ({ ...c, [name]: formattedDate }));
    } else {
      setUserInfo(c => ({ ...c, [name]: value }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VERIFICAÇÃO DE SENHA ADICIONADA AQUI ---
    if (userInfo.password !== confirmPassword) {
      showNotification("As senhas não coincidem!", 'error');
      return; // Interrompe o envio do formulário
    }

    const submissionData = { ...userInfo };

    if (submissionData.birthday) {
      const parts = submissionData.birthday.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        if (day.length === 2 && month.length === 2 && year.length === 4) {
          submissionData.birthday = `${year}-${month}-${day}`;
        } else {
          showNotification("Formato de data inválido. Use DD/MM/AAAA.", 'error');
          return;
        }
      } else {
        showNotification("Formato de data inválido. Use DD/MM/AAAA.", 'error');
        return;
      }
    }

    try {
      const data = await register(submissionData);
      showNotification(`Registro bem-sucedido. Seja bem vindo(a), ${data.username}!`, 'success');
      
      await apiLogin({
        email: userInfo.email,
        password: userInfo.password
      });
      navigate("/", { replace: true });

    } catch (err) {
      console.error("Erro ao registrar: ", err);
      showNotification(err.message, 'error'); 
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#1F2A44] flex justify-center items-center p-5 box-border">
      <div className="w-full max-w-5xl bg-[#F4F7FB] rounded-lg p-10 md:p-12 box-border flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-[#1F2A44] text-4xl md:text-5xl font-bold font-montserrat">Cadastre-se</h1>
          <p className="text-[#A0A0A0] text-base font-light mt-2.5">
            Preencha suas informações abaixo para criar uma conta
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-5">
            {/* Input de Email */}
            <div className="relative flex items-center bg-[rgba(229,229,230,0.81)] rounded-md w-full">
              <div className="absolute left-4 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="email" name='email' value={userInfo.email} onChange={handleChange} placeholder="Digite seu E-mail" className="w-full p-5 pl-12 bg-transparent text-lg text-[#1F2A44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0DACAC] placeholder:text-[#AFAFAF]" required />
            </div>
            {/* Input de Nome */}
            <div className="relative flex items-center bg-[rgba(229,229,230,0.81)] rounded-md w-full">
              <div className="absolute left-4 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="text" name='username' value={userInfo.username} onChange={handleChange} placeholder="Digite seu nome" className="w-full p-5 pl-12 bg-transparent text-lg text-[#1F2A44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0DACAC] placeholder:text-[#AFAFAF]" required />
            </div>
            {/* Input de Data de Nascimento */}
            <div className="relative flex items-center bg-[rgba(229,229,230,0.81)] rounded-md w-full">
              <div className="absolute left-4 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="text" name='birthday' value={userInfo.birthday} onChange={handleChange} placeholder="Data de nascimento" maxLength="10" className="w-full p-5 pl-12 bg-transparent text-lg text-[#1F2A44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0DACAC] placeholder:text-[#AFAFAF]" required />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {/* Input de Escolaridade (CORRIGIDO) */}
            <div className="relative flex items-center bg-[rgba(229,229,230,0.81)] rounded-md w-full">
              <div className="absolute left-4 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3H7C8.10457 3 9 3.89543 9 5V21C9 19.8954 8.10457 19 7 19H2V3Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 3H17C15.8954 3 15 3.89543 15 5V21C15 19.8954 15.8954 19 17 19H22V3Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <select name='escolaridade' value={userInfo.escolaridade} onChange={handleChange} className="w-full p-5 pl-12 bg-transparent text-lg text-[#AFAFAF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0DACAC] appearance-none cursor-pointer invalid:text-[#AFAFAF] focus:text-[#1F2A44]" required>
                <option value="" disabled>Escolaridade</option>
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Médio</option>
                <option value="superior">Ensino Superior</option>
              </select>
            </div>
            {/* Input de Senha */}
            <div className="relative flex items-center bg-[rgba(229,229,230,0.81)] rounded-md w-full">
              <div className="absolute left-4 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="password" name='password' value={userInfo.password} onChange={handleChange} placeholder="Digite sua senha" className="w-full p-5 pl-12 bg-transparent text-lg text-[#1F2A44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0DACAC] placeholder:text-[#AFAFAF]" required />
            </div>
            {/* Input de Confirmar Senha */}
            <div className="relative flex items-center bg-[rgba(229,229,230,0.81)] rounded-md w-full">
              <div className="absolute left-4 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha" className="w-full p-5 pl-12 bg-transparent text-lg text-[#1F2A44] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0DACAC] placeholder:text-[#AFAFAF]" required />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col items-center gap-4 mt-2">
              <button type='submit' className="w-full max-w-[280px] py-4 px-8 bg-[#0DACAC] text-white text-2xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors">Cadastrar</button>
              <div className="text-base font-normal">
                  <span className="text-[#1f2a44]">Já tem uma conta? </span>
                  <Link to="/login" className="text-[#007B9E] no-underline cursor-pointer">Entre aqui</Link>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;