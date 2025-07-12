'use client';

import { useSession } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

export default function Home() {
  const { data: session } = useSession();
  const loginModal = useLoginModal();

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {!session?.user ? (
        <>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: "bold",
              marginBottom: "1rem",
              lineHeight: 1.3,
            }}
          >
            🎓✨ Find your perfect student home
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              color: "#444",
              maxWidth: "90%",
            }}
          >
            🔍 We&rsquo;re launching a smarter, friendlier way to connect students with trusted housing near campus.
            <br />
            🚀 Sign in now to join the waitlist and get first access when we go live!
          </p>
          <button
            onClick={loginModal.onOpen}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#00C78C",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            🔑 Sign In to Join the Waitlist
          </button>
        </>
      ) : (
        <>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: "bold",
              marginBottom: "1rem",
              lineHeight: 1.3,
            }}
          >
            ✅ Welcome to the waitlist, {session.user.name || "student"}! 🎉
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              color: "#444",
              maxWidth: "90%",
            }}
          >
            📬 You&apos;re officially in! We&rsquo;ll notify you when your housing match is ready.
            <br />
            📅 Keep an eye on your inbox — great things are coming soon!
          </p>
        </>
      )}
    </div>
  );
}
