import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin, register } from '../../services/authService.js';
import { useNotification } from '../../context/NotificationContext.jsx';

import {
  InputField,
  InputContainer,
  InputIcon,
  SelectField,
} from '../../components/utilities';

import {
  EmailIcon,
  UserIcon,
  CalendarIcon,
  BookIcon,
  PasswordIcon,
} from '../../components/utilities';

const INITIAL_USER_INFO = {
  email: '',
  username: '',
  birthday: '',
  escolaridade: '',
  password: '',
};

const formatBirthdayInput = (value) => {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length <= 2) {
    return onlyNums;
  } else if (onlyNums.length <= 4) {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`;
  } else {
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(
      4,
      8
    )}`;
  }
};

const isValidBirthday = (birthday) => {
  const parts = birthday.split('/');
  if (parts.length !== 3) return false;
  const [day, month, year] = parts;
  return day.length === 2 && month.length === 2 && year.length === 4;
};

const convertBirthdayToISO = (birthday) => {
  const [day, month, year] = birthday.split('/');
  return `${year}-${month}-${day}`;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'birthday') {
      setUserInfo((prev) => ({
        ...prev,
        birthday: formatBirthdayInput(value),
      }));
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.password !== confirmPassword) {
      showNotification('As senhas não coincidem!', 'error');
      return;
    }

    const submissionData = { ...userInfo };

    if (submissionData.birthday) {
      if (!isValidBirthday(submissionData.birthday)) {
        showNotification('Formato de data inválido. Use DD/MM/AAAA.', 'error');
        return;
      }
      submissionData.birthday = convertBirthdayToISO(submissionData.birthday);
    }

    try {
      const data = await register(submissionData);
      showNotification(
        `Registro bem-sucedido. Seja bem vindo(a), ${data.username}!`,
        'success'
      );

      await apiLogin({
        email: userInfo.email,
        password: userInfo.password,
      });

      navigate('/', { replace: true });
    } catch (err) {
      console.error('Erro ao registrar: ', err);
      showNotification('Erro! Tente novamente.', 'error');
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#1F2A44] flex justify-center items-center p-5 box-border'>
      <div className='w-full max-w-5xl bg-[#F4F7FB] rounded-lg p-10 md:p-12 box-border flex flex-col items-center gap-6'>
        <header className='text-center'>
          <h1 className='text-[#1F2A44] text-4xl md:text-5xl font-bold font-montserrat'>
            Cadastre-se
          </h1>
          <p className='text-[#A0A0A0] text-base font-light mt-2.5'>
            Preencha suas informações abaixo para criar uma conta
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'
        >
          <div className='flex flex-col gap-5'>
            <InputContainer>
              <InputIcon>
                <EmailIcon />
              </InputIcon>
              <InputField
                type='email'
                name='email'
                value={userInfo.email}
                onChange={handleChange}
                placeholder='Digite seu E-mail'
                required
              />
            </InputContainer>

            <InputContainer>
              <InputIcon>
                <UserIcon />
              </InputIcon>
              <InputField
                type='text'
                name='username'
                value={userInfo.username}
                onChange={handleChange}
                placeholder='Digite seu nome'
                required
              />
            </InputContainer>

            <InputContainer>
              <InputIcon>
                <CalendarIcon />
              </InputIcon>
              <InputField
                type='text'
                name='birthday'
                value={userInfo.birthday}
                onChange={handleChange}
                placeholder='Data de nascimento'
                maxLength={10}
                required
              />
            </InputContainer>
          </div>

          <div className='flex flex-col gap-5'>
            <InputContainer>
              <InputIcon>
                <BookIcon />
              </InputIcon>
              <SelectField
                name='escolaridade'
                value={userInfo.escolaridade}
                onChange={handleChange}
                required
                defaultValue=''
              >
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
              <InputField
                type='password'
                name='password'
                value={userInfo.password}
                onChange={handleChange}
                placeholder='Digite sua senha'
                required
              />
            </InputContainer>

            <InputContainer>
              <InputIcon>
                <PasswordIcon />
              </InputIcon>
              <InputField
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirme sua senha'
                required
              />
            </InputContainer>
          </div>

          <div className='md:col-span-2 flex flex-col items-center gap-4 mt-2'>
            <button
              type='submit'
              className='w-full max-w-[280px] py-4 px-8 bg-[#0DACAC] text-white text-2xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors'
            >
              Cadastrar
            </button>
            <div className='text-base font-normal'>
              <span className='text-[#1f2a44]'>Já tem uma conta? </span>
              <Link
                to='/login'
                className='text-[#007B9E] no-underline cursor-pointer'
              >
                Entre aqui
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
