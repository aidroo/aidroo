"use client";
import FileUploadComponent from "@/components/FileUploadComponent";
import Rating from "@/components/Rating/Rating";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export function WriteReviewForm({ reviewData, setReviewData }) {
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);
  const [uploadUrl, setUploadUrl] = useState("");

  // Calculate average rating and update reviewData
  useEffect(() => {
    const averageRating = (serviceRating + valueRating + recommendRating) / 3;
    const roundedRating = Math.round(averageRating);
    setReviewData("rating", roundedRating);
  }, [serviceRating, valueRating, recommendRating]);

  // Update reviewData with the uploaded image URL
  useEffect(() => {
    if (uploadUrl) {
      setReviewData("images", [uploadUrl]); // assuming you want to store an array of image URLs
    }
  }, [uploadUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(name, value);
  };

  return (
    <form className="w-full border rounded-md space-y-8 p-4">
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
        <FileUploadComponent setUploadUrl={setUploadUrl} />
      </div>
    </form>
  );
}
