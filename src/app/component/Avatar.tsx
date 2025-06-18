'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      style={{ borderRadius: '9999px' ,
        display: 'block'
      }}
      height={30}
      width={30}
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
