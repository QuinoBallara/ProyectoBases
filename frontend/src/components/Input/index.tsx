import { FC } from "react";
import React from "react";
import './styles.scss';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

const Input: FC<InputProps> = ({
  label,
  error,
  value = '',
  placeholder = '',
  type = 'text',
  onChange,
  className,
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className={`input-field ${value ? 'has-content' : ''}`}>
      <label className="input-floating-label">{label}</label>
      <div className="input-control">
        <input
          className={`input-input ${className}`}
          value={value}
          onChange={handleChange}
          name={name}
          type={type}
          placeholder={placeholder}
        />
        <div className="input-error">
          {error && <p className="input-help">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Input;
