"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Notfound from "@/components/Notfound";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PhoneCountry from "@/components/PhoneNumberInput/PhoneCountry";

import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14, font18 } from "@/constant";
import { profilePic } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/lib/apiService";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function BusinessInfo() {
  const { currentUser } = useAuth();

  // Fetch user data
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    currentUser?.username
      ? `/api/user?username=${currentUser?.username}`
      : null,
    (url) => apiService.singeDataFetching(url)
  );

  // Initialize state with empty strings or defaults

  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  // When userData is loaded, update the state
  useEffect(() => {
    if (userData) {
      setAddress(userData?.data?.addresses?.address || "");
      setPhone(userData?.data?.personalProfile?.phoneNumber || "");
      setCountry(userData?.data?.addresses?.country || "");
      setCity(userData?.data?.addresses?.city || "");
      setDescription(userData?.data?.personalProfile?.description || " ");
      setFirstName(userData?.data?.personalProfile?.firstName || " ");
      setLastName(userData?.data?.personalProfile?.lastName || " ");
      setDescription(userData?.data?.personalProfile?.description || " ");
      setUploadUrl(userData?.data?.personalProfile?.profileThumb || "");
    }
  }, [userData]); // This will run whenever userData changes

  const updatedData = {
    username: currentUser?.username,
    role: "personal",
    firstName,
    lastName,
    phoneNumber: phone,
    country,
    address,
    city,
    description,
  };

  // image  upload
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setApiError("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      await apiService.updateData("/api/user", currentUser?.username, {
        profileThumb: result?.data?.url,
        username: currentUser?.username,
        role: "personal",
      });
      mutate();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };
  const filenameWithExtension = uploadUrl?.substring(
    uploadUrl.lastIndexOf("/") + 1
  );
  // Remove the file extension to get the desired string
  const avatarId = filenameWithExtension?.split(".")?.slice(0, -1)?.join(".");

  const deleteUploadedFile = async () => {
    try {
      setLoading(true);
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        username: currentUser?.username,
        avatarId,
        role: "personal",
      });
      mutate();
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await apiService.updateData(
        "/api/user",
        currentUser?.username,
        updatedData
      );
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
      <div className="flex gap-4 items-center">
        <div className=" ring-2 ring-primary_color ring-offset-8  dark:ring-offset-slate-700 rounded-full  w-20 md:w-24 shrink-0  overflow-hidden ">
          <ResponsiveImage
            src={uploadUrl || profilePic}
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
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={(e) => handleFileUpload(e)}
              disabled={loading}
            >
              Upload File
            </Button>
          </form>
          <Button variant="hover" onClick={deleteUploadedFile}>
            Remove Photo
          </Button>
        </div>
      </div>
      <div>
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className=" w-full flex gap-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
              onChange={(e) => setLastName(e.target.value)}
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
