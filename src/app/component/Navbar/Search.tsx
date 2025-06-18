'use client';

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
     if (locationValue) {
      return getByValue(locationValue as string)?.label;
     }

     return 'University';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
       const start = new Date(startDate as string);
       const end = new Date(endDate as string);
       let diff = differenceInDays(end, start);

       if (diff === 0) {
        diff = 1
       }

       return `${diff} Days`;
    }

    return 'Period'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Students';
  }, [guestCount])

  return (
    <div
       onClick={searchModal.onOpen}
       style={{
        border: '1px solid #e5e7eb',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        paddingLeft: '0.5rem',
        paddingRight: '0rem',
        borderRadius: '9999px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        >
          {locationLabel}
        </div>
           <div
              style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              borderLeft: '1px solid #e5e7eb',
              borderRight: '1px solid #e5e7eb',
              flex: 1,
              textAlign: 'center',
             }}
            >
                {durationLabel}
           </div>
            <div
               style={{
                fontSize: '0.875rem',
               paddingLeft: '1.5rem',
               paddingRight: '0.5rem',
               color: '#4b5563', // Tailwind's text-gray-600
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
               gap: '0.75rem',
              }}
            >


            <div>{guestLabel}</div>
                <div
                   style={{
                     padding: '0.5rem',
                     backgroundColor: '#00f5a3', // your Efficiency color
                     borderRadius: '9999px',
                     color: 'white',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                    }}
                >
                  <BiSearch size={18}  />
                </div>



        </div>
      </div>
    </div>
  );
};

export default Search;


