'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
      listingId,
      currentUser
    })

    return (
        <div
        onClick={toggleFavorite}
          style={{
              position: 'relative',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
        >
            <AiOutlineHeart
             size={28}
               style={{
                 fill: 'white',
                 position: 'absolute',
                 top: '-2px',
                 right: '-2px'
               }}
            />

            <AiFillHeart
              size={24}
              style={{
                fill: hasFavorited ? '#00ffa3' : 'rgba(115, 115, 115, 0.7)'  // rose-500 : neutral-500/70
              }}
            />


        </div>
    );
}

export default HeartButton;