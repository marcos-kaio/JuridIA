export const EmailIcon = () => {
  return (
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
  );
};

export const UserIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const CalendarIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='3'
        y='4'
        width='18'
        height='18'
        rx='2'
        ry='2'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line
        x1='16'
        y1='2'
        x2='16'
        y2='6'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line
        x1='8'
        y1='2'
        x2='8'
        y2='6'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line
        x1='3'
        y1='10'
        x2='21'
        y2='10'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const PasswordIcon = () => {
  return (
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
  );
};

export const BookIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 3H7C8.10457 3 9 3.89543 9 5V21C9 19.8954 8.10457 19 7 19H2V3Z'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22 3H17C15.8954 3 15 3.89543 15 5V21C15 19.8954 15.8954 19 17 19H22V3Z'
        stroke='#AFAFAF'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const InputColumn = ({ children }) => {
  return <div className='flex flex-col gap-5'>{children}</div>;
};

export const InputIcon = ({ children }) => {
  return <div className='absolute left-4 pointer-events-none'>{children}</div>;
};

export const InputContainer = ({ children }) => {
  return (
    <div className='relative flex items-center bg-gray-50 rounded-sm w-full'>
      {children}
    </div>
  );
};

export const InputField = (props) => {
  return (
    <input
      className='w-full p-6 pl-13 border-none rounded-md bg-gray-200 text-lg text-stone-900 placeholder:text-gray-400 outline-0 focus:outline outline-cyan-500'
      {...props}
    />
  );
};

export const SelectField = ({ children, ...rest }) => {
  return (
    <select
      className='appearance-none invalid:text-gray-400 w-full p-6 pl-13 border-none rounded-md bg-gray-200 text-lg text-stone-900 placeholder:text-gray-400 outline-0 focus:outline outline-cyan-500'
      {...rest}
    >
      {children}
    </select>
  );
};

export const Button = ({
  variant = 'primary',
  className,
  children,
  ...rest
}) => {
  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-600 text-white border-none',
    secondary: 'border-2 border-blue-950 bg-white hover:bg-gray-100',
  };
  const validVariants = Object.keys(variants);

  if (!validVariants.includes(variant)) {
    let variant_list = '';
    let n = validVariants.length;
    for (let i = 0; i < n; i++)
      variant_list += `${validVariants[i]}` + (i == n - 1 ? '' : ', ');
    throw Error(`Invalid Variant: ${variant}. pick from: "${variant_list}"`);
  }

  return (
    <button
      className={`w-full py-3  px-4
        ${variants[variant]}
        transition-colors rounded-md
         cursor-pointer box-border
         text-xl font-medium ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Title = ({
  children,
  className,
  size = 5,
  bold = false,
  ...rest
}) => {
  const clamped = Math.max(1, Math.min(size, 9));
  const actualSize = clamped == 1 ? '' : `${clamped}`;
  return (
    <h1
      className={`font-${
        bold ? `bold` : `medium`
      } text-${actualSize}xl text-blue-950 ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
};
