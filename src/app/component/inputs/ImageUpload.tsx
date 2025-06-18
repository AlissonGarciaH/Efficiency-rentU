'use client';

import { CldUploadWidget } from 'next-cloudinary';
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  interface Window {
    cloudinary: unknown;
  }
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      const info = result?.info;

      if (
        typeof info === 'object' &&
        info !== null &&
        'secure_url' in info &&
        typeof info.secure_url === 'string'
      ) {
        onChange(info.secure_url);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="efficiency_unsigned"
      options={{ maxFiles: 1 }}
    >
      {({ open }: { open?: () => void }) => (
        <div
          onClick={() => open?.()}
          style={{
            position: 'relative',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            border: '2px dashed #d1d5db',
            padding: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            color: '#4b5563',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <TbPhotoPlus size={50} />
          <div
            style={{
              fontWeight: 600,
              fontSize: '1.125rem',
            }}
          >
            Click to upload
          </div>
          {value && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                alt="Upload"
                fill
                style={{ objectFit: 'cover' }}
                src={value}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;

