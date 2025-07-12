import { Listing, Reservation } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
  university?: string | null;
  imageGallery?: string[];
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startMonth" | "endMonth" | "listing"
> & {
  id: string;
  userId: string;
  listingId: string;
  startMonth: string;
  endMonth: string;
  totalPrice: number | null;
  createdAt: string;
  listing: SafeListing;
};

// types/index.ts (or wherever SafeUser is)
export type SafeUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: string | null; // 👈 add this line
  image: string | null;
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
};
