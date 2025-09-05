import React from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export default function InputField({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required = false,
  className = '',
}: InputFieldProps) {
  const [passwordType, setPasswordType] = React.useState('password');
  const [svgIcon, setSvgIcon] = React.useState(<VscEyeClosed />);
  const isPasswordField = ['password', 'passwordConfirm'].includes(id);

  const handleToggle = () => {
    if (passwordType === 'password') {
      setSvgIcon(<VscEye />);
      setPasswordType('text');
    } else {
      setSvgIcon(<VscEyeClosed />);
      setPasswordType('password');
    }
  };

  return (
    <div className="relative space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordField ? passwordType : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={className}
        />
        {isPasswordField && (
          <span
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            onClick={handleToggle}
          >
            {svgIcon}
          </span>
        )}
      </div>
    </div>
  );
}
