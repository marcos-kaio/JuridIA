import { useEffect, useState } from "react";
import { checkAuth, login } from "../../services/authService.js";
import { useNavigate, Link } from "react-router-dom"; // Importe o Link
import { useNotification } from "../../context/NotificationContext.jsx";
import JuridiaLogo from '../../assets/juridia_logo_texto_branco.png'; 

const LoginIllustration = () => (
  <div className='max-w-[600px] px-8'>
    <img src={JuridiaLogo} alt='Logo JuridIA' />
  </div>
);

const LoginPage = () => {
  const [credenciais, setCredenciais] = useState({ email: '', password: '' });
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
        <LoginIllustration />
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
            onChange={handleChange}
            placeholder='Digite seu E-mail'
            className='w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]'
          />
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
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='Digite sua senha'
            className='w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]'
          />
        </div>
<<<<<<< HEAD
        <Link to="/forgot-password" className="w-full max-w-[430px] text-right text-[#1F2A44] text-base underline">Esqueci a senha</Link>
        <button type="submit" className="w-full max-w-[430px] p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors">Login</button>
        <div className="text-center text-base">
          <span className="text-[#1f2a44]">Não tem uma conta? </span>
          <Link to="/register" className="text-[#007B9E] no-underline">Cadastre-se</Link>
=======
        <a
          href='#'
          className='w-full max-w-[430px] text-right text-[#1F2A44] text-base underline'
        >
          Esqueci a senha
        </a>
        <button
          type='submit'
          className='w-full max-w-[430px] p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors'
        >
          Login
        </button>
        <div className='text-center text-base'>
          <span className='text-[#1f2a44]'>Não tem uma conta? </span>
          <a href='/register' className='text-[#007B9E] no-underline'>
            Cadastre-se
          </a>
>>>>>>> 5db297d (feat: pagina de perfil + move o usuario pra ela ao clicar na foto de perfil)
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
