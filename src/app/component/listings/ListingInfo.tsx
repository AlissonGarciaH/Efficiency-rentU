'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";


const Map = dynamic(() => import('../Map'), {
    ssr: false
});


interface ListingInfoProps {
    user: SafeUser
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}


const ListingInfo: React.FC<ListingInfoProps>= ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
     <div
      style={{
        gridColumn: 'span 4',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem' // gap-8 = 8 × 0.25rem = 2rem
      }}
    >

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem' // gap-2 = 0.5rem
          }}
        >

            <div
              style={{
                fontSize: '1.25rem',     // text-xl = 20px
                fontWeight: 600,         // font-semibold
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.5rem'            // gap-2 = 0.5rem
              }}
            >
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
                
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1rem',            // gap-4 = 1rem (4 * 0.25rem)
                fontWeight: 300,        // font-light
                color: '#737373'        // text-neutral-500
              }}
            >
                <div>
                {guestCount} guests
                </div>
                <div>
                {roomCount} rooms
                </div>
                <div>
                {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />

        {category && (
            <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
            
            />

            )}

            <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />
            <div
              style={{
                fontSize: '1.125rem',     // text-lg = 18px
                fontWeight: 300,          // font-light
                color: '#737373'          // text-neutral-500
              }}
            >
              {description}
            </div>
            <hr style={{ borderColor: '#e5e7eb', borderTopWidth: '1px' }} />
            <Map center={coordinates} />

     </div>
    );
}

export default ListingInfo;