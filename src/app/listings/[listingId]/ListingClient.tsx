'use client';

import { UNIVERSITIES } from '@/constants/universities';
import Container from '@/app/component/Container';
import ListingInfo from '@/app/component/listings/ListingInfo';
import ListingReservation from '@/app/component/listings/ListingReservation';
import ListingGallery from '@/app/component/listings/GallerySlider';
import { categories } from '@/app/component/Navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import ListingMessagesButton from '@/app/component/listings/ListingMessagesButton';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        listingId: listing.id,
        startMonth,
        endMonth,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setStartMonth('');
        setEndMonth('');
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, listing.id, loginModal, router, startMonth, endMonth]);

  const matchedCategories = useMemo(() => {
    return categories.filter((item) =>
      listing.category?.includes(item.label)
    );
  }, [listing.category]);

  const universityName = useMemo(() => {
    if (!listing.university) return '';
    const uni = UNIVERSITIES.find((u) => u.id === listing.university);
    return uni ? `near ${uni.name}` : '';
  }, [listing.university]);

  return (
    <Container>
      <div style={{ maxWidth: '1024px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            {listing.title}
          </h1>

          <ListingGallery
            mainImage={listing.imageSrc}
            galleryImages={listing.imageGallery}
          />

          <div className="listing-details-grid">
            <ListingInfo
              user={listing.user}
              category={matchedCategories}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              universityName={universityName}
              lat={listing.lat}
              lng={listing.lng}
            />

            <div
              style={{
                order: 1,
                marginBottom: '2.5rem',
                gridColumn: 'span 3 / span 3',
              }}
              className="responsive-order-column"
            >
              <ListingReservation
                price={listing.price}
                startMonth={startMonth}
                endMonth={endMonth}
                setStartMonth={setStartMonth}
                setEndMonth={setEndMonth}
                onSubmit={onCreateReservation}
                disabled={isLoading}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <ListingMessagesButton listingId={listing.id} listingOwnerId={listing.user.id} />
          </div>

          {currentUser?.id !== listing.user.id && (
            <div style={{ marginTop: '1rem' }}>
              <Link href={`/messages/${listing.user.id}?listingId=${listing.id}`}>
                <button
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Message Host
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
