"use client";

import PasswordInput from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";
import { countries } from "@/constant";

import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import SelectComponent from "./SelectInput";
import SingleFileUpload from "./SingleFileUpload";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function PersonalProfileCreatedForm({
  userData,
  setUserData,
  isExit,
  uploadUrl,
  setUploadUrl,
  selectedCountry,
  setSelectedCountry,
  country,
  checked = false,
}) {
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

 

   
  const handleCheckboxChange = (checked) => {
    setUserData({ ...userData, userVerified: checked });
  };

  return (
    <div className="space-y-4 border-t">
      <h1 className="text-center text-lg font-semibold my-6 text-primary_color">
        Singup Profile
      </h1>
      <div className="flex gap-4 items-center border-b-2 pb-4 border p-4">
       
        <div className="max-w-64 space-y-2">
          <SingleFileUpload uploadUrl={uploadUrl} setUploadUrl={setUploadUrl}/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
          className="mb-4"
          required
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PasswordInput
          placeholder="Create Password"
          name="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({
              ...userData,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
        <SelectComponent
          options={countries}
          value={selectedCountry?.name || country}
          required
          onChange={(value) =>
            setSelectedCountry(countries.find((c) => c.name === value))
          }
          placeholder="Country"
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

      {checked && (
        <div className="flex gap-4 items-center py-4">
          <Checkbox
            checked={userData.userVerified}
            id="userverified"
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="userverified">Verified</Label>
        </div>
      )}
    </div>
  );
}
