'use client';

import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon: Icon,
    label,
    description
}) => {
    return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem' // gap-6 = 6 × 0.25rem = 1.5rem
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1rem' // gap-4 = 4 × 0.25rem = 1rem
            }}
          >
            <Icon 
            size={40}
              style={{
                color: '#525252' // Tailwind's text-neutral-600
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  fontSize: '1.125rem', // text-lg = 18px
                  fontWeight: 600       // font-semibold
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: '#737373',     // text-neutral-500
                  fontWeight: 300       // font-light
                }}
              >
                {description}
              </div>
            </div>

          </div>
        </div>

    );
}

export default ListingCategory;