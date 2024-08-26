import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { businessProfilePic, categoryImage } from "@/exportImage";
import Image from "next/image";
import Link from "next/link";
import { FaRegPaperPlane } from "react-icons/fa";
import BusinessProfileReview from "./BusinessProfileReview";
import Jobs from "./Jobs";

export const works = [1, 2, 3, 4, 5, 6];

export default function BusinessProfileCard({ businessProfile, id }) {
  const {
    businessName = "",
    rating = 5,
    verified = false,
    profileThumb = "",
    category,
    totalReviews,
  } = businessProfile.businessProfile;
  const { country = "", city = "" } = businessProfile.addresses;

  let averageRating = Math.round(rating);
  return (
    <Card className="mb-4 hover:zoom-in-105   ">
      <CardContent className="flex gap-4 items-start  p-2   ">
        {/* image */}
        <div className=" rounded-md ring-1 p-1">
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
            <Link href={`/business/${id}`}>
              {businessName && (
                <TitleNameAndVerified
                  title={businessName}
                  verified={verified}
                />
              )}
            </Link>
          </div>

          <p className="  text-gray-700 text-[14px]  ">
            {totalReviews || 0} Reviews{" "}
          </p>
          {/*rating */}
          <div className="flex gap-x-4  items-center  space-y-2 md:space-y-0 ">
            <div className="flex gap-1 ">
              <Rating value={averageRating} size={18} />
            </div>
            <h1 className="text-gray-600   ">
              <span>{rating} </span>
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

      <CardFooter className="flex justify-between  items-center  border-t pt-2 flex-wrap  sm:px-2     ">
        <div className="flex gap-2 items-center ">
          <Image src={categoryImage} className="w-5" />
          <h1 className="text-sm">{category}</h1>
        </div>

        <Jobs />
        <BusinessProfileReview />
      </CardFooter>
    </Card>
  );
}
