import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    imageGallery = [], // ✅ NEW: receive gallery
    category, // ✅ string[]
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const requiredFields = {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      console.error(`Missing or empty field: ${key}`);
      return new NextResponse(`Missing or invalid field: ${key}`, { status: 400 });
    }
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      imageGallery, // ✅ SAVE IMAGE GALLERY TO DB
      category,
      roomCount,
      bathroomCount,
      guestCount,
      address: location.address,
      lat: location.latlng[0],
      lng: location.latlng[1],
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
