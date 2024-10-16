/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import userIcon from "@/public/icons/customer-review.gif";
import Link from "next/link";
import { useState } from "react";
import IconImage from "../IconImage/IconImage";
import JsonComponent from "../JonImg";
import MultiFileUpload from "../MultiFileUpload";
import Rating from "../Rating/Rating";
import Star from "../Star/Star";
import { Label } from "../ui/label";
import Tiptap from "./Tiptap";

export function WriteReview2({ profileId }) {
  const { currentUser } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false); // New state for delayed content
  const [comment, setComment] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);
  const [uploadUrls, setUploadUrls] = useState([]);

  const [success, setSuccess] = useState("");
  const averageRating = (serviceRating + valueRating + recommendRating) / 3;
  let rating = Math.floor(averageRating);

  const [clicked, setClicked] = useState(false);
  const reviewData = {
    profileId,
    username: currentUser?.username,
    title,
    images: uploadUrls,
    comment,
    rating,
  };

  const handleContentChange = (reason) => {
    setComment(reason);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!title && !comment && !rating) return;

    try {
      setClicked(true);
      setShowAnimation(true);
      setSuccess("");
      setTimeout(() => {
        setShowAnimation(false);
      }, 700);
      const review = await axiosInstance.post("/api/review", reviewData);
      console.log(review);
      if (review?.data?.status === 201) {
        setTitle("");
        setComment("");
        setUploadUrls([]);
        setSuccess("Pending we are reviewing your request");
        // 2000ms = 2 seconds
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setUploadUrls([]);
      setRecommendRating(0);
      setServiceRating(0);
      setValueRating(0);
      setClicked(false);
    }
  };

  const handleChange = () => {
    setOpen(!open);

    if (!open) {
      // Show content after a delay when opening
      setTimeout(() => {
        setShowContent(true);
      }, 200); // Adjust delay time as needed
    } else {
      // Hide content instantly when closing
      setShowContent(false);
    }
  };

  return (
    <>
      {profileId !== currentUser?.username && (
        <div className="w-full border rounded-md">
          <div onClick={handleChange}>
            <div className="w-full rounded-md p-4 text-32 flex justify-between items-center cursor-pointer">
              <IconImage src={userIcon} size={50} alt="user" />
              <h1 className="text-primary">Write Review</h1>
              <div className="flex gap-1">
                <Star colorClass="initial" />
                <Star colorClass="initial" />
                <Star colorClass="initial" />
              </div>
            </div>
          </div>
          {open && (
            <div
              className={`transition-opacity duration-300 ${
                showContent ? "opacity-100" : "opacity-0"
              }`}
            >
              {currentUser?.username ? (
                <div className="py-10">
                  <form
                    className="w-full rounded-md space-y-8 p-4"
                    onSubmit={handleReviewSubmit}
                  >
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
                        <div>
                          <h1 className="text-xl flex">Service</h1>
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
                    </div>
                    <div className="w-full lg:space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          className="h-10 border-primary_color"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Tiptap
                          value={comment}
                          onChange={(newContent) =>
                            handleContentChange(newContent)
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-start">
                      <MultiFileUpload
                        uploadUrls={uploadUrls}
                        setUploadUrls={setUploadUrls}
                      />
                    </div>
                    {success && (
                      <p className="rounded-md text-primary_color bg-primary_color/10 p-2 text-center">
                        Pending!{" "}
                        <span className="text-red-400">
                          We are reviewing your request
                        </span>
                      </p>
                    )}
                    <div className="relative w-full flex ">
                      <button
                        type="submit"
                        className={`flex gap-4 px-4 py-2 rounded-md h-12 border text-white items-center ${
                          clicked ? "bg-primary_color" : "bg-primary_color"
                        }`}
                      >
                        {"Submit Review"}
                      </button>
                      {showAnimation && (
                        <div className="absolute -top-12 -left-8">
                          <JsonComponent shouldLoop={true} />
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex justify-center items-center h-24 bg-red-100">
                  <div>
                    <Link
                      href="/login"
                      className="px-4 py-2 bg-primary_color text-white w-2/3 rounded-sm"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
