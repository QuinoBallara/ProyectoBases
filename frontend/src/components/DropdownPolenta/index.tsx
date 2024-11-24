import React, { FC } from "react";
import './styles.scss';

interface DropdownProps {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    name: string;
}

const Dropdown: FC<DropdownProps> = ({
    label,
    options,
    value = '',
    error,
    onChange,
    className,
    name,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
    };

    return (
        <div className={`field ${value ? 'has-content' : ''}`}>
            <label className="floating-label">{label}</label>
            <div className="control">
                <select
                    className={`input ${className}`}
                    value={value}
                    onChange={handleChange}
                    name={name}
                >

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="error">
                    {error && <p className="help">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;