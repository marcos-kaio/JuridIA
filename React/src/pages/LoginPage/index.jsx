import { useEffect, useState, useCallback } from 'react';
import { checkAuth, login } from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext.jsx';
import JuridiaLogo from '../../assets/juridia_logo_texto_branco.png';

import {
  InputContainer,
  InputIcon,
  InputField,
  Title,
  EmailIcon,
  PasswordIcon,
} from '../../components/utilities';

const LoginIllustration = () => (
  <aside className='max-w-[600px] px-8' aria-label='Login Illustration'>
    <img src={JuridiaLogo} alt='Logo JuridIA' />
  </aside>
);

const EmailInput = ({ value, onChange }) => (
  <InputContainer className='max-w-[430px]'>
    <InputIcon>
      <EmailIcon />
    </InputIcon>
    <InputField
      id='email'
      type='email'
      name='email'
      placeholder='Digite seu E-mail'
      value={value}
      onChange={onChange}
      required
      aria-required='true'
      autoComplete='email'
    />
  </InputContainer>
);

const PasswordInput = ({ value, onChange }) => (
  <InputContainer className='max-w-[430px]'>
    <InputIcon>
      <PasswordIcon />
    </InputIcon>
    <InputField
      id='password'
      type='password'
      name='password'
      placeholder='Digite sua senha'
      value={value}
      onChange={onChange}
      required
      aria-required='true'
      autoComplete='current-password'
    />
  </InputContainer>
);

const ForgotPasswordLink = () => (
  <a
    href='#'
    className='w-full max-w-[430px] text-right text-[#1F2A44] text-base underline'
  >
    Esqueci a senha
  </a>
);

const RegisterPrompt = () => (
  <div className='text-center text-base max-w-[430px]'>
    <span className='text-[#1f2a44]'>Não tem uma conta? </span>
    <a href='/register' className='text-[#007B9E] no-underline'>
      Cadastre-se
    </a>
  </div>
);

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    async function verifyAuth() {
      try {
        const { valid } = await checkAuth();
        if (valid) {
          navigate('/', { replace: true });
        }
      } catch (err) {
        showNotification(err);
      }
    }
    verifyAuth();
  }, [navigate, showNotification]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      showNotification(
        `${data.username}, você foi logado com sucesso!`,
        'success'
      );
      navigate('/', { replace: true });
    } catch {
      showNotification('Credenciais inválidas!', 'error');
    }
  };

  return (
    <main className='flex w-full min-h-screen font-sans' role='main'>
      <div className='hidden lg:flex lg:w-[47%] bg-[#1F2A44] justify-center items-center'>
        <LoginIllustration />
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-full lg:w-[53%] bg-[#F4F7FB] flex flex-col justify-center items-center p-5 box-border gap-5'
        aria-label='Login form'
        noValidate
      >
        <header className='w-full max-w-[430px] text-left'>
          <Title size={5} bold className='text-[#1F2A44] mb-2.5'>
            Login
          </Title>
          <p className='text-[#A0A0A0] text-base font-light'>
            Acesse sua conta usando e-mail e senha
          </p>
        </header>

        <EmailInput value={credentials.email} onChange={handleChange} />
        <PasswordInput value={credentials.password} onChange={handleChange} />
        <ForgotPasswordLink />

        <button
          type='submit'
          className='w-full max-w-[430px] p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors'
          aria-label='Log in'
        >
          Login
        </button>

        <RegisterPrompt />
      </form>
    </main>
  );
};

export default LoginPage;
