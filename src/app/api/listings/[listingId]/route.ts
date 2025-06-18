// src/app/api/listings/[listingId]/route.ts
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// 👇 Correctly typed context object
type Context = {
  params: Promise<{ listingId: string }>;
};

export async function DELETE(
  request: Request,
  context: Context
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  // ✅ Await context.params (required in Next.js 15)
  const { listingId } = await context.params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const deleted = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(deleted);
}


