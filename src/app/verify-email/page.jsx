"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const res = await fetch("/api/auth/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          const data = await res.json();

          if (res.ok) {
            setVerified(true);
          } else {
            setError(data.error || "Invalid or expired token");
          }
        } catch (err) {
          console.error("Error verifying email:", err);
          setError("An error occurred during verification");
        }
      }
    };

    verifyEmail();
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
