'use client';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
// ❌ Removed unused import: import { useEffect } from 'react';

interface AddressAutocompleteProps {
  onSelect: (value: { address: string; lat: number; lng: number }) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);

    onSelect({
      address: description,
      lat,
      lng,
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Enter address"
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '0.5rem',
        }}
      />
      {status === 'OK' && (
        <div
          style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ddd',
            width: '100%',
            zIndex: 1000,
            borderRadius: '0.5rem',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {data.map(({ place_id, description }) => (
            <div
              key={place_id}
              onClick={() => handleSelect(description)}
              style={{
                padding: '0.75rem',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              {description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
