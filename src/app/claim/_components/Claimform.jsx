"use client";
import FileUploadComponent from "@/components/FileUploadComponent";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function ClaimPageForm({ username }) {
  const [uploaderUrl1, setUploaderUrl1] = useState([]);
  const [uploaderUrl2, setUploaderUrl2] = useState("");

  const [userData, setUserData] = useState({
    fullName: "",

    phone: "",
    role: "",
    email: "",
    claimDescription: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleUploadUrl1 = (url) => {
    setUploaderUrl1((prevUrls) => [...prevUrls, url]); // Append the new URL to the array
  };
  const handleUploadUrl2 = (url) => {
    setUploaderUrl2((prevUrls) => [...prevUrls, url]); // Append the new URL to the array
  };
  const handledelete1 = async (url) => {
    const avatarId = url?.substring(url.lastIndexOf("/") + 1)?.split(".")?.[0];

    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, { avatarId });
      setUploaderUrl1((prevUrls) =>
        prevUrls?.filter((currentUrl) => currentUrl !== url)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handledelete2 = async (url) => {
    const avatarId = url?.substring(url.lastIndexOf("/") + 1)?.split(".")?.[0];

    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        avatarId,
      });
      setUploaderUrl2((prevUrls) =>
        prevUrls?.filter((currentUrl) => currentUrl !== url)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here, e.g., sending data to an API
    // After successful submission, navigate to the next page
    router.push(`/claim/pricing_plan?username=${username}`);
  };
  return (
    <div className="max-w-3xl mx-auto border p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            className="mb-4"
            placeholder="Full Name"
            name="fullName"
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            className="mb-4"
            placeholder="Phone Number"
            name="phone"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            className="mb-4"
            placeholder="Business Role"
            name="role"
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            className="mb-4"
            placeholder="Enter Your email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <Input
          type="text"
          className="mb-4"
          placeholder="full address"
          name="address"
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-y-4 w-2/3 my-4">
          <div className=" w-fit ">
            <h1 className="text-gray-700 py-2">
              Your prof or Identity (Upload image)
            </h1>
            <div className="flex items-start gap-4">
              <FileUploadComponent setUploadUrl={handleUploadUrl1} />
              {uploaderUrl1.length > 0 &&
                uploaderUrl1.map((url, index) => (
                  <div className="relative group w-60 h-24" key={index}>
                    <ResponsiveImage
                      src={url || ""}
                      className="border rounded-md  "
                      alt="review image"
                    />

                    <MdDelete
                      className="absolute top-1 right-0 text-xl text-red-500 hidden group-hover:block"
                      onClick={() => handledelete1(url)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className=" w-fit">
            <h1 className="text-gray-700 py-2">
              Business Documents (Upload image)
            </h1>
            <div className="flex items-start gap-4">
              <FileUploadComponent setUploadUrl={handleUploadUrl2} />
              {uploaderUrl2.length > 0 &&
                uploaderUrl2.map((url, index) => (
                  <div className="relative group w-60 h-24" key={index}>
                    <ResponsiveImage
                      src={url || ""}
                      className="border rounded-md  "
                      alt="review image"
                    />

                    <MdDelete
                      className="absolute top-1 right-0 text-xl text-red-500 hidden group-hover:block"
                      onClick={() => handledelete2(url)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className=" w-full ">
          <h1 className="text-gray-700 py-2">
            Write about your business prof!
          </h1>
          <Textarea onChange={handleChange} name="claimDescription" required />
        </div>

        <div className="flex items-center my-4 gap-4">
          <Checkbox id="terms" className="w-4 h-4  " required />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and write to the terms and conditions
          </label>
        </div>

        <button
          type="submit"
          className="h-10 px-2 bg-primary_color flex justify-center items-center text-white rounded-md md:text-xl"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
