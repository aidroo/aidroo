"use client";
import IconImage from "@/components/IconImage/IconImage";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import { Textarea } from "@/components/ui/textarea";
import { font14 } from "@/constant";
import { profileImage } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import replayIcon from "@/public/icons/replyreview.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReplyReviewCard from "./ReplyReviewCard";

export default function ReplayReviewComponent({ review, active }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const city = review?.user?.addresses.city;
  const country = review?.user?.addresses.country;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    if (content.trim() === "") {
      setError("Please enter a comment");
      setLoading(false);
      return;
    }
    if (content.length > 250) {
      setError("Reply content cannot exceed 250 characters");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/api/review-replay", {
        reviewId: review.id,
        content,
        username: currentUser?.username,
      });

      setContent("");
      setLoading(false);
      setError("");
      router.refresh(`/business/${review?.profileId}/reviews`);
    } catch (error) {
      setError("Failed to reply");
      setLoading(false);
    }
  };

  const personalVerified =
    currentUser?.profile?.fullName !== "null null" &&
    !currentUser?.profile?.verified
      ? true
      : false;

  return (
    <div className="  flex flex-col ml-16    bg-primary_color/5 rounded-md ">
      {active && currentUser?.username && (
        <>
          <div className="flex gap-4 items-start mb-2  py-2 px-2 ">
            <div>
              <IconImage
                src={currentUser?.profile?.profileThumb || profileImage}
                size={60}
                className="rounded-full ring-1  "
                alt="profile pic"
              />
            </div>
            <div className="">
              <div className=" flex gap-x-4  justify-between items-start ">
                <TitleNameAndVerified
                  title={
                    currentUser?.profile?.businessName ||
                    currentUser?.profile?.fullName
                  }
                  verified={currentUser?.profile?.verified}
                  personalVerified={personalVerified}
                />
              </div>

              <p className={`${font14} text-gray-500`}>
                {city}, {country}{" "}
              </p>
            </div>
          </div>

          <form className="flex justify-end p-2 " onSubmit={handleSubmit}>
            <Textarea
              className="min-h-14     bg-white"
              placeholder="Write your comment "
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              className=" h-12  border border-primary_color rounded-md px-4 py-2 ml-2 flex items-center justify-center"
              type="submit"
            >
              <IconImage src={replayIcon} size={32} />
              {loading ? "submitting..." : <span>Replay</span>}
            </button>
          </form>
        </>
      )}

      {error && <p className="p-2 bg-red-50 text-red-400">{error}</p>}
      {review.replies.length > 0 &&
        review.replies.map((reply) => (
          <ReplyReviewCard key={reply.id} reply={reply} />
        ))}
    </div>
  );
}
