'use client';


import { useCallback, useState } from "react";
import Container from "../component/Container";
import Heading from "../component/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import ListingCard from "../component/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}




const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
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
            title="Trips"
            subtitle="Where you've been and where you're going"
            />
            <div className="my-responsive-grid" style={{ marginTop: '2rem' }}>
              {reservations.map((reservation) => (
                <ListingCard
                   key={reservation.id}
                   data={reservation.listing}
                   reservation={reservation}
                   actionId={reservation.id}
                   onAction={onCancel}
                   disabled={deletingId ===reservation.id}
                   actionLabel="Cancel reservation"
                   currentUser={currentUser}
                />
              ))}
            </div>


        </Container>
    );
}

export default TripsClient;