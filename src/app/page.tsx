
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./component/ClientOnly";
import Container from "./component/Container";
import EmptyState from "./component/EmptyState";
import ListingCard from "./component/listings/ListingCard";
import { SafeListing, SafeUser } from "@/app/types";

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ( { searchParams }: HomeProps) => {
  const { userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category
   } = await Promise.resolve(searchParams);
  const listings: SafeListing[] = await getListings({ userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category
   });
  const currentUser: SafeUser | null = await getCurrentUser();

  
  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  

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
    
  )
}

export default Home;