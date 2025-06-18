// src/app/page.tsx
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./component/ClientOnly";
import Container from "./component/Container";
import EmptyState from "./component/EmptyState";
import ListingCard from "./component/listings/ListingCard";
import type { SafeListing, SafeUser } from "@/app/types";

/**
 * The App Router now passes `searchParams` **as a Promise**.
 * We must declare that and await it before reading.
 */
type HomeContext = {
  /** query-string filters (promise) */
  searchParams: Promise<IListingsParams>;
};

export default async function Home({ searchParams }: HomeContext) {
  /* ---------- await query params ---------- */
  const filters = await searchParams;

  const listings: SafeListing[] = await getListings(filters);
  const currentUser: SafeUser | null = await getCurrentUser();

  /* ---------- empty state ---------- */
  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  /* ---------- page ---------- */
  return (
    <ClientOnly>
      <Container>
        <div 
          style={{
            paddingTop: '5rem',             // pt-24 (24 × 0.25rem)
            paddingLeft: '0rem',         // ❌ remove horizontal padding
            paddingRight: '0rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220x, 1fr))',
            gap: '1rem',                     // gap-8 (8 × 0.25rem)
            justifyContent: 'center'
          }}
          className="responsive-grid"
        >
          {listings.map((listing) => {
            return (
              <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              />
            )
          })}

          
          
        </div>

      </Container>
    </ClientOnly>
  );
}
