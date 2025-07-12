import prisma from "@/app/libs/prismadb";

export default async function getListingById(listingId: string) {
  try {
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid listing ID");
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return {
      ...listing,
      imageGallery: listing.imageGallery ?? [], // ensure it's always an array
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified:
          listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
}
