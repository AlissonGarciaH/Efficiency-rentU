'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }

      onChange(value - 1);
    }, [value, onChange]);


    return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
            <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
            <div
             style={{
             fontWeight: 500, // Tailwind's font-medium
             }}
                 >
               {title}
            </div>

             <div
               style={{
                 fontWeight: 300, // Tailwind's font-light
                 color: '#4b5563' // Tailwind's text-gray-600
               }}
             >
               {subtitle}

             </div>

          </div>
           <div
             style={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
               gap: '1rem' // gap-4 = 16px
             }}
           >
             <div
               onClick={onReduce}
               style={{
                 width: '2.5rem',              // w-10
                 height: '2.5rem',             // h-10
                 borderRadius: '9999px',       // rounded-full
                 border: '1px solid #a3a3a3',  // border-neutral-400
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: '#525252',             // text-neutral-600
                 cursor: 'pointer',
                 transition: 'opacity 0.2s ease'
               }}
               onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
               onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
             >
               <AiOutlineMinus/>
             </div>
            <div
              style={{
                fontWeight: 300,            // font-light
                fontSize: '1.25rem',        // text-xl
                color: '#525252'            // text-neutral-600
              }}
            >
              {value}
            </div>
            <div
               onClick={onAdd}
               style={{
                 width: '2.5rem',              // w-10
                 height: '2.5rem',             // h-10
                 borderRadius: '9999px',       // rounded-full
                 border: '1px solid #a3a3a3',  // border-neutral-400
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: '#525252',             // text-neutral-600
                 cursor: 'pointer',
                 transition: 'opacity 0.2s ease'
               }}
               onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
               onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
             >
               <AiOutlinePlus/>
             </div>

           </div>

        </div>
    );
}

export default Counter;