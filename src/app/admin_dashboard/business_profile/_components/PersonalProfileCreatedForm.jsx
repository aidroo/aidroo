"use client";

import SelectComponent from "@/components/SelectInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { countries } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";

export default function PersonalProfileCreatedForm({
  userData,
  setUserData,
  isExit,
  selectedCountry,
  setSelectedCountry,
}) {
  const router = useRouter();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Function to get existing query parameters
    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      if (userData.username) {
        queryParams.set("username", userData.username);
      }
      return queryParams;
    };

    // Update the URL with the new query parameters
    const updatedQueryParams = getQueryParams();
    router.push(
      `/admin_dashboard/business_profile?${updatedQueryParams.toString()}`,
      {
        shallow: true,
      }
    );
  }, [userData?.username, isExit, router]);

  const handleCheckboxChange = (checked) => {
    setUserData({ ...userData, userVerified: checked });
  };

  return (
    <div className="space-y-6 p-4 border">
      <div className="w-full flex gap-x-2">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
          value={userData?.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
          value={userData?.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex gap-x-2">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
          required
          value={userData?.email}
          onChange={handleChange}
        />
        <div
          className={`w-full flex items-center border gap-2 h-10 rounded-sm overflow-hidden ${
            isExit && "border-red-200"
          }`}
        >
          <LuUser2 className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />
          <Input
            type="text"
            placeholder="Username"
            className="bg-white dark:bg-gray-800 border-none focus-visible:ring-0 flex-grow"
            value={userData.username}
            onChange={handleChange}
            name="username"
            required
          />
          {!isExit && userData.username !== "" && (
            <BsCheckCircleFill className="text-primary_color text-2xl mr-2" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
          required
          value={userData.password}
          onChange={handleChange}
        />
        <SelectComponent
          options={countries}
          value={selectedCountry?.name || ""}
          onChange={(value) =>
            setSelectedCountry(countries.find((c) => c.name === value))
          }
          placeholder="Country"
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
      <div className="flex gap-4 items-center">
        <Checkbox
          checked={userData.userVerified}
          id="userverified"
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="userverified">Verified</Label>
      </div>
    </div>
  );
}
