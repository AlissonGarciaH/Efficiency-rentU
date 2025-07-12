// app/actions/getMessages.ts
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getMessages() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: currentUser.id },
        { receiverId: currentUser.id }
      ]
    },
    include: {
      sender: true,
      receiver: true,
      listing: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return messages;
}
