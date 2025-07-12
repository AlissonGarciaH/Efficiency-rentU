// app/actions/sendMessage.ts
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function sendMessage({
  content,
  listingId
}: {
  content: string;
  listingId: string;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("Not logged in");

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) throw new Error("Listing not found");

  const hostId = listing.userId;

  const message = await prisma.message.create({
    data: {
      content,
      listingId,
      senderId: currentUser.id,
      receiverId: hostId,
    },
  });

  return message;
}
