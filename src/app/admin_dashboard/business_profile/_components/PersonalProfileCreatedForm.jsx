"use client";

import OptionSelect from "@/components/OptionSelect/OptionSelect";
import { Input } from "@/components/ui/input";
import { countries, font14 } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";

export default function PersonalProfileCreatedForm({
  userData,
  setUserData,
  isExit,
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
  }, [userData.username, isExit, router]);

  return (
    <div className="space-y-6 p-4 border ">
      <div className=" w-full flex gap-x-2">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
          value={userData.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
          value={userData.lastName}
          onChange={handleChange}
        />
      </div>{" "}
      {/* email */}
      <div className=" w-full flex gap-x-2">
        <Input
          type="email"
          name="email"
          placeholder="email"
          className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
          required
          value={userData.email}
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
            className={`bg-white dark:bg-gray-800 border-none focus-visible:ring-0 flex-grow `}
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
      {/* username */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="password"
          placeholder=" password"
          name="password"
          className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
          required
          value={userData.password}
          onChange={handleChange}
        />
        <OptionSelect
          label="Country"
          options={countries}
          className={`text-gray-600 ${font14} h-10`}
          onChange={(country) => setUserData({ ...userData, country })}
          value={userData.country}
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
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
      {/* {error && (
      <h1 className="p-4 bg-red-50 text-red-200">
        {error || apiError}
      </h1>
    )} */}
      {/* {message && (
      <h1 className="p-2 text-green-400 bg-green-200">{message}</h1>
    )} */}
    </div>
  );
}
