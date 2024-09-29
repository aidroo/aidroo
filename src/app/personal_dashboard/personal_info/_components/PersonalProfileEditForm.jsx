"use client";

import OptionSelect from "@/components/OptionSelect/OptionSelect";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14, font18 } from "@/constant";
import { profilePic } from "@/exportImage";
import { useState } from "react";

export default function PersonalProfileEditForm() {
  //   const { currentUser } = useAuth();
  //   const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //   const query = new URLSearchParams();
  //   useEffect(() => {
  //     query.set("username", currentUser?.username);
  //     router.push(`/business_dashboard/business_info?${query.toString()}`, {
  //       shallow: true,
  //     });
  //     // Reset subcategory when category is changed
  //   }, [router, "jhon"]);
  return (
    <div className="border  rounded-lg p-10 space-y-6">
      <div className="flex gap-4 items-center">
        <div className=" ring-2 ring-primary_color ring-offset-8  dark:ring-offset-slate-700 rounded-full  w-20 md:w-24 shrink-0  overflow-hidden ">
          <ResponsiveImage
            src={profilePic}
            alt="profile image"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="max-w-64 space-y-2">
          <form className="grid w-full max-w-sm items-center gap-1.5 ">
            <Input
              id="picture"
              type="file"
              className="border "
              required
              //   onChange={handleChange}
            />
            <Button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              //   onClick={(e) => handleFileUpload(e)}
              //   disabled={loading}
            >
              Upload File
            </Button>
          </form>
          <Button variant="hover">Remove Photo</Button>
        </div>
      </div>
      <div>
        <form className="space-y-6">
          <div className=" w-full flex gap-4">
            <Input
              type="text"
              placeholder="First Name"
              className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              placeholder="Last Name"
              className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <OptionSelect
              label="Select a country"
              options={countries}
              className={`text-gray-600 ${font14} h-10`}
              //   onChange={setCountry}
              //   value={country}
            />
            {/* <PhoneCountry setPhone={setPhone} value={phone} /> */}
            <Input
              type="text"
              placeholder="City"
              className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
              name="city"
              value={userData.city}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Address"
              className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />{" "}
          </div>
          <div className="space-y-2">
            <h1 className={`text-center ${font18}`}>About my Business </h1>
            <Textarea
              className="min-h-32 placeholder:text-sm placeholder:flex placeholder:mt-14"
              placeholder="Write short description about your business .
(300 words Limit )"
              value={userData.description}
              onChange={handleChange}
              name="description"
              required
            />
          </div>
          {/* {error && (
            <h1 className="p-4 bg-red-50 text-red-200">{error || apiError}</h1>
          )} */}
          <Button
            variant="fillButton"
            type="submit"
            className="h-10   text-xs md:text-sm"
            // disabled={loading}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
