'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { UNIVERSITIES } from "@/constants/universities";

interface ListingHeadProps {
  title: string;
  university?: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  university,
  imageSrc,
  id,
  currentUser
}) => {
  const universityLabel = UNIVERSITIES.find(u => u.id === university)?.name ?? '';
  return (
    <>
      <Heading
        title={title}
        subtitle={universityLabel ? `Near ${universityLabel}` : ''}
      />

      <div
        style={{
          width: '100%',
          height: '60vh',
          overflow: 'hidden',
          borderRadius: '0.75rem',
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
            top: '1.25rem',
            right: '1.25rem'
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
};

export default ListingHead;
