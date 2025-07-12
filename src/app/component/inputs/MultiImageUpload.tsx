'use client';

import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image';

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  value,
  onChange,
}) => {
  const handleUpload = useCallback(
    (result: unknown) => {
      if (
        typeof result === 'object' &&
        result !== null &&
        'info' in result &&
        typeof result.info === 'object' &&
        result.info !== null &&
        'secure_url' in result.info
      ) {
        const secureUrl = (result.info as { secure_url: string }).secure_url;
        onChange([...value, secureUrl]);
      }
    },
    [onChange, value]
  );

  const handleRemove = (url: string) => {
    const updated = value.filter((img) => img !== url);
    onChange(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="efficiency_unsigned"
        options={{
          maxFiles: 10,
          multiple: true,
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open?.()}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Upload Photos
          </button>
        )}
      </CldUploadWidget>

      {value.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
          }}
        >
          {value.map((url, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            >
              <Image
                src={url}
                alt={`Gallery ${idx}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <button
                onClick={() => handleRemove(url)}
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                title="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;
