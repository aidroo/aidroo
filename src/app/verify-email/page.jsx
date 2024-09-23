"use client";

import { verifyAccessToken } from "@/utils/jwt";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      try {
        // Verify the token using the secret key
        verifyAccessToken(token);
        setVerified(true);
      } catch (err) {
        console.error("Token verification failed:", err);
        setError("Invalid or expired token");
      }
    }
  }, [token]);

  return (
    <div>
      {verified ? (
        <h1>Your email has been successfully verified!</h1>
      ) : (
        <h1>{error || "Verifying your email..."}</h1>
      )}
    </div>
  );
}
