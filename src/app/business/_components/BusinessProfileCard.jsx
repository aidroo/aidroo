import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import { Card, CardContent } from "@/components/ui/card";
import {
  brifcaseIcon,
  businessProfilePic,
  categoryImage,
  myReview,
} from "@/exportImage";
import Image from "next/image";
import Link from "next/link";
import { FaRegPaperPlane } from "react-icons/fa";

export const works = [1, 2, 3, 4, 5, 6];

export default function BusinessProfileCard({ businessProfile, id }) {
  const {
    businessName = "",

    verified = false,
    profileThumb = "",
    category,
  } = businessProfile.businessProfile;
  const { country = "", city = "" } = businessProfile.addresses;

  let averageRating = Math.round(businessProfile.averageRating);
  return (
    <Card className="mb-10 cursor-pointer    hover:shadow-xl transform   transition duration-500 ">
      <Link href={`/business/${id}`}>
        <CardContent className="flex gap-4 items-start  p-3   ">
          {/* image */}
          <div className=" rounded-md ring-1 p-2">
            <IconImage
              src={profileThumb || businessProfilePic}
              alt="profile pic"
              size={90}
              className="rounded-sm"
            />
          </div>
          {/* details */}
          <div className="flex flex-col lg:space-y-1 -mt-2 ">
            <div className="flex gap-2 items-center">
              {businessName && (
                <TitleNameAndVerified
                  title={businessName}
                  verified={verified}
                />
              )}
            </div>

            <p className="  text-gray-700 text-[14px]  ">
              {businessProfile?.totalReviews || 0} Reviews{" "}
            </p>
            {/*rating */}
            <div className="flex gap-x-4  items-center  space-y-2 md:space-y-0 ">
              <div className="flex gap-1 ">
                <Rating value={averageRating} size={18} />
              </div>
              <h1 className="text-gray-600   ">
                <span>{businessProfile?.averageRating} </span>
              </h1>
            </div>
            <div className="flex gap-2 items-center  text-gray-600">
              <FaRegPaperPlane className="text-[14px]" />
              <h1 className="text-sm  ">
                {city} , {country}
              </h1>
            </div>
            {/* 
      category
      */}
          </div>
        </CardContent>
      </Link>
      <div className="flex justify-between  items-center  border-t   lg:px-4  flex-wrap py-2  px-2     ">
        <div className="flex gap-2 items-center ">
          <Image src={categoryImage} className="w-5" />
          <h1 className="text-sm">{category}</h1>
        </div>
        <div className="flex gap-2 items-center cursor-pointer text-primary_color ">
          <Image src={brifcaseIcon} className="w-6" />
          <h1 className="text-sm">Job feed</h1>
        </div>
        <div className="flex gap-2 items-center cursor-pointer text-primary_color   ">
          <Image src={myReview} className="w-5" />
          <h1 className="text-sm">Review</h1>
        </div>
        {/* <Jobs />
        <BusinessProfileReview /> */}
      </div>
    </Card>
  );
}
