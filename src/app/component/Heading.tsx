'use client';

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
    return (
        <div
          style={{
            textAlign: center ? 'center' : 'start',
          }}
        >
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontWeight: 300,
                color: '#6b7280',
                marginTop: '0.5rem',
              }}
            >
              {subtitle}
            </div>


        </div>
    )
}

export default Heading;