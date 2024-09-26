"use client";
import replayIcon from "@/asserts/Reply.svg";
import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { font14, font16, font18 } from "@/constant";
import { profileImage } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import followerIcon from "@/public/icons/follower.svg";
import replayIcon2 from "@/public/icons/replyreview.svg";
import reportIcon from "@/public/icons/report-icon.svg";
import reviewsIcon from "@/public/icons/reviews.svg";
import reviewVerifiedIcon from "@/public/icons/reviewverified.svg";
import Image from "next/image";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import ReplayReviewComponent from "./ReplayReviewComponent";

export default function ReviewCard({ review }) {
  const [active, setActive] = useState(false);
  const { title, comment, rating, love, like, images, verified } = review;
  const { currentUser } = useAuth();
  const city = review?.user?.addresses.city;
  const country = review?.user?.addresses.country;

  const fulName =
    review?.user?.personalProfile?.firstName +
    " " +
    review?.user?.personalProfile?.lastName;

  // const date = new Date(createdAt);

  // const toLocalTimeString = date.toDateString();
  return (
    <Card className="">
      <CardHeader className="flex">
        <div className="flex gap-4 items-start mb-2">
          <div>
            <IconImage
              src={
                review?.user?.personalProfile?.profileThumb ||
                review?.user?.businessProfile?.profileThumb ||
                profileImage
              }
              size={75}
              className="rounded-full ring-1  "
              alt="profile pic"
            />
          </div>
          <div className="w-full">
            <div className="w-full flex items-start">
              <div className="w-full flex gap-x-4  justify-between items-start ">
                <TitleNameAndVerified
                  title={review?.user?.businessProfile?.businessName || fulName}
                  verified={review?.user?.businessProfile?.verified}
                  personalVerified={review?.user?.personalProfile?.verified}
                />
              </div>
              {/* <p className="w-full text-gray-500 text-sm">
                {moment(new Date(review.createdAt)).fromNow()}
              </p> */}
            </div>

            <p className={`${font14} text-gray-500`}>
              {city}, {country}{" "}
            </p>
            <span className="flex gap-4">
              <div className="flex gap-2 items-center text-[18px]">
                <IconImage src={followerIcon} size={18} />{" "}
                <span className={`${font14}`}>0</span>
              </div>
              <div className="flex gap-2 items-center text-[18px]">
                <IconImage src={reviewsIcon} size={18} />
                <span className={`${font14}`}>0</span>
              </div>
            </span>
          </div>
        </div>
        <hr className=" w-full  " />
      </CardHeader>
      <CardContent className="  mt-6 space-y-2">
        <div className=" grid grid-cols-1 lg:grid-cols-2   gap-x-4  items-center -mt-10 text-sm">
          <div className="flex  gap-4 justify-between items-center">
            <div className="flex gap-1 ">
              <Rating value={Math.floor(rating)} size={18} />
            </div>

            {verified && (
              <div className="w-24 flex -mr-6   items-center gap-2">
                <IconImage
                  src={reviewVerifiedIcon}
                  alt="verified image"
                  size={24}
                />
                <span>verified</span>
              </div>
            )}
          </div>

          {/* <p className={`${font14} mr-0 `}>{toLocalTimeString}</p> */}
        </div>
        <div className="space-y-1">
          <h1 className={`${font18}`}>{title}</h1>
          <p className={`${font16} text-gray-500  `}>{comment}</p>
        </div>
        {images && images[0] !== null && (
          <div className="flex gap-2 mt-3">
            {images?.length > 0 &&
              images.map((image, i) => {
                return (
                  <IconImage
                    src={image || ""}
                    size={60}
                    alt="review image"
                    key={i}
                    className="border rounded-md"
                  />
                );
              })}
          </div>
        )}
        <hr className=" w-full  mt-4 " />
      </CardContent>
      <CardFooter>
        <div className=" w-full  flex justify-between  items-center  ">
          <div className="flex gap-2 md:gap-4  ">
            <div className="flex gap-1   items-center border hover:border-primary_color py-[2px] px-1 rounded hover:shadow-lg">
              <AiFillLike />
              <span>{like}</span>
            </div>
            <div className="flex gap-1 py-[2px] px-1 items-center border hover:border-red-500   rounded  first-line: hover:shadow-lg">
              <FcLike />
              <span>{love}</span>
            </div>
            <div className="flex gap-1   items-center border py-[2px] px-1 hover:border-primary_color rounded   hover:shadow-lg">
              <CiShare2 />
              <span>0</span>
            </div>
          </div>
          {/* replay */}
          {currentUser?.username && (
            <button
              className={`flex gap-1   items-center text-sm  ${
                active ? "border bg-primary_color/10 px-1 rounded-sm" : " "
              }   `}
              onClick={() => setActive(!active)}
            >
              <Image
                src={active ? replayIcon2 : replayIcon}
                className="w-[26px]"
                alt="bordercategoriesIcon"
              />
            </button>
          )}

          <IconImage src={reportIcon} size={24} />
        </div>
      </CardFooter>
      {active && <ReplayReviewComponent review={review} />}
    </Card>
  );
}
