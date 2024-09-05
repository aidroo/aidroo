"use client";
import logo from "@/asserts/aidroo-logo.svg";
import PasswordInput from "@/components/PasswordInput";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";

export default function LoginForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { fetchUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.post("/api/auth/login", userData);

      if (response?.status === 201 || response.status === 200) {
        fetchUser();
        router.push("/");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <form className="  space-y-8 " onSubmit={(e) => handleSubmit(e)}>
      <div className=" w-32 mx-auto ">
        <Link href="/">
          <ResponsiveImage
            src={logo}
            alt="aidroo logo image"
            width={500}
            height={300}
          />
        </Link>
      </div>
      <Input
        type="email"
        className="mb-4"
        icon={MdOutlineMail}
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <PasswordInput
        placeholder="Create Password"
        name="password"
        value={userData.password}
        onChange={(e) =>
          setUserData({ ...userData, [e.target.name]: e.target.value })
        }
      />

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" className="w-4 h-4  " />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember Login
        </label>
      </div>
      {error && (
        <p className="text-red-400 bg-red-100 p-2 rounded-md">{error}</p>
      )}
      <Button
        variant="fillButton"
        className="h-10  md:text-xl"
        disabled={loading}
      >
        Login
      </Button>
    </form>
  );
}
