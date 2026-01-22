import React from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  validationError?: string | null;
  accept?: string;
  multiple?: boolean;
  style?: React.CSSProperties;
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
  accept,
  multiple,
  style,
  validationError,
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
          value={type === 'file' ? undefined : value}
          onChange={onChange}
          required={required}
          className={`
            ${className}
            ${validationError ? 'border-red-500 bg-red-50/50' : 'border-gray-300'}  // ✅ Bordure rouge si erreur
            focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200
            w-full rounded-md px-3 py-2 shadow-sm
          `}
          accept={accept}
          multiple={multiple}
          style={style}
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
      <div className="h-5">
        {/* ✅ MESSAGE D'ERREUR ICI - s'affiche seulement si validationError existe */}
          {validationError && (
            <p className="mt-1 text-xs text-red-500 font-medium absolute left-0">
              {validationError}  {/* "Le mot de passe doit contenir..." */}
            </p>
          )}
         {/* ✅ MESSAGE D'ERREUR ICI - s'affiche seulement si validationError existe */}
        {validationError && (
          <p className="mt-1 text-xs text-red-500 font-medium absolute left-0">
            {validationError}  {/* "L'email n'est pas valide" */}
          </p>
        )}
      </div>
    </div>
  );
}
