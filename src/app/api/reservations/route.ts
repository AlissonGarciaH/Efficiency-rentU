import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startMonth, endMonth } = body;

  if (!listingId || !startMonth || !endMonth) {
    return NextResponse.error();
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startMonth,
            endMonth,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.error("Reservation creation failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
