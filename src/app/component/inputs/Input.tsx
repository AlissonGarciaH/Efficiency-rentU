'use client';

import {
    FieldErrors, 
    FieldValues, 
    UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    isSubmitted?: boolean;
    

}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    register,
    required,
    errors,
    isSubmitted= false

}) => {
    return (
        <div
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          {formatPrice && (

            <BiDollar
            size={24}
             style={{
               color: '#374151',
               position: 'absolute',
               top: '1.25rem',
               left: '0.5rem',
               zIndex: 10,
             }}
            />
          )}
          
          <div style={{ paddingLeft: '0rem', paddingRight: '2.3rem' }}>
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      id={id}
      disabled={disabled}
      {...register(id, { required })}
      placeholder=" "
      type={type}
      style={{
        width: '100%',
        padding: formatPrice 
          ? '1.25rem 1rem 0.75rem 2.5rem' // extra left padding
          : '1.25rem 1rem 0.75rem 1rem',

        fontWeight: 300,
        backgroundColor: 'white',
        border: `2px solid ${ errors[id] && isSubmitted? '#ef4444' : '#d1d5db' }`,
        borderRadius: '0.5rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
      }}
      onFocus={(e) => e.target.parentElement?.classList.add('focused')}
      onBlur={(e) => {
        if (e.target.value === '') {
          e.target.parentElement?.classList.remove('focused');
        }
      }}
      onMouseEnter={(e) => {
  (e.target as HTMLElement).parentElement?.classList.add('focused');
}}

onMouseLeave={(e) => {
  if ((e.target as HTMLInputElement).value === '') {
    (e.target as HTMLElement).parentElement?.classList.remove('focused');
  }
}}

    />
    <label
      htmlFor={id}
      style={{
        position: 'absolute',
        left: formatPrice ? '2.5rem' : '1rem',
        top: '1.1rem',
        fontSize: '1rem',
        color: errors[id] ? '#ef4444' : '#a1a1aa',
        transition: 'all 0.2s ease',
        transformOrigin: 'left top',
      }}
      className="floating-label"
    >
      {label}
    </label>
  </div>
</div>




        </div>

    );
}

export default Input;