'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}


const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
   return (
   <div  onClick={() => onClick(label)}
     style={{
       borderRadius: '0.75rem', // rounded-xl
       borderWidth: '2px',
       padding: '1rem',
       display: 'flex',
       flexDirection: 'column',
       gap: '0.75rem', // gap-3
       cursor: 'pointer',
       transition: 'all 0.2s ease',
       borderColor: selected ? 'black' : '#e5e7eb', // border-black or border-neutral-200
       borderStyle: 'solid',
     }}
     onMouseEnter={(e) => {
       e.currentTarget.style.borderColor = 'black';
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.borderColor = selected ? 'black' : '#e5e7eb';
     }}
   >

  <Icon  size={30}/>
   <div style={{ fontWeight: 600 }}>
     {label}
   </div>


   </div>

   );

}

export default CategoryInput;