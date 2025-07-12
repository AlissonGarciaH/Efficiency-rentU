'use client';

import { useRouter } from 'next/navigation';

interface ListingMessagesButtonProps {
  listingId: string;
  listingOwnerId: string; // ✅ add this line
}

const ListingMessagesButton: React.FC<ListingMessagesButtonProps> = ({
  listingId,
  listingOwnerId,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chats/${listingId}?ownerId=${listingOwnerId}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "#42D9B0",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        fontFamily: "inherit",
        transition: "opacity 0.3s ease",
      }}
    >
      View Messages
    </button>
  );
};

export default ListingMessagesButton;
