import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");
  const listingId = searchParams.get("listingId");
  const userId = searchParams.get("userId");

  // ✅ Fix: sort user1 and user2 alphabetically so order doesn't matter
  if (user1 && user2 && listingId) {
    const [sortedUser1, sortedUser2] = [user1, user2].sort();

    const messages = await prisma.message.findMany({
      where: {
        listingId,
        OR: [
          { senderId: sortedUser1, receiverId: sortedUser2 },
          { senderId: sortedUser2, receiverId: sortedUser1 },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  }

  // Get all messages involving a user
  if (userId) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(messages);
  }

  return NextResponse.json(
    { error: "Missing query parameters" },
    { status: 400 }
  );
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { content, receiverId, listingId } = body;

  if (!content || !receiverId || !listingId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      content,
      senderId: currentUser.id,
      receiverId,
      listingId,
    },
  });

  return NextResponse.json(message);
}
