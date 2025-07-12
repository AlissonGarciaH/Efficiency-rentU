'use client';

import { UNIVERSITIES } from "@/constants/universities";
import Select from "react-select";

export type UniversitySelectValue = {
  id: string;
  label: string;
  value: string;
  lat: number;
  lng: number;
};

interface UniversitySelectProps {
  value?: UniversitySelectValue;
  onChange: (value: UniversitySelectValue) => void;
}

const UniversitySelect: React.FC<UniversitySelectProps> = ({
  value,
  onChange
}) => {
  const options: UniversitySelectValue[] = UNIVERSITIES.map((uni) => ({
    id: uni.id,
    label: uni.name,
    value: uni.id,
    lat: uni.lat,
    lng: uni.lng,
  }));

  return (
    <Select
      placeholder="Select your university"
      isClearable
      options={options}
      value={value}
      onChange={(val) => onChange(val as UniversitySelectValue)}
      formatOptionLabel={(option: UniversitySelectValue) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span>{option.label}</span>
        </div>
      )}
      menuPortalTarget={document.body}
      menuPosition="fixed"
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (base) => ({ ...base, padding: '0.75rem', borderWidth: '2px' }),
        input: (base) => ({ ...base, fontSize: '1.125rem' }),
        option: (base) => ({ ...base, fontSize: '1.125rem' }),
      }}
    />
  );
};

export default UniversitySelect;
