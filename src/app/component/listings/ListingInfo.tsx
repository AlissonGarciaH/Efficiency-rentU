'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType;
    label: string;
    description: string;
  }[];
  universityName: string;
  lat: number;
  lng: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  universityName,
  lat,
  lng
}) => {
  return (
    <div
      style={{
        gridColumn: 'span 4',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: 300,
            color: '#737373'
          }}
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {/* Render all selected categories */}
      {category.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {category.map((cat) => (
            <ListingCategory
              key={cat.label}
              icon={cat.icon}
              label={cat.label}
              description={cat.description}
            />
          ))}
        </div>
      )}

      <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />

      <div
        style={{
          fontSize: '1.125rem',
          fontWeight: 300,
          color: '#737373'
        }}
      >
        {description}
      </div>

      <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />

      <div
        style={{
          fontSize: '0.875rem',
          fontStyle: 'italic',
          color: '#6b7280'
        }}
      >
        📍 Approximate location <strong>{universityName}</strong>
      </div>

      <Map center={[lat, lng]} />
    </div>
  );
};

export default ListingInfo;
