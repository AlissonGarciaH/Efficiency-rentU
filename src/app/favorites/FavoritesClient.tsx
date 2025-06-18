import Container from "../component/Container";
import Heading from "../component/Heading";
import ListingCard from "../component/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <Container>
            <Heading
              title="Favorites"
              subtitle="List of Efficiencies you have favorited!"
            />
            <div className="responsive-grid" style={{ marginTop: '2.5rem' }}>

                {listings.map((listing) => (
                    <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                    />
                ))}
            </div>

        </Container>
    );
}

export default FavoritesClient;