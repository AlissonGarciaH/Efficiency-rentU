"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      onClick={() => signIn()}
      style={{
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Sign In
    </button>
  );
};

export default SignInButton;
