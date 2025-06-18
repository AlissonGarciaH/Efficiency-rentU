'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
            />
            <div
              style={{
                width: '100%',
                height: '60vh',
                overflow: 'hidden',
                borderRadius: '0.75rem',  // Tailwind's rounded-xl = 12px = 0.75rem
                position: 'relative'
              }}
            >

           <Image
              alt="Image"
              src={imageSrc}
              fill
              style={{
                  objectFit: 'cover',
                  width: '100%'
                }}
           />
             <div
               style={{
                 position: 'absolute',
                 top: '1.25rem',    // top-5 = 5 × 0.25rem
                 right: '1.25rem'   // right-5 = 5 × 0.25rem
               }}
             >
            
            <HeartButton
               listingId={id}
               currentUser={currentUser}
            />


             </div>

            </div>
        </>
    );
}

export default ListingHead;