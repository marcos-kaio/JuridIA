import { useEffect, useState } from "react";
import { checkAuth, login } from "../../services/authService.js";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext.jsx";
import JuridiaLogo from '../../assets/juridia_logo_texto_branco.png';

// Ícones de olho para a funcionalidade de ver/ocultar senha
const EyeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

const EyeOffIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
);

const LoginIllustration = () => (
  <div className='max-w-[600px] px-8'>
    <img src={JuridiaLogo} alt='Logo JuridIA' />
  </div>
);

const LoginPage = () => {
  const [credenciais, setCredenciais] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      const { valid } = await checkAuth();
      if (valid) {
        navigate('/', { replace: true });
      }
    })();
  }, [navigate]);

  function handleChange(e) {
    setCredenciais((c) => ({ ...c, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credenciais);
      showNotification(
        `${data.username}, você foi logado com sucesso!`,
        'success'
      );
      navigate('/', { replace: true });
    } catch (err) {
      showNotification('Credenciais inválidas!', 'error');
    }
  };

  return (
    <div className='flex w-full min-h-screen font-sans'>
      <div className='hidden lg:flex lg:w-[47%] bg-[#1F2A44] justify-center items-center'>
        <Link to="/">
          <LoginIllustration />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full lg:w-[53%] bg-[#F4F7FB] flex flex-col justify-center items-center p-5 box-border gap-5'
      >
        <div className='w-full max-w-[430px] text-left'>
          <h1 className='text-[#1F2A44] text-5xl font-bold font-montserrat mb-2.5'>
            Login
          </h1>
          <p className='text-[#A0A0A0] text-base font-light'>
            Acesse sua conta usando e-mail e senha
          </p>
        </div>
        <div className='relative w-full max-w-[430px]'>
          <div className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z'
                stroke='#AFAFAF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M22 6L12 13L2 6'
                stroke='#AFAFAF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <input
            type='email'
            name='email'
            value={credenciais.email}
            onChange={handleChange}
            placeholder='Digite seu E-mail'
            className='w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]'
          />
        </div>
        <div className='group relative w-full max-w-[430px]'>
          <div className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='3'
                y='11'
                width='18'
                height='11'
                rx='2'
                ry='2'
                stroke='#AFAFAF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11'
                stroke='#AFAFAF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={credenciais.password}
            onChange={handleChange}
            placeholder='Digite sua senha'
            className='w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]'
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer invisible group-hover:visible" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon className="text-[#AFAFAF]"/> : <EyeIcon className="text-[#AFAFAF]"/>}
          </div>
        </div>
        <Link to="/forgot-password" className="w-full max-w-[430px] text-right text-[#1F2A44] text-base underline">Esqueci a senha</Link>
        <button type="submit" className="w-full max-w-[430px] p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors">Login</button>
        <div className="text-center text-base">
          <span className="text-[#1f2a44]">Não tem uma conta? </span>
          <Link to="/register" className="text-[#007B9E] no-underline">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;