'use client';
import { IconType } from "react-icons";

interface ButtonProps {
label: string;
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
disabled?: boolean;
outline?: boolean;
small?: boolean;
icon?: IconType;
variant?: 'primary' | 'secondary' | 'danger' | 'text';
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    outline = false,
    small = false,
    icon:Icon,
    variant = 'primary',

}) => {
        
    // Default colors based on variant
    let backgroundColor = '#00c88b';
    let borderColor = '#00c88b';
    let textColor = 'white';

    if (variant === 'secondary') {
      backgroundColor = '#f5f5f5';
      borderColor = '#d1d5db';
      textColor = 'black';
    } else if (variant === 'danger') {
      backgroundColor = '#ef4444';
      borderColor = '#ef4444';
      textColor = 'white';
    } else if (variant === 'text') {
      backgroundColor = 'transparent';
      borderColor = 'transparent';
      textColor = 'black';
    }



   return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        position: 'relative',
        borderRadius: '0.5rem',
        width: '100%',
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: outline ? 'white' : backgroundColor,
        border: `${small ? '1px' : '2px'} solid ${outline ? 'black' : borderColor}`,
        color: outline ? 'black' : textColor,
        padding: `${small ? '0.25rem' : '0.75rem'} 1.5rem`,
        fontSize: small ? '0.875rem' : '1rem',
        fontWeight: small ? 300 : 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.opacity = '1';
      }}
    >
      {Icon && (
        <Icon
          size={24}
          style={{
            position: 'absolute',
            left: '16px',
            top: '12px'
          }}
        />
      )}

      {label}
    </button>


   );

}

export default Button;