"use client";
import IconImage from "@/components/IconImage/IconImage";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import { Textarea } from "@/components/ui/textarea";
import { font14 } from "@/constant";
import { profileImage } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import replayIcon from "@/public/icons/replyreview.svg";
import { useState } from "react";

export default function ReplayReviewComponent({ review }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [replayReview, setReplayReviw] = useState([]);
  const { currentUser } = useAuth();

  const city = review?.user?.addresses.city;
  const country = review?.user?.addresses.country;

  const fulName =
    review?.user?.personalProfile?.firstName +
    " " +
    review?.user?.personalProfile?.lastName;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    if (content.trim() === "") {
      setError("Please enter a comment");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/api/review-replay", {
        reviewId: review.id,
        content,
        username: currentUser?.username,
      });
      console.log(response);

      setReplayReviw([response?.data?.data]);

      setContent("");
      setLoading(false);
      setError("");
    } catch (error) {
      setError("Failed to reply");
      setLoading(false);
    }
  };
  return (
    <div>
      {" "}
      <>
        <hr className="  w-11/12   mb-1 ml-16   " />
        <div className="  flex flex-col ml-16    bg-primary_color/5 rounded-md ">
          <div className="flex gap-4 items-start mb-2  py-2 px-2 ">
            <div>
              <IconImage
                src={
                  review?.user?.personalProfile?.profileThumb ||
                  review?.user?.businessProfile?.profileThumb ||
                  profileImage
                }
                size={60}
                className="rounded-full ring-1  "
                alt="profile pic"
              />
            </div>
            <div className="">
              <div className=" flex gap-x-4  justify-between items-start ">
                <TitleNameAndVerified
                  title={review?.user?.businessProfile?.businessName || fulName}
                  verified={review?.user?.businessProfile?.verified}
                  personalVerified={review?.user?.personalProfile?.verified}
                />
              </div>

              <p className={`${font14} text-gray-500`}>
                {city}, {country}{" "}
              </p>
            </div>
          </div>
          {/* <IconImage src={replayIcon} size={32} /> */}

          {replayReview.length === 0 && (
            <form className="flex justify-end p-2 " onSubmit={handleSubmit}>
              <Textarea
                className="min-h-14     bg-white"
                placeholder="Write your comment "
                onChange={(e) => setContent(e.target.value)}
              />

              <button
                className="   border rounded-md px-4 py-2 ml-2 flex items-center justify-center"
                type="submit"
              >
                <IconImage src={replayIcon} size={32} />
                {loading ? "submitting..." : <span>Replay</span>}
              </button>
            </form>
          )}

          <p>{replayReview[0]?.content}</p>
        </div>
      </>
    </div>
  );
}
