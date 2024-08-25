"use client";
import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { font14, font18bold } from "@/constant";
import { businessProfilePic, claimedIcon, verifiedIcon } from "@/exportImage";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { HiOutlineShare } from "react-icons/hi";
import { LiaSmsSolid } from "react-icons/lia";

export default function BusinessProfileHeader({ data }) {
  const rating = Math.round(data.rating);

  return (
    <div className="w-full bg-[#f5fafc] dark:bg-dark">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid w-full grid-cols-1 lg:grid-cols-5   gap-4 py-8  px-10">
          <div className="flex gap-8  items-start justify-center  col-span-3 ">
            <div className="w-24 md:w-32 shrink-0 overflow-hidden ring-1 rounded-md">
              <ResponsiveImage
                src={data?.profileThumb || businessProfilePic}
                width={500}
                height={300}
                alt="profile image"
                className="rounded-lg"
              />
            </div>
            <div>
              <div className=" flex gap-x-4  justify-between items-start ">
                <h1 className={`${font18bold}    text-justify -mt-1`}>
                  {data?.businessName}
                </h1>
                {!data?.verified && (
                  <Image src={verifiedIcon} className="w-5" alt="Verified" />
                )}
              </div>
              <div className="flex gap-4 items-center">
                <h1 className={` w-full ${font18bold}  text-wrap`}></h1>
              </div>

              <div className="flex gap-x-2 lg:mt-2 items-center">
                <p className="  text-gray-700  ">
                  {data?.totalReviews} Reviews{" "}
                </p>
                <GoDotFill className="text-primary_color" />
                {data?.rating < 3.5 && <p>Poor</p>}
                {data?.rating > 3.5 && data.rating > 4.5 && <p>Good</p>}
                {data?.rating > 5 && <p>Excellent</p>}
              </div>
              <div className="flex gap-x-2 lg:mt-2 items-center">
                <Rating value={rating} size={22} />
                <p className="text-[18px] text-gray-700 font-semibold">
                  {data?.rating}
                </p>
              </div>

              <Image src={claimedIcon} alt="Claimed" className="w-24 lg:mt-2" />
            </div>
          </div>

          <div className="lg:border-s border-primary_color items-center justify-center flex gap-2 lg:gap-4    col-span-2">
            <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
              <LiaSmsSolid className="text-sm md:text-xl" />
              <span className={font14}>Chat</span>
            </div>
            <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
              <FaPlus className="text-sm" />
              <span className={font14}>Follow</span>
            </div>
            <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
              <HiOutlineShare className="text-sm md:text-xl" />
              <span className={font14}>Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
