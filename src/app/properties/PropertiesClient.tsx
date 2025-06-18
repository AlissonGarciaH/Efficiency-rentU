'use client';


import { useCallback, useState } from "react";
import Container from "../component/Container";
import Heading from "../component/Heading";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import axios from "axios";
import ListingCard from "../component/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}




const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listing deleted');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        });
    }, [router]);

    return (
        <Container>
            <Heading
            title="Properties"
            subtitle="List of your properties"
            />
            <div className="my-responsive-grid" style={{ marginTop: '2rem' }}>
              {listings.map((listing) => (
                <ListingCard
                   key={listing.id}
                   data={listing}
                   actionId={listing.id}
                   onAction={onCancel}
                   disabled={deletingId === listing.id}
                   actionLabel="Delete property"
                   currentUser={currentUser}
                />
              ))}
            </div>


        </Container>
    );
}

export default PropertiesClient;