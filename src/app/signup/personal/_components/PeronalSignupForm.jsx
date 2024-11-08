"use client";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PasswordInput from "@/components/PasswordInput";
import PhoneCountry from "@/components/PhoneNumberInput/PhoneCountry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countries, font14 } from "@/constant";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";

export default function PersonalSingupForm({ isExit }) {
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    role: "personal",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const query = new URLSearchParams();

  useEffect(() => {
    if (userData.username) {
      query.set("username", userData.username);
    }
    router.push(`/signup/personal?${query.toString()}`, {
      shallow: true,
    });
    // Reset subcategory when category is changed
  }, [router, userData?.username]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (userData.password !== userData.confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/user", userData);

      if (response.data.status === 201) {
        // setSuccess("Pending we are reviewing your request");
        setSuccess(response.data.message);
      } else {
        setApiError(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      setApiError("Error occurred during registration. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
          className="mb-4"
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          className="mb-4"
        />
      </div>
      <div className="w-full flex items-center border gap-2 h-10 rounded-sm overflow-hidden">
        <LuUser2 className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          className="bg-white dark:bg-gray-800 border-none focus-visible:ring-0 flex-grow"
          required
        />
        {!isExit && userData.username !== "" && (
          <BsCheckCircleFill className="text-primary_color text-2xl mr-2" />
        )}
      </div>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        className="mb-4"
        icon={MdOutlineMail}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PasswordInput
          placeholder="Create Password"
          name="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
        />
        <PasswordInput
          placeholder="Confirm Password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneCountry
          setPhone={(phoneNumber) => setUserData({ ...userData, phoneNumber })}
        />
        <OptionSelect
          label="Country"
          options={countries}
          className={`text-gray-600 ${font14} h-10`}
          onChange={(country) => setUserData({ ...userData, country })}
          value={userData.country}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="City"
          name="city"
          value={userData.city}
          onChange={handleChange}
          className="mb-4"
        />
        <Input
          type="text"
          placeholder="Address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          className="mb-4"
        />
      </div>
      {apiError && (
        <p className="text-red-400 bg-red-100 p-2 rounded-md">{apiError}</p>
      )}

      {success && (
        <p className="p-2 rounded-md text-primary_color bg-slate-100   ">
          {success}
        </p>
      )}
      <div className="flex items-center justify-center pt-2">
        <Button
          variant="fillButton"
          className="h-10 max-w-64 mx-auto"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary_color">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
