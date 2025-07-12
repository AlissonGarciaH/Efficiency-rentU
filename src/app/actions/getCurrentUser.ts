import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/authOptions";

import prisma from "@/app/libs/prismadb";
import { SafeUser } from "@/app/types";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession();

    // ✅ Use ID now instead of email
    if (!session?.user?.id) return null;

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) return null;

    return {
      id: currentUser.id,
      name: currentUser.name ?? null,
      email: currentUser.email ?? null,
      emailVerified: currentUser.emailVerified?.toISOString() ?? null,
      image: currentUser.image ?? null,
      hashedPassword: currentUser.hashedPassword ?? null,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      favoriteIds: currentUser.favoriteIds ?? [],
    };
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}
