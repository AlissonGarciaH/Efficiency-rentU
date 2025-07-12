'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  loggedOut?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, loggedOut = false }) => {
  const getInitials = (fullName: string | null | undefined) => {
    if (!fullName) return 'U';
    const parts = fullName.split(' ');
    return parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
  };

  // Show placeholder image for logged-out users
  if (loggedOut) {
    return (
      <Image
        height={40}
        width={40}
        alt="Avatar"
        src="/Images/placeholder.jpg"
        style={{
          borderRadius: '9999px',
          display: 'block',
          objectFit: 'cover'
        }}
      />
    );
  }

  // Logged-in user with image
  if (src) {
    return (
      <Image
        height={40}
        width={40}
        alt="Avatar"
        src={src}
        style={{
          borderRadius: '9999px',
          display: 'block',
          objectFit: 'cover'
        }}
      />
    );
  }

  // Logged-in user without image (email sign-in)
  return (
    <div
      style={{
        height: '40px',
        width: '40px',
        borderRadius: '9999px',
        backgroundColor: '#60a5fa',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textTransform: 'uppercase'
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
