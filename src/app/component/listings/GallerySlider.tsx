'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ListingGalleryProps {
  mainImage: string;
  galleryImages: string[];
}

const ListingGallery: React.FC<ListingGalleryProps> = ({
  mainImage,
  galleryImages,
}) => {
  const images = [mainImage, ...galleryImages];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '0.5rem', overflow: 'hidden' }}>
      <div
        style={{
          width: '100%',
          height: '600px',
          position: 'relative',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          style={{
            borderRadius: '0.5rem',
          }}
        />

        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.4)',
            border: 'none',
            color: 'white',
            padding: '8px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.4)',
            border: 'none',
            color: 'white',
            padding: '8px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          <FaChevronRight />
        </button>
      </div>

      {images.length > 1 && (
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              style={{
                borderRadius: '0.5rem',
                border: index === currentIndex ? '2px solid #42D9B0' : '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingGallery;
