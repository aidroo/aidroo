/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import userIcon from "@/public/icons/customer-review.gif";

import { options } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/lib/apiService";
import Link from "next/link";
import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Heading from "../Heading";
import OptionSelect from "../OptionSelect/OptionSelect";
import { Skeleton } from "../ui/skeleton";

export default function WriteReview({
  admin = false,
  mutate,
  username,
  profileId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);
  const [uploadUrl, setUploadUrl] = useState(null);

  // const [like, setLike] = useState(0);
  //  const [love, setLove] = useState(0);
  const { currentUser } = useAuth();

  const averageRating = (serviceRating + valueRating + recommendRating) / 3;
  let rating = Math.round(averageRating);

  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const reviewData = {
    profileId,
    username,
    title,
    images: [uploadUrl],
    comment,
    rating,
  };
  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    setUploadUrl(result?.data?.url);
    setLoading(false);
  };

  const handleReviewSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    if (!title && !comment && !rating) return;

    try {
      setLoading(true);

      const review = await apiService.addData("/api/review", reviewData);

      if (review?.status === 201) {
        // Re-fetch the updated data to refresh the UI
        mutate(); // This will refresh the data
      } else {
        setError(review?.message || "Failed to submit the review.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      // Reset form and close modal
      setIsOpen(false);
      setTitle("");
      setUploadUrl(null);
      setComment("");
      setRecommendRating(0);
      setServiceRating(0);
      setValueRating(0);
      setLoading(false);
    }
  };

  return (
    <>
      {profileId !== currentUser?.username && (
        <div
          className="w-full border-2   rounded-md p-4 text-32 flex justify-between items-center cursor-pointer"
          onClick={handleOpenChange}
        >
          <IconImage src={userIcon} size={50} alt="user" />

          <h1 className="text-primary">Write Review</h1>
          <div className="flex gap-1">
            <Rating />
          </div>
        </div>
      )}
      {isOpen && (
        <div>
          {username ? (
            <form
              className="w-full border-2   rounded-md p-4 space-y-8 "
              onSubmit={handleReviewSubmit}
            >
              <div className="flex justify-end">
                <div
                  className="border    w-8 h-8 rounded-full     text-md  flex justify-center items-center cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <IoClose className="text-xl text-primary_color " />
                </div>
              </div>

              <div>
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-14  ">
                  <div>
                    <Heading size="sm">Service</Heading>
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
                    <Heading size="sm">Value</Heading>
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
                    <Heading size="sm">Recommend</Heading>
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

              <div className="grid grid-cols-1 md:grid-cols-3     md:gap-4   ">
                <div className=" col-span-2 space-y-4">
                  <Input
                    placeholder="Title"
                    className=" h-10 "
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <Textarea
                    placeholder="Type your message here."
                    className="min-h-28"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className=" col-span-1 space-y-4 mx-auto">
                  {!uploadUrl && loading && (
                    <Skeleton className="h-32 w-32 rounded-full" />
                  )}
                  {uploadUrl && !loading && (
                    <div className=" w-full  p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-14 shrink-0 fill-green-500 inline"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
                          data-original="#000000"
                        />
                        <path
                          d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                  )}
                  {!uploadUrl && !loading && (
                    <label
                      htmlFor="uploadFile1"
                      className="  font-semibold text-base rounded p-4  flex flex-col items-center justify-center cursor-pointer border-2 h-28    mx-auto font-[sans-serif]"
                    >
                      <FaImage className="text-6xl text-primary_color" />

                      <input
                        type="file"
                        id="uploadFile1"
                        className="hidden"
                        onChange={handleChange}
                      />
                      <p className="text-xs font-medium text-gray-400 mt-2">
                        Drag Image or Browse
                      </p>
                    </label>
                  )}
                </div>
              </div>
              {/* personal user create */}
              {admin && (
                <div className="space-y-6">
                  <h1>Provide Personal Profile Information </h1>
                  <Input
                    type="text"
                    placeholder="Business Name"
                    className="bg-white dark:bg-gray-800 h-10 "
                  />
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="username"
                      className="bg-white dark:bg-gray-800 h-10 "
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-white dark:bg-gray-800  h-10 "
                    />
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <PhoneCountry setPhone={setPhone} /> */}
                    <OptionSelect label="country" options={options} />
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="password"
                      placeholder="Create Password"
                      className="bg-white dark:bg-gray-800  h-10 "
                    />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="bg-white dark:bg-gray-800  h-10 "
                    />
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OptionSelect label="country" options={options} />
                    <OptionSelect label="country" options={options} />
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="City"
                      className="bg-white dark:bg-gray-800  h-10 "
                    />
                    <Input
                      type="text"
                      placeholder="Address"
                      className="bg-white dark:bg-gray-800  h-10 "
                    />
                  </div>
                </div>
              )}

              {error && <h1 className="p-2 bg-red-50 text-red-200">{error}</h1>}
              {/* personal user create end */}
              <div className="  flex justify-center items-center">
                <Button
                  variant="hover"
                  size="lg"
                  type="submit"
                  disabled={loading}
                >
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col justify-center items-center h-44 border rounded-md p-10 bg-red-50 space-y-4">
              <h1 className="text-center text-xl ">
                You need to be logged in to write a review.
              </h1>
              <Link
                href="/login"
                className=" px-4 py-2 rounded-md border  bg-primary_color text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
