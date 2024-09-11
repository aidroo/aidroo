/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";
import { Input } from "@/components/ui/input";
import { profileImage } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import userIcon from "@/public/icons/customer-review.gif";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import IconImage from "../IconImage/IconImage";
import MultipleFileUpload from "../MultipleFileUpload";
import Rating from "../Rating/Rating";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import Star from "../Star/Star";
import { Textarea } from "../ui/textarea";

export function WriteReview2({ profileId }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);
  const [uploadUrl, setUploadUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const averageRating = (serviceRating + valueRating + recommendRating) / 3;
  let rating = Math.floor(averageRating);

  const [clicked, setClicked] = useState(false);
  const reviewData = {
    profileId,
    username: currentUser?.username,
    title,
    images: [uploadUrl],
    comment,
    rating,
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!title && !comment && !rating) return;

    try {
      setLoading(true);
      setClicked(true);
      const review = await axiosInstance.post("/api/review", reviewData);

      if (review?.status === 200) {
        // router.refresh();
        router.refresh(`/business/${profileId}/reviews`);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setTitle("");
      setUploadUrl(null);
      setComment("");
      setRecommendRating(0);
      setServiceRating(0);
      setValueRating(0);
      setLoading(false);
      setClicked(false);
    }
  };
  const handleChange = () => {
    setOpen(!open);
  };

  console.log(reviewData.images);

  return (
    <>
      {profileId !== currentUser?.username && (
        <div className="w-full">
          <div onClick={handleChange}>
            <div className="w-full border-2   rounded-md p-4 text-32 flex justify-between items-center cursor-pointer">
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
            <div>
              {currentUser?.username ? (
                <div className="   py-10">
                  <form
                    className="w-full  border    rounded-md   space-y-8 p-4 "
                    onSubmit={handleReviewSubmit}
                  >
                    <div>
                      <div className=" grid grid-cols-1 md:grid-cols-3 gap-y-4 ">
                        <div>
                          <h1 className="text-xl">Value</h1>
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

                    <div className="grid grid-cols-1 md:grid-cols-3      md:gap-x-4   ">
                      <div className=" col-span-2 lg:space-y-4 ">
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
                      <div>
                        <MultipleFileUpload setUploadUrl={setUploadUrl} />
                        <div className="w-44 h-24 flex  justify-between gap-x-2 mt-4   ">
                          <ResponsiveImage src={profileImage} />
                          <ResponsiveImage src={profileImage} />
                        </div>
                      </div>
                    </div>
                    {/* personal user create */}
                    <button
                      type="submit"
                      className={`flex gap-4 px-4 py-2 rounded-md   ${
                        clicked ? "bg-gray-500" : "bg-primary_color"
                      }`}
                    >
                      {loading ? "Submitting.." : "Write Review"}
                    </button>
                    {/* personal user create end */}
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
