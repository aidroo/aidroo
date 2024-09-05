"use client";
import FileUploadComponent from "@/components/FileUploadComponent";
import IconImage from "@/components/IconImage/IconImage";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { brifcaseIcon } from "@/exportImage";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

import PersonalProfileCreatedForm from "./PersonalProfileCreatedForm";
import { WriteReviewForm } from "./WriteReviewForm";

export default function ReviewAndProfileCreateDialog({ profileId, isExit }) {
  const [uploadUrl, setUploadUrl] = useState(null);
  const [error, setError] = useState(null);
  // const router = useRouter();

  // Initialize state for user and review data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "personal",
    profileThumb: uploadUrl,
    country: "",
    city: "",
    description: "",
  });

  const [reviewData, setReviewData] = useState({
    title: "",
    comment: "",
    rating: 0,
    images: [],
    profileId,
  });

  // Handler for updating review data
  const handleReviewChange = (field, value) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      [field]: value,
    }));
  };

  // Handler for updating the average rating
  const handleAverageRatingChange = (averageRating) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      rating: averageRating,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/profilereview", {
        ...userData,
        ...reviewData,
        uploadUrl,
      });

      if (response.status === 201) {
        alert("User and review created successfully!");
        // Handle successful submission, e.g., redirect or reset form
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      console.error("Error creating user and review:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <DialogContent className="h-screen overflow-hidden overflow-y-auto">
      <form className="rounded-lg py-10 space-y-6" onSubmit={handleSubmit}>
        <WriteReviewForm
          reviewData={reviewData}
          setReviewData={handleReviewChange}
          setAverageRating={handleAverageRatingChange}
        />
        {/* Image upload section */}
        <div className="flex gap-4 items-center border-b-2 pb-4 border p-4">
          <div className="ring-2 ring-primary_color ring-offset-8 dark:ring-offset-slate-700 rounded-full w-20 md:w-24 shrink-0 overflow-hidden">
            <IconImage
              src={uploadUrl || brifcaseIcon}
              alt="profile image"
              size={100}
              className="rounded-lg"
            />
          </div>
          <div className="max-w-64 space-y-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FileUploadComponent setUploadUrl={setUploadUrl} />
            </div>
            <Button variant="hover">Remove Photo</Button>
          </div>
        </div>
        {/* Profile created */}
        <PersonalProfileCreatedForm
          userData={userData}
          setUserData={setUserData}
          isExit={isExit}
        />
        {error && <h1 className="p-2 text-red-300">{error}</h1>}
        <Button
          variant="fillButton"
          type="submit"
          className="h-10   text-xs md:text-sm"
        >
          Create Business Profile
        </Button>
      </form>
    </DialogContent>
  );
}
