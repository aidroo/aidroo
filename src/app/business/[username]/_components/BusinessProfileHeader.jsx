import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import { businessProfilePic, claimedIcon } from "@/exportImage";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";

export default function BusinessProfileHeader({ profile }) {
  const rating = Math.round(profile.rating);
  const { totalReviews, starImage } = profile;

  // Determine rating label based on the rating value
  const ratingLabel =
    rating < 3.5 ? "Poor" : rating <= 4.5 ? "Good" : "Excellent";

  return (
    <header className="flex gap-8 items-start justify-center col-span-3">
      {/* Profile Image */}
      <div className="w-24 md:w-32 shrink-0 overflow-hidden ring-1 rounded-md">
        <ResponsiveImage
          src={profile?.profileThumb || businessProfilePic}
          width={500}
          height={300}
          alt="Profile image"
          className="rounded-lg"
        />
      </div>

      {/* Profile Details */}
      <div>
        {/* Business Name and Verification */}
        <div className="flex gap-2 items-center">
          {profile?.businessName && (
            <TitleNameAndVerified
              title={profile.businessName}
              verified={profile.verified}
            />
          )}
        </div>

        {/* Reviews and Rating */}
        <div className="flex gap-x-2 lg:mt-2 items-center">
          <p className="text-gray-700">{totalReviews} Reviews</p>
          <GoDotFill className="text-primary_color" />
          <p>{ratingLabel}</p>
        </div>
        <div className="flex gap-x-2 lg:mt-2 items-center">
          <Rating value={rating} size={22} />
          <p className="text-[18px] text-gray-700 font-semibold">
            {profile?.rating}
          </p>
          {starImage && (
            <Image src={starImage} alt="Star Rating" width={24} height={24} />
          )}
        </div>

        {/* Claimed Badge */}
        <Image src={claimedIcon} alt="Claimed" className="w-24 lg:mt-2" />
      </div>
    </header>
  );
}
