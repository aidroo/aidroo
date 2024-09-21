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
  const router = useRouter();

  const [uploaderUrl1, setUploaderUrl1] = useState([]);
  const [uploaderUrl2, setUploaderUrl2] = useState([]);
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    role: "",
    email: "",
    address: "",
    claimDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUploadUrl1 = (url) =>
    setUploaderUrl1((prevUrls) => [...prevUrls, url]);
  const handleUploadUrl2 = (url) =>
    setUploaderUrl2((prevUrls) => [...prevUrls, url]);

  const handleDelete = async (url, setUploaderUrls) => {
    const avatarId = url.split("/").pop().split(".")[0];
    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, { avatarId });
      setUploaderUrls((prevUrls) =>
        prevUrls.filter((currentUrl) => currentUrl !== url)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/claim/pricing_plan?username=${username}`);
  };

  return (
    <div className="max-w-3xl mx-auto border p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="mb-4"
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="phone"
            placeholder="Phone Number"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="role"
            placeholder="Business Role"
            className="mb-4"
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="mb-4"
            onChange={handleChange}
            required
          />
        </div>
        <Input
          type="text"
          name="address"
          placeholder="Full Address"
          className="mb-4"
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-y-4 w-2/3 my-4">
          <FileUploadSection
            title="Your prof or Identity (Upload image)"
            uploaderUrls={uploaderUrl1}
            setUploaderUrls={setUploaderUrl1}
            handleUpload={handleUploadUrl1}
            handleDelete={handleDelete}
          />
          <FileUploadSection
            title="Business Documents (Upload image)"
            uploaderUrls={uploaderUrl2}
            setUploaderUrls={setUploaderUrl2}
            handleUpload={handleUploadUrl2}
            handleDelete={handleDelete}
          />
        </div>

        <TextareaSection
          label="Write about your business prof!"
          name="claimDescription"
          onChange={handleChange}
        />

        <TermsCheckbox />

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

const FileUploadSection = ({
  title,
  uploaderUrls,
  setUploaderUrls,
  handleUpload,
  handleDelete,
}) => (
  <div className="w-fit">
    <h1 className="text-gray-700 py-2">{title}</h1>
    <div className="flex items-start gap-4">
      <FileUploadComponent setUploadUrl={handleUpload} />
      {uploaderUrls.length > 0 &&
        uploaderUrls.map((url, index) => (
          <div className="relative group w-60 h-24" key={index}>
            <ResponsiveImage
              src={url}
              className="border rounded-md"
              alt="Uploaded image"
            />
            <MdDelete
              className="absolute top-1 right-0 text-xl text-red-500 hidden group-hover:block"
              onClick={() => handleDelete(url, setUploaderUrls)}
            />
          </div>
        ))}
    </div>
  </div>
);

const TextareaSection = ({ label, name, onChange }) => (
  <div className="w-full">
    <h1 className="text-gray-700 py-2">{label}</h1>
    <Textarea name={name} onChange={onChange} required />
  </div>
);

const TermsCheckbox = () => (
  <div className="flex items-center my-4 gap-4">
    <Checkbox id="terms" className="w-4 h-4" required />
    <label
      htmlFor="terms"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      I have read and agree to the terms and conditions
    </label>
  </div>
);
