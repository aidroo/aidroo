"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform any post-payment actions here
    // Example: Display a success message or redirect
  }, []);

  return (
    <div className="confirmation-page">
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase. You will receive a confirmation email
        shortly.
      </p>
      <button onClick={() => router.push("/home")}>Return to Home</button>
    </div>
  );
};

export default SuccessPage;
