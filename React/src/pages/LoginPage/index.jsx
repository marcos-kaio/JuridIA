import {
  EmailIcon,
  PasswordIcon,
  InputField,
  InputIcon,
  InputContainer,
  Button,
} from '../../components/utilities';

// Um componente simples para a ilustração, para manter o código limpo
const LoginIllustration = () => (
  <div className='max-w-2xl'>
    {/* A ilustração (SVG complexo) pode ser inserida aqui ou como um <img> */}
    <p style={{ fontSize: '2rem', color: 'white' }}>Ilustração aqui</p>
  </div>
);

const LoginPage = () => {
  return (
    <div className='w-full min-h-dvh grid grid-cols-1 lg:grid-cols-[45%_55%] max-w-[100vw]'>
      <div className='hidden lg:flex items-center justify-center bg-blue-950 max-w-[900px]'>
        <LoginIllustration />
      </div>

      {/* Coluna da Direita (Formulário) */}
      <div className='flex items-center justify-center w-full h-full'>
        <div className='flex flex-col justify-center items-center p-5 lg:p-10 gap-5 max-w-2xl lg:max-w-lg w-full'>
          <div className='w-full'>
            <h1 className='text-5xl text-blue-950 mb-3 font-bold'>Login</h1>
            <p className='text-gray-500 text-sm font-light'>
              Acesse sua conta usando e-mail e senha
            </p>
          </div>

          <InputContainer>
            <InputIcon>
              <EmailIcon />
            </InputIcon>
            <InputField type='email' placeholder='Digite seu E-mail' />
          </InputContainer>

          <InputContainer>
            <InputIcon>
              <PasswordIcon />
            </InputIcon>
            <InputField type='password' placeholder='Digite sua senha' />
          </InputContainer>

          <a href='#' className='text-blue-950 underline'>
            Esqueci a senha
          </a>

          <Button>Login</Button>

          <div className='text-center'>
            <span className='text-blue-950'>Não tem uma conta? </span>
            <a href='/register' className='text-cyan-600 underline'>
              Cadastre-se
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
