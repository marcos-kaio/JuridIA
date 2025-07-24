export const TrashIcon = (props) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M3 6h18' />
    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
    <line x1='10' y1='11' x2='10' y2='17' />
    <line x1='14' y1='11' x2='14' y2='17' />
  </svg>
);

export const ChatBotIcon = (props) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 62 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x='0.850586'
        width='60.5682'
        height='60.5682'
        fill='url(#pattern_bot)'
      />
      <defs>
        <pattern
          id='pattern_bot'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use href='#image_bot' transform='scale(0.015625)' />
        </pattern>
        <image
          id='image_bot'
          width='64'
          height='64'
          href='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export const SendIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M22 2L11 13'
        stroke='#1E1E1E'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22 2L15 22L11 13L2 9L22 2Z'
        stroke='#1E1E1E'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const ExitIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M16 17L21 12M21 12L16 7M21 12H9M9 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2H9'
        stroke='#0DACAC'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const FilePlusIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 2V8H20'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 18V12'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 15H15'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const EmailIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
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

export const UserIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
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

export const CalendarIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
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

export const PasswordIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
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

export const BookIcon = ({ ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
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

export const InputContainer = ({ children, className, ...rest }) => {
  return (
    <div
      className={`relative flex items-center bg-gray-50 rounded-sm w-full ${className}`}
      {...rest}
    >
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
    tertiary:
      'border-2 border-cyan-500 bg-white hover:bg-gray-100 text-cyan-600',
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
  const sizeClasses = {
    1: 'text-xl',
    2: 'text-2xl',
    3: 'text-3xl',
    4: 'text-4xl',
    5: 'text-5xl',
    6: 'text-6xl',
    7: 'text-7xl',
    8: 'text-8xl',
    9: 'text-9xl',
  };

  const clampedSize = Math.max(1, Math.min(Number(size), 9));

  return (
    <h1
      className={`font-${bold ? 'bold' : 'medium'} ${
        sizeClasses[clampedSize]
      } text-blue-950 ${className ?? ''}`}
      {...rest}
    >
      {children}
    </h1>
  );
};
