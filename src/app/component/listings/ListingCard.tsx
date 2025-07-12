'use client';

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    

    const addressParts = data.address.split(",");
    const city = addressParts[1]?.trim() || "Unknown City";
    const state = addressParts[2]?.trim() || "Unknown State";


    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
      if (reservation) {
        return reservation.totalPrice;
      }

      return data.price;
    
    }, [reservation, data.price]);   

   const reservationDate = useMemo(() => {
  if (!reservation?.startMonth || !reservation?.endMonth) {
    return null;
  }

  const start = new Date(`${reservation.startMonth}-01`);
  const end = new Date(`${reservation.endMonth}-01`);

  return `${format(start, 'MMM yyyy')} - ${format(end, 'MMM yyyy')}`;
}, [reservation]);


    return (
        <div
          onClick={() => router.push(`/listings/${data.id}`)}
          style={{
            cursor: 'pointer',
            maxWidth: '220px',            // ≈ 14 rem
            width: '100%',
            gridColumn: 'span 1',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem', // gap-2 = 8px
              width: '100%'
            }}
          >
            <div
              style={{
                aspectRatio: '1 / 1',         // aspect-square
                width: '100%',
                maxWidth: '220px', 
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0.75rem'       // rounded-xl = 12px
              }}
            >
              <Image
                fill
                alt= "Listing"
                src= {data.imageSrc}
                style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}                
              />
              <div
                style={{
                  position: 'absolute',
                  top: '0.75rem',     // top-3 = 3 * 0.25rem
                  right: '0.75rem'    // right-3 = 3 * 0.25rem
                }}
              >
                <HeartButton 
                listingId={data.id}
                currentUser={currentUser}
                />
              </div>
            </div>
            <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
              {city}, {state}
            </div>


            <div style={{ fontWeight: 300, color: '#737373' }}>
  {reservationDate || data.category?.join('; ')}
</div>


            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.25rem' // gap-1 = 1 × 0.25rem = 4px
              }}
            >
              <div
                style={{
                  fontWeight: 600 // Tailwind's "font-semibold"
                }}
              >
                $ {price}
             </div>
             {!reservation && (
                <div style={{ fontWeight: 300 }}>month</div>
             )}

            </div>
            {onAction && actionLabel && (
                <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                />
            )}
          </div>
        </div>

    );
}


export default ListingCard;