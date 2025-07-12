// src/app/actions/getListings.ts
import prisma from "@/app/libs/prismadb";
import { SafeListing } from "@/app/types";
import { UNIVERSITIES } from "@/constants/universities";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startMonth?: string; // e.g., "2025-06"
  endMonth?: string;
  category?: string;
  university?: string;
  radius?: number; // miles
}

const EARTH_RADIUS_MILES = 3958.8;

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  return EARTH_RADIUS_MILES * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default async function getListings(
  params: IListingsParams
): Promise<SafeListing[]> {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      startMonth,
      endMonth,
      category,
      university,
      radius = 25,
    } = params;

    const query: Record<string, unknown> = {};

    if (userId) query.userId = userId;

    if (category) {
      query.category = {
        has: category,
      };
    }

    if (roomCount) query.roomCount = { gte: +roomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };

    if (startMonth && endMonth) {
      query.NOT = {
        reservations: {
          some: {
            AND: [
              {
                startMonth: {
                  lte: endMonth,
                },
              },
              {
                endMonth: {
                  gte: startMonth,
                },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    let filtered = listings;

    if (university) {
      const uni = UNIVERSITIES.find((u) => u.id === university);
      if (uni) {
        filtered = listings.filter((listing) => {
          return (
            listing.lat != null &&
            listing.lng != null &&
            haversineDistance(uni.lat, uni.lng, listing.lat, listing.lng) <= radius
          );
        });
      }
    }

    return filtered.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      university: listing.university,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch listings");
  }
}
