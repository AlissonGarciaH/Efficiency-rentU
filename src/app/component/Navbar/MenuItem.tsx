'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      style={{
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontWeight: 600,
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {label}
    </div>
  );
};

export default MenuItem;
