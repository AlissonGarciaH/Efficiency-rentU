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
          className="responsive-grid"
          style={{
            paddingTop: "5rem",
            paddingLeft: 0,
            paddingRight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
