// src/app/api/reservations/[reservationId]/route.ts
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Next 15: `context.params` is a Promise
type Context = {
  params: Promise<{ reservationId: string }>;
};

export async function DELETE(
  _request: Request,
  context: Context
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  // ✓ Await the params object
  const { reservationId } = await context.params;
  if (!reservationId) throw new Error("Invalid ID");

  const deleted = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(deleted);
}
