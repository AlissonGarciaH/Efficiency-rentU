import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// REMOVE ALL TYPE IMPORTS like RouteContext
// Just define inline param type
export async function DELETE(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

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

export async function PUT(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;
  const body = await request.json();

  const {
    description,
    guestCount,
    roomCount,
    bathroomCount,
    universityName,
    lat,
    lng,
    imageGallery = [],
  } = body;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const existingListing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!existingListing || existingListing.userId !== currentUser.id) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: {
      description,
      guestCount,
      roomCount,
      bathroomCount,
      university: universityName,
      lat,
      lng,
      imageGallery,
    },
  });

  return NextResponse.json(updatedListing);
}
