'use client';

interface ContainerProps {
  children: React.ReactNode; 
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      style={{
        maxWidth: '100%',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
