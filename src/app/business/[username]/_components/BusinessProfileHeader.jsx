import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import {
  businessProfilePic,
  unverified_badge,
  verified_badge,
} from "@/exportImage";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

export default function BusinessProfileHeader({ profile }) {
  const rating = Math.floor(profile.rating);
  const { totalReviews, starImage } = profile;

  // Determine rating label based on the rating value
  const ratingLabel =
    rating < 3.5 ? "Poor" : rating <= 4.5 ? "Good" : "Excellent";

  return (
    <div className="flex gap-8 items-start justify-center col-span-3">
      {/* Profile Image */}
      <IconImage
        src={profile?.profileThumb || businessProfilePic}
        size={120}
        className=" rounded-md ring-1 p-1   "
        alt="profile pic"
      />

      {/* Profile Details */}
      <div className="flex  flex-col ">
        {/* Business Name and Verification */}
        <div className="flex gap-2 items-center">
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
          <Rating value={rating} size={22} />
          <p className="text-[18px] text-gray-700 font-semibold">
            {profile?.rating}
          </p>
          {starImage && (
            <Image src={starImage} alt="Star Rating" width={24} height={24} />
          )}
        </div>

        {/* Claimed Badge */}
        {profile.verified && (
          <Image src={verified_badge} alt="Claimed" className="w-24  " />
        )}
        {!profile.verified && (
          <Image src={unverified_badge} alt="Claimed" className="w-24  " />
        )}
      </div>
    </div>
  );
}
