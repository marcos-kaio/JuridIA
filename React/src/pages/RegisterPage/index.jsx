import { Link } from 'react-router-dom';

import {
  BookIcon,
  CalendarIcon,
  EmailIcon,
  InputColumn,
  InputContainer,
  InputIcon,
  PasswordIcon,
  UserIcon,
  InputField,
  SelectField,
  Button,
} from '../../components/utilities';

const RegisterPage = () => {
  return (
    <div className='w-full min-h-dvh flex items-start justify-center p-0 sm:p-6 sm:items-center bg-cyan-900'>
      <div className='w-full max-w-5xl bg-gray-50 min-h-dvh sm:min-h-auto sm:rounded-xl px-5 py-6 sm:px-10 sm:py-12 flex flex-col gap-4'>
        <div className='text-left'>
          <h1 className='text-blue-950 text-3xl sm:text-5xl font-bold m-0'>
            Sign up
          </h1>
          <p className='text-gray-400 text-sm font-light my-2'>
            Preencha suas informações abaixo para criar uma conta
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {/* Coluna da Esquerda */}
          <InputColumn>
            <InputContainer>
              <InputIcon>
                <EmailIcon />
              </InputIcon>
              <InputField type='email' placeholder='Digite seu E-mail' />
            </InputContainer>
            <InputContainer>
              <InputIcon>
                <UserIcon />
              </InputIcon>
              <InputField type='text' placeholder='Digite seu nome' />
            </InputContainer>
            <InputContainer>
              <InputIcon>
                <CalendarIcon />
              </InputIcon>
              <InputField
                type='text'
                placeholder='Data de nascimento'
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
            </InputContainer>
          </InputColumn>

          {/* Coluna da Direita */}
          <InputColumn>
            <InputContainer>
              <InputIcon>
                <BookIcon />
              </InputIcon>
              <SelectField defaultValue=''>
                <option value='' disabled>
                  Escolaridade
                </option>
                <option value='fundamental'>Ensino Fundamental</option>
                <option value='medio'>Ensino Médio</option>
                <option value='superior'>Ensino Superior</option>
              </SelectField>
            </InputContainer>
            <InputContainer>
              <InputIcon>
                <PasswordIcon />
              </InputIcon>
              <InputField type='password' placeholder='Digite sua senha' />
            </InputContainer>
            <InputContainer>
              <InputIcon>
                <PasswordIcon />
              </InputIcon>
              <InputField type='password' placeholder='Confirme sua senha' />
            </InputContainer>
          </InputColumn>
        </div>

        <div className='flex flex-col items-center gap-4 mt-3'>
          <Button className='max-w-80'>Registrar</Button>
          <div className='text-base'>
            <span className='text-blue-950'>Já tem uma conta? </span>
            <Link to='../Login' className='cursor-pointer text-cyan-600'>
              Entre aqui
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
