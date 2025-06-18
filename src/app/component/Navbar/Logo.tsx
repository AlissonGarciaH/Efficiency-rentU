'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Logo = () => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
     <div
        style={{
        borderRadius: '9999px',
        transition: 'box-shadow 0.3s ease',
        boxShadow: hover ? '0 4px 6px rgba(0, 0, 0, 0.15)' : 'none',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push('/')}
    >

    <Image
      alt="Logo"
      src="/Images/logo.png"
      width={136}
      height={40}
      style={{
        cursor: 'pointer',
        display: 'block', // this replaces 'hidden md:block'
        objectFit: 'contain',
        borderRadius: '9999px',
      }}
      onClick={() => router.push('/')}
    />
    </div>
  );
};

export default Logo;
