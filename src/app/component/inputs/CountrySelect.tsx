'use client';

import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;

}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries();

return (
    <div>
        <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (

            <div
              style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '0.75rem', // gap-3 = 12px
                }}
            >
             <div>{option.flag}</div>
             <div>
                {option.label}, 
                <span
                  style={{
                    color: '#737373',  // Tailwind's neutral-500
                    marginLeft: '0.25rem' // ml-1 = 4px
                  }}
                >
                  {option.region}
                </span>

             </div>
            </div>
        )}
        menuPortalTarget={document.body}
        menuPosition="fixed"
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            control: (base) => ({
              ...base,
              padding: '0.75rem', // p-3
              borderWidth: '2px',
            }),
            input: (base) => ({
              ...base,
              fontSize: '1.125rem', // text-lg
            }),
            option: (base) => ({
              ...base,
              fontSize: '1.125rem', // text-lg
            }),
          }}
        
        theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
                ...theme.colors,
                primary: 'black',
                primary25: '#ffe4e6'
            }
        })}
        />
    </div>
);

}

export default CountrySelect;