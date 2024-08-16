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
import apiService from "@/lib/apiService";
import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Heading from "../Heading";
import OptionSelect from "../OptionSelect/OptionSelect";

export default function WriteReview({ admin = false, mutate, username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);

  // const [like, setLike] = useState(0);
  //  const [love, setLove] = useState(0);

  const averageRating = (serviceRating + valueRating + recommendRating) / 3;
  let rating = Math.round(averageRating);
  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const reviewData = {
    username,
    title,
    comment,
    rating,
  };

  const handleReviewSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    if (!title && !comment && !rating) return;

    try {
      setLoading(true);
      const review = await apiService.addData("/api/review", reviewData);

      if (review?.status === 201) {
        mutate();
      } else {
        setError(review?.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setTitle("");
      setComment("");
      setRecommendRating(0);
      setServiceRating(0);
      setValueRating(0);
      setLoading(false);
    }
  };

  return (
    <>
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
      {isOpen && (
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
            <div className=" col-span-1 space-y-4 ">
              <label
                htmlFor="uploadFile1"
                className="  font-semibold text-base rounded p-4  flex flex-col items-center justify-center cursor-pointer border-2 h-28    mx-auto font-[sans-serif]"
              >
                <FaImage className="text-6xl text-primary_color" />

                <input type="file" id="uploadFile1" className="hidden" />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Drag Image or Browse
                </p>
              </label>
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
            <Button variant="hover" size="lg" type="submit" disabled={loading}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
