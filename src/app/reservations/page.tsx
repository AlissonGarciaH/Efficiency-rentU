import EmptyState from "../component/EmptyState";
import ClientOnly from "../component/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";



const ReservationPage = async () => {
    const currentUser = await getCurrentUser();


    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                title="Unauthorized"
                subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });


    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default ReservationPage