import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ListingForm from "@/app/component/listings/ListingForm";
import { redirect } from "next/navigation";

type EditPageProps = {
  params: {
    listingId: string;
  };
};

const EditListingPage = async ({ params }: EditPageProps) => {
  const { listingId } = await params;
  const currentUser = await getCurrentUser();
  const listing = await getListingById(listingId);


  if (!listing || listing.userId !== currentUser?.id) {
    return redirect("/");
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <ListingForm
        initialData={listing}
        currentUser={currentUser}
        isEdit
      />
    </div>
  );
};

export default EditListingPage;

