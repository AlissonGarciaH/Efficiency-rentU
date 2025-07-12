// src/app/layout.tsx
import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./component/Navbar/Navbar";
import ClientOnly from "./component/ClientOnly";
import RegisterModal from "./component/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./component/modals/LoginModal";
import RentModal from "./component/modals/RentModal";
import SearchModal from "./component/modals/SearchModal";
import GoogleMapsWrapper from "./component/wrappers/GoogleMapsWrapper";
import SessionProviderWrapper from "./component/providers/SessionProviderWrapper";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeUser } from "./types";

export const metadata: Metadata = {
  title: "Efficiency renU",
  description: "Efficiency rent U",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser: SafeUser | null = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProviderWrapper>
          <ClientOnly>
            <GoogleMapsWrapper>
              <ToasterProvider />
              <SearchModal />
              <RentModal />
              <RegisterModal />
              <LoginModal />
              <Navbar currentUser={currentUser} /> {/* ✅ Pass as prop */}
            </GoogleMapsWrapper>
          </ClientOnly>

          <div style={{ paddingBottom: "5rem", paddingTop: "6rem" }}>
            {children}
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
