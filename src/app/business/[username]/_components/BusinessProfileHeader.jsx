import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import {
  businessProfilePic,
  unverified_badge,
  verified_badge,
} from "@/exportImage";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

export default function BusinessProfileHeader({
  profile,
  totalReviews,
  averageRating,
}) {
  const { starImage } = profile;

  // Determine rating label based on the rating value
  const ratingLabel =
    averageRating < 3.5 ? "Poor" : averageRating <= 4.5 ? "Good" : "Excellent";

  return (
    <div className="flex gap-8 items-start lg:justify-center col-span-3">
      {/* Profile Image */}

      <div className="w-28 h-28  rounded-md p-1  flex  ">
        <ResponsiveImage
          src={profile?.profileThumb || businessProfilePic}
          size={120}
          className=" rounded-md ring-1 p-1   "
          alt="profile pic"
        />
      </div>

      {/* Profile Details */}
      <div className="flex  flex-col min-h-28  ">
        {/* Business Name and Verification */}
        <div className="flex gap-x-2 items-center">
          {profile?.businessName && (
            <TitleNameAndVerified
              title={profile.businessName}
              verified={profile.verified}
              isShown={true}
            />
          )}
        </div>

        {/* Reviews and Rating */}
        <div className="flex gap-x-2   items-center">
          <p className="text-gray-700">{totalReviews} Reviews</p>
          <GoDotFill className="text-primary_color" />
          <p>{ratingLabel}</p>
        </div>
        <div className="flex gap-x-2   items-center">
          <Rating value={Math.floor(averageRating)} size={22} />
          <p className="text-[18px] text-gray-700 font-semibold">
            {averageRating < 1 ? 0 : averageRating}
          </p>
          {starImage && (
            <Image
              src={starImage}
              alt="Star Rating"
              width={24}
              height={24}
              priority={true}
            />
          )}
        </div>

        {/* Claimed Badge */}
        {profile.verified && (
          <Image src={verified_badge} alt="Claimed" className="w-24  "  priority={true} />
        )}
        {!profile.verified && (
          <Image
            src={unverified_badge}
            alt="Claimed"
            className="w-24  "
            priority={true}
          />
        )}
      </div>
    </div>
  );
}
