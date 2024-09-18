"use client";
import FileUploadComponent from "@/components/FileUploadComponent";
import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { brifcaseIcon } from "@/exportImage";
import axiosInstance from "@/lib/axios";

import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import PersonalProfileCreatedForm from "./PersonalProfileCreatedForm";

export default function ReviewAndProfileCreateDialog({ profileId, isExit }) {
  const [uploadUrl, setUploadUrl] = useState([]);
  const [singleImage, setSingleImage] = useState(null);

  // const [uploadUrl2, setUploadUrl2] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const router = useRouter();

  // Initialize state for user and review data
  const initialUserData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "personal",
    userVerified: false,
    status: "approved",
    city: "",
    description: "",
    address: "",
  };

  const initialReviewData = {
    title: "",
    comment: "",
    rating: 0,

    verified: false,
    profileId: profileId,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [reviewData, setReviewData] = useState(initialReviewData);

  // Calculate the average rating
  const averageRating = (serviceRating + valueRating + recommendRating) / 3;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/api/profilereview", {
        ...userData,
        ...reviewData,
        rating: averageRating, // Include the calculated rating
        images: uploadUrl,
        country: selectedCountry?.name,
        profileId,
        profileThumb: singleImage,
      });

      if (response.status === 201) {
        setSuccess(response.data.message);

        // Clear the form after successful submission
        setUserData(initialUserData); // Reset user data
        setReviewData({ ...initialReviewData, profileId }); // Reset review data with profileId
        setUploadUrl([]); // Clear uploaded image URL
        setServiceRating(0); // Reset service rating
        setValueRating(0); // Reset value rating
        setRecommendRating(0); // Reset recommend rating
        setSelectedCountry(null);
        setSingleImage(null);

        router.refresh("/admin_dashboard/business_profile");

        // Optionally, you can also close the dialog or perform other actions
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      console.error("Error creating user and review:", error);
      setError("An error occurred. Please try again.");
    }
  };

  // Handle input changes for review data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      [name]: value,
    }));
  };
  // Handle checkbox change
  const handleCheckboxChange = (checked) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      verified: checked,
    }));
  };
  const handleUploadUrl = (url) => {
    setUploadUrl((prevUrls) => [...prevUrls, url]); // Append the new URL to the array
  };
  const handledelete = async (url) => {
    const avatarId = url?.substring(url.lastIndexOf("/") + 1)?.split(".")?.[0];

    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        avatarId,
      });
      setUploadUrl((prevUrls) =>
        prevUrls.filter((currentUrl) => currentUrl !== url)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  return (
    <DialogContent className="h-screen overflow-hidden overflow-y-auto">
      <DialogTitle></DialogTitle>
      <form className="rounded-lg py-10 space-y-6" onSubmit={handleSubmit}>
        <div className="w-full border rounded-md space-y-8 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
            <div>
              <h1 className="text-xl">Service</h1>
              <div className="flex gap-1">
                <Rating
                  value={serviceRating}
                  isEditable
                  size={18}
                  rating={serviceRating}
                  setRating={setServiceRating}
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl">Value</h1>
              <div className="flex gap-1">
                <Rating
                  value={valueRating}
                  isEditable
                  size={18}
                  rating={valueRating}
                  setRating={setValueRating}
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl">Recommended</h1>
              <div className="flex gap-1">
                <Rating
                  value={recommendRating}
                  isEditable
                  size={18}
                  rating={recommendRating}
                  setRating={setRecommendRating}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:gap-x-4">
            <div className="col-span-2 space-y-4">
              <Input
                placeholder="Title"
                className="h-10"
                name="title"
                value={reviewData.title}
                onChange={handleInputChange}
              />
              <Textarea
                placeholder="Type your message here."
                className="min-h-28"
                name="comment"
                value={reviewData.comment}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <FileUploadComponent setUploadUrl={handleUploadUrl} />
              <div className=" flex  justify-between gap-x-2 mt-4   ">
                {uploadUrl &&
                  uploadUrl.map((url) => (
                    <div key={url} className="relative group w-24 h-24">
                      <ResponsiveImage
                        src={url}
                        className="border rounded-md  "
                        alt="review image"
                      />

                      <MdDelete
                        className="absolute top-1 right-0 text-xl text-red-500 hidden group-hover:block"
                        onClick={() => handledelete(url)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Checkbox
                checked={reviewData.verified}
                onCheckedChange={handleCheckboxChange}
              />
              <Label className="text-sm">Verified</Label>
            </div>
          </div>
        </div>

        {/* Image upload section */}
        <div className="flex gap-4 items-center border-b-2 pb-4 border p-4">
          <div className="ring-2 ring-primary_color ring-offset-8 dark:ring-offset-slate-700 rounded-full w-20 md:w-24 shrink-0 overflow-hidden">
            <IconImage
              src={singleImage || brifcaseIcon}
              alt="profile image"
              size={100}
              className="rounded-lg"
            />
          </div>
          <div className="max-w-64 space-y-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FileUploadComponent setUploadUrl={setSingleImage} />
            </div>
            <Button variant="hover" onClick={() => handledelete(singleImage)}>
              Remove Photo
            </Button>
          </div>
        </div>

        {/* Profile created */}
        <PersonalProfileCreatedForm
          userData={userData}
          setUserData={setUserData}
          handleCheckboxChange={handleCheckboxChange}
          isExit={isExit}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        {error && <h1 className="p-2 text-red-300">{error}</h1>}
        {success && <div className="text-green-300 ">{success}</div>}
        <Button
          variant="fillButton"
          type="submit"
          className="h-10 text-xs md:text-sm"
        >
          Create Business Profile
        </Button>
      </form>
    </DialogContent>
  );
}
