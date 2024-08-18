"use client";
import { countries, font14, font18 } from "@/constant";
import { profileImage } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/lib/apiService";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Combobox } from "./Combobox";
import Error from "./Error";
import Loading from "./Loading";
import Notfound from "./Notfound";
import OptionSelect from "./OptionSelect/OptionSelect";
import PhoneCountry from "./PhoneNumberInput/PhoneCountry";
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function BusinessProfileUpdateForm() {
  const { currentUser } = useAuth();

  // Fetch user data
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/user?username=${currentUser?.username}`, (url) =>
    apiService.singeDataFetching(url)
  );

  // Initialize state with empty strings or defaults
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [funds, setFunds] = useState("");
  const [employees, setEmployees] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // When userData is loaded, update the state
  useEffect(() => {
    if (userData) {
      setBusinessName(userData?.data?.businessProfile?.businessName || "");
      setAddress(userData?.data?.addresses?.address || "");
      setPhone(userData?.data?.businessProfile?.phoneNumber || "");
      setCountry(userData?.data?.addresses?.country || "");
      setCity(userData?.data?.addresses?.city || "");
      setDescription(userData?.data?.businessProfile?.description || " ");
      setFunds(userData?.data?.businessProfile?.funds || "");
      setEmployees(userData?.data?.businessProfile?.employees || 0);
      setSelectedCategory(userData?.data?.businessProfile?.category || null);
      setSelectedSubcategory(
        userData?.data?.businessProfile?.subcategory || null
      );
    }
  }, [userData]); // This will run whenever userData changes

  // Fetch categories and subcategories
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR("/api/category", (url) => apiService.getData(url));

  const {
    data: subcategoryData,
    error: subcategoryError,
    isLoading: subcategoryLoading,
  } = useSWR("/api/subcategory", (url) => apiService.getData(url));

  const updatedData = {
    username: currentUser?.username,
    role: "business",
    businessName: businessName,
    category: selectedCategory?.name,
    subcategory: selectedSubcategory?.name,
    phoneNumber: phone,
    country,
    address,
    city,
    description,
    employees,
    funds,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (currentUser.username) {
        await apiService.updateData(
          "/api/user",
          currentUser?.username,
          updatedData
        );
      }
      mutate();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (error) {
    return <Error error={error.message} />;
  }

  // Handle not found state
  if (!userData?.data) {
    return <Notfound />;
  }

  if (userData?.status !== 201) {
    return <Error error={userData.message} />;
  }

  return (
    <div className="border  rounded-lg p-10 space-y-6">
      <div className="flex gap-10 items-center h-fit">
        <div className=" ring-2 ring-primary_color ring-offset-8  dark:ring-offset-slate-700 rounded-full  w-20 md:w-24 shrink-0  overflow-hidden ">
          <ResponsiveImage
            src={profileImage}
            alt="profile image"
            className="rounded-lg"
          />
        </div>
        <div className="max-w-64 space-y-2">
          <Button variant="hover">Remove Photo</Button>
        </div>
      </div>
      <div>
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className=" w-full">
            <Input
              type="text"
              placeholder="Business Name"
              value={businessName}
              className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <Combobox
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              options={categoryData?.data}
              isLoading={categoryLoading}
              error={categoryError}
              className="border-none"
              placeholder="category"
            />
            <Combobox
              selectedCategory={selectedSubcategory}
              setSelectedCategory={setSelectedSubcategory}
              options={subcategoryData?.data}
              isLoading={subcategoryLoading}
              error={subcategoryError}
              placeholder="subcategory"
            />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <OptionSelect
              label="Select a country"
              options={countries}
              className={`text-gray-600 ${font14} h-10`}
              onChange={setCountry}
              value={country}
            />
            <PhoneCountry setPhone={setPhone} value={phone} />
            <Input
              type="text"
              placeholder="City"
              className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <Input
              type="text"
              placeholder="Address"
              value={address}
              className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
              onChange={(e) => setAddress(e.target.value)}
            />{" "}
            <Input
              type="text"
              placeholder="Total funds"
              className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
              onChange={(e) => setFunds(e.target.value)}
              value={funds}
            />
            <Input
              type="text"
              placeholder="Total Employees"
              className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
              onChange={(e) => setEmployees(e.target.value)}
              value={employees}
            />
          </div>
          <div className="space-y-2">
            <h1 className={`text-center ${font18}`}>About my Business </h1>
            <Textarea
              className="min-h-32 placeholder:text-sm placeholder:flex placeholder:mt-14"
              placeholder="Write short description about your business .
(300 words Limit )"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          {error && (
            <h1 className="p-4 bg-red-50 text-red-200">{error || apiError}</h1>
          )}
          <Button
            variant="fillButton"
            type="submit"
            className="h-10   text-xs md:text-sm"
            disabled={loading}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
