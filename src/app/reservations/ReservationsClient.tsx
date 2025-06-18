'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import  Heading from "../component/Heading";
import Container from "../component/Container";
import ListingCard from "../component/listings/ListingCard";


interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
      setDeletingId(id);

      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })

      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setDeletingId('');
      })
    }, [router]);

    return (
          <Container>
            <Heading
            title="Reservations"
            subtitle="Bookings on your properties"
            />
            <div className="responsive-grid" style={{ marginTop: '2.5rem' }}>
              {reservations.map((reservation) => (
                <ListingCard
                  key={reservation.id}
                  data={reservation.listing}
                  reservation={reservation}
                  actionId={reservation.id}
                  onAction={onCancel}
                  disabled={deletingId === reservation.id}
                  actionLabel="Cancel guest reservation"
                  currentUser={currentUser}
                />
              ))}
            </div>

          </Container>
    );
}

export default ReservationsClient;