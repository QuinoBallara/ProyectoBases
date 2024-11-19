import { FC } from "react";
import React from "react";
import './styles.scss';

interface InputProps {
  label: string;
  placeholder?: string;
  value: number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

const Input4Number: FC<InputProps> = ({
  label,
  error,
  value = 1,
  placeholder = '',
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
          type="number"
          placeholder={placeholder}
        />
        <div className="input-error">
          {error && <p className="input-help">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Input4Number;
