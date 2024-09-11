"use client";
import { Combobox } from "@/components/Combobox";
import IconImage from "@/components/IconImage/IconImage";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PasswordInput from "@/components/PasswordInput";
import PhoneCountry from "@/components/PhoneNumberInput/PhoneCountry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countries, font14 } from "@/constant";
import { categoryImage } from "@/exportImage";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";

export default function SignupForm({ categories, subcategories, isExit }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [userData, setUserData] = useState({
    businessName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "business",
    country: "United States",
    city: "",
    address: "",
  });

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams();
  // Update URL when category is selected
  useEffect(() => {
    if (selectedCategory) {
      query.set("category_id", selectedCategory?.id);
    }
    if (userData.username) {
      query.set("username", userData.username);
    }
    router.push(`/signup/business?${query.toString()}`, {
      shallow: true,
    });
    // Reset subcategory when category is changed
  }, [selectedCategory, router, userData.username, isExit]);

  // user check in database

  // form state change

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");
    const { confirmPassword, ...dataToSend } = userData;

    if (userData.password !== confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/user", {
        ...dataToSend,
        category: selectedCategory?.name,
        subcategory: selectedSubcategory?.name,
      });

      if (response.data.status === 201) {
        setSuccess("Pending we are reviewing your request");

        // Reset form fields after successful submission
        setUserData({
          businessName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          role: "business",
          country: "United States",
          city: "",
          address: "",
        });
        setSelectedCategory(null);
        setSelectedSubcategory(null);
      } else {
        setApiError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setApiError("Error occurred during registration. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        placeholder="Business Name"
        type="text"
        className="mb-4"
        name="businessName"
        value={userData.businessName}
        onChange={handleChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full flex items-center border gap-2 h-10 rounded-sm overflow-hidden">
          <LuUser2 className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />
          <Input
            type="text"
            placeholder="Username"
            className="bg-white dark:bg-gray-800 border-none focus-visible:ring-0 flex-grow"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          {!isExit && userData.username !== "" && (
            <BsCheckCircleFill className="text-primary_color text-2xl mr-2" />
          )}
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center border rounded-md">
          <div className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm flex items-center justify-center">
            <IconImage src={categoryImage} size={24} alt="icon" />
          </div>
          <Combobox
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            options={categories}
            className="border-none"
            placeholder="Category"
          />
        </div>
        <div className="flex items-center border rounded-md">
          <div className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm flex items-center justify-center">
            <IconImage src={categoryImage} size={24} alt="icon" />
          </div>
          <Combobox
            selectedCategory={selectedSubcategory}
            setSelectedCategory={setSelectedSubcategory}
            options={subcategories}
            placeholder="Subcategory"
          />
        </div>
      </div>
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
          className="mb-4"
          placeholder="City"
          name="city"
          value={userData.city}
          onChange={handleChange}
        />
        <Input
          type="text"
          className="mb-4"
          placeholder="Address"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </div>
      {apiError && (
        <p className="text-red-400 bg-red-100 p-2 rounded-md">{apiError}</p>
      )}
      {success && (
        <p className="    p-2 rounded-md text-green-300   bg-green-50">
          {success && success}
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
