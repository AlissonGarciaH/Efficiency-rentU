import { getServerSession } from "next-auth/next";
import { SafeUser } from "@/app/types";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";


export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
    try {
     
      const session = await getSession();

      if (!session?.user?.email){
        return null;
      }

      const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        }
      });

      if (!currentUser) {
       return null;        
      }

      return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
        image: currentUser.image || null 
      };

       

    } catch (error: unknown) {
  console.error('Something went wrong:', error); // You can customize the message
  return null;
}

}
