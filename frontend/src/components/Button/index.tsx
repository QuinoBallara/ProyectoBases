import { FC } from "react";
import React from "react";
import './styles.scss';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
    label,
    onClick,
    className = '',
    type = "button",
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick(e);
    };

    return (
        <div className="button-field">
            <button
                className={`button ${className}`}
                onClick={handleClick}
                type={type}
            >
                {label}
            </button>
        </div>
    );
};

export default Button;
