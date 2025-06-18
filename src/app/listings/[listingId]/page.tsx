// src/app/listings/[listingId]/page.tsx
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/component/ClientOnly";
import EmptyState from "@/app/component/EmptyState";
import ListingClient from "./ListingClient";
import type { SafeUser } from "@/app/types";

type PageContext = {
  // 👇 params arrives as a Promise in App Router
  params: Promise<{ listingId: string }>;
};

const ListingPage = async ({ params }: PageContext) => {
  /* --- MUST await params before you use it --- */
  const { listingId } = await params;

  if (!listingId) {
    return (
      <ClientOnly>
        <EmptyState subtitle="Missing listing ID" />
      </ClientOnly>
    );
  }

  const listing        = await getListingById({ listingId });
  const reservations   = await getReservations({ listingId });
  const currentUser: SafeUser | null = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState subtitle="Listing not found" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
