/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import userIcon from "@/public/icons/customer-review.gif";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FileUploadComponent from "../FileUploadComponent";
import IconImage from "../IconImage/IconImage";
import Rating from "../Rating/Rating";
import Spinner from "../Spinner";
import Star from "../Star/Star";
import { Textarea } from "../ui/textarea";

export function WriteReview2({ profileId }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [recommendRating, setRecommendRating] = useState(0);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const averageRating = (serviceRating + valueRating + recommendRating) / 3;
  let rating = Math.round(averageRating);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!title && !comment && !rating) return;
    const reviewData = {
      profileId,
      username: currentUser?.username,
      title,
      images: [uploadUrl],
      comment,
      rating,
    };
    try {
      setLoading(true);

      const review = await axiosInstance.post("/api/review", reviewData);

      if (review?.status === 200) {
        // router.refresh();
        router.push(`/business/${profileId}`);
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
    }
  };

  return (
    <Dialog className="w-full">
      <DialogTrigger asChild>
        <div className="w-full border-2   rounded-md p-4 text-32 flex justify-between items-center cursor-pointer">
          <IconImage src={userIcon} size={50} alt="user" />

          <h1 className="text-primary">Write Review</h1>
          <div className="flex gap-1">
            <Star colorClass="initial" />
            <Star colorClass="initial" />
            <Star colorClass="initial" />
          </div>
        </div>
      </DialogTrigger>
      {currentUser?.username ? (
        <DialogContent className=" w-[700px] py-10">
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

            <div className="grid grid-cols-1 md:grid-cols-3   space-y-4   md:gap-x-4   ">
              <div className=" col-span-2 space-y-4 ">
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
              <FileUploadComponent setUploadUrl={setUploadUrl} />
            </div>
            {/* personal user create */}
            <Button type="submit" disabled={loading} className="flex gap-4">
              {loading && <Spinner />}
              Write Review
            </Button>
            {/* personal user create end */}
          </form>
          <DialogFooter className="flex items-center justify-center"></DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <h1>Login first</h1>
        </DialogContent>
      )}
    </Dialog>
  );
}
