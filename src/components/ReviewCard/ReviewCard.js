import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import followerIcon from "@/public/icons/follower.svg";
import reportIcon from "@/public/icons/report-icon.svg";
import reviewsIcon from "@/public/icons/reviews.svg";
import varifiedBadgePersional from "@/public/icons/verified-badgey-persional.svg";

import { font14, font16, font18, font18bold } from "@/constant";
import reviewVerifiedIcon from "@/public/icons/reviewverified.svg";
import profileImage from "@/public/images/profile.jpg";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaReply } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

export default function ReviewCard({ review }) {
  const { title, comment, rating, love, like, images } = review;

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
              size={70}
              className="rounded-full ring-1 ring-offset-2"
              alt="profile pic"
            />
          </div>
          <div className="">
            <div className=" flex gap-x-4  justify-between items-start ">
              <h1 className={`${font18bold}    text-justify -mt-1`}>
                {review?.user?.businessProfile?.businessName || fulName}
              </h1>
              <Image src={varifiedBadgePersional} className="w-5 mr-0" />
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
              <Rating value={rating} size={18} />
            </div>

            <div className="w-24 flex -mr-6   items-center gap-2">
              <IconImage
                src={reviewVerifiedIcon}
                alt="verified image"
                size={24}
              />
              <span>verified</span>
            </div>
          </div>

          {/* <p className={`${font14} mr-0 `}>{toLocalTimeString}</p> */}
        </div>
        <div className="space-y-1">
          <h1 className={`${font18}`}>{title}</h1>
          <p className={`${font16} text-gray-500  `}>{comment}</p>
        </div>
        {images && images[0] !== null && (
          <div className="flex gap-4 mt-3">
            {images?.length > 0 &&
              images.map((image, i) => {
                return (
                  <IconImage
                    src={image || ""}
                    size={100}
                    alt="review image"
                    key={i}
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
            <div className="flex gap-1   items-center border py-[2px] px-1 rounded shadow">
              <AiFillLike />
              <span>{like}</span>
            </div>
            <div className="flex gap-1 py-[2px] px-1 items-center border   rounded shadow">
              <FcLike />
              <span>{love}</span>
            </div>
            <div className="flex gap-1   items-center border py-[2px] px-1 rounded shadow">
              <CiShare2 />
              <span>0</span>
            </div>
          </div>
          <div className="flex gap-1 w-8 h-6 items-center text-sm">
            <FaReply className="text-gray-500" />
            <span className="text-sm">Replay</span>
          </div>

          <IconImage src={reportIcon} size={18} />
        </div>
      </CardFooter>
    </Card>
  );
}
