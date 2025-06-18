import { Nunito } from "next/font/google";


import type { Metadata } from "next";
import "./globals.css";
import  Navbar  from "./component/Navbar/Navbar";
import ClientOnly from "./component/ClientOnly";
import RegisterModal from "./component/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./component/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "@/app/types/index";
import RentModal from "./component/modals/RentModal";
import SearchModal from "./component/modals/SearchModal";





export const metadata: Metadata = {
  title: "Efficiency renU",
  description: "Efficiency rent U",
};

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser() as SafeUser | null;



  
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <ClientOnly>
        
        <ToasterProvider />
        <SearchModal/>
        <RentModal />
        <RegisterModal />
        <LoginModal />

        <Navbar currentUser={currentUser} />

        </ClientOnly>
        <div
          style={{
            paddingBottom: '5rem',
            paddingTop: '6rem'
          }}
        >
          {children}
        </div>

      </body>
    </html>
  );
}
