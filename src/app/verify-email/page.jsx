"use client";

import axiosInstance from "@/lib/axios";
import ilstraion from "@/public/images/illustration-02.svg";
import Image from "next/image";
import Link from "next/link";
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
          // Use Axios to make a GET request with token as query parameter
          const res = await axiosInstance.get("/api/auth/verify-token", {
            params: { token },
          });
          console.log(res);
          if (res?.data?.success) {
            setVerified(true); // If the verification is successful, update the state
          } else {
            setError(res?.data?.message || "Invalid or expired token");
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
        <div>
          <div className=" w-screen h-screen flex flex-col items-center justify-center ">
            <Image
              src={ilstraion}
              alt=""
              width={500}
              height={300}
              className="-mt-36"
            />
            <div className="flex flex-col items-center justify-center gap-4  ">
              <h1 className="text-2xl text-primary_color font-semibold">
                Email verification successful!
              </h1>
              <p>
                You can now log in to your account using the email address you
                provided.
              </p>
              <Link
                href="/login"
                className="px-8 rounded-md py-2 bg-primary_color text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h1>{error || "Verifying your email..."}</h1>
      )}
    </div>
  );
}
