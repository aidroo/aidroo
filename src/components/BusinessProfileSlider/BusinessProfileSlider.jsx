import { brifcaseIcon, businessProfilePic, myReview } from "@/exportImage";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import Image from "next/image";
import Link from "next/link";
import { FaRegPaperPlane } from "react-icons/fa";
import Rating from "../Rating/Rating";
import TitleNameAndVerified from "../TitleNameAndVerified";
import { Card, CardContent } from "../ui/card";

const BusinessProfileSlider = async ( ) => {
  

 

  const { businessProfiles } =
    await fetchProfiles({});

  return (
    <div className="flex flex-col overflow-hidden max-w-7xl mx-auto py-24">
      <h1 className="text-center text-sm lg:text-2xl gap-2 font-thin flex items-center justify-center">
        Recent Reviews business profiles
      </h1>
      <div className="overflow-hidden mx-20 md:mx-0 group mt-14 relative">
        <div className="flex animate-loop-scroll space-x-4 px-2 group-hover:paused">
          {/* Original set of images */}
          {businessProfiles.map((businessProfile, index) => {
            const {
              businessName = "",

              verified = false,
              profileThumb = "",
              category = "",
            } = businessProfile.businessProfile;

            let averageRating = Math.floor(businessProfile.averageRating);
            return (
              <Card
                className=" cursor-pointer p-4  pb-0   hover:shadow-xl transform   transition duration-500 "
                key={index}
              >
                <Link href={`/business/reviews/${businessProfile?.username}`}>
                  <CardContent className=" min-w-64 px-0   ">
                    {/* image */}
                    <div className=" w-full flex gap-4 items-start  ">
                      <div className="rounded-md ring-1 p-2 w-16 h-16 overflow-hidden">
                        <Image
                          src={profileThumb || businessProfilePic}
                          alt="profile pic"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                      {/* details */}
                      <div className="flex flex-col gap-1 -mt-1 ">
                        {businessName && (
                          <TitleNameAndVerified
                            title={businessName}
                            verified={verified}
                          />
                        )}

                        {/*rating */}
                        <div className="flex gap-x-2  items-center  space-y-2 md:space-y-0 ">
                          <div className="flex gap-1 ">
                            <Rating value={averageRating} size={18} />
                          </div>
                          <h1 className="text-gray-600   ">
                            <span>{businessProfile?.averageRating} </span>
                          </h1>
                          <p className="text-sm">
                            {" "}
                            ({businessProfile?.totalReviews || 0})
                          </p>
                        </div>

                        {/*  adderess   */}
                        <div className="flex gap-1 items-start flex-wrap text-sm -mt-1  text-gray-600 ">
                          <FaRegPaperPlane size={12} className="mt-[4px]" />
                          <span>{businessProfile?.addresses?.country}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <hr className="-mt-2" />
                  <div className=" p-0 flex items-center  my-[2px]   justify-between h-8 ">
                    <div className="flex gap-2 items-center cursor-pointer text-primary_color  ">
                      <Image
                        src={myReview}
                        className="w-4"
                        alt="bordercategoriesIcon"
                        priority={true}
                      />
                      <Link
                        href={`/business/reviews/${businessProfile?.username}`}
                        className="text-sm"
                      >
                        Reviews
                      </Link>
                    </div>
                   {category&& <div className="flex gap-2 items-center cursor-pointer text-primary_color   ">
                      <Image
                        src={brifcaseIcon}
                        className="w-8"
                        alt="bordercategoriesIcon"
                        priority={true}
                      />
                      {category}
                    </div>}
                  </div>
                </Link>
              </Card>
            );
          })}
          {/* Duplicate set of images */}
          {businessProfiles.map((businessProfile, index) => {
            const {
              businessName = "",

              verified = false,
              profileThumb = "",
             category = ""
            } = businessProfile.businessProfile;

            let averageRating = Math.floor(businessProfile.averageRating);
            return (
              <Card
                className=" cursor-pointer p-4  pb-0   hover:shadow-xl transform   transition duration-500 "
                key={index}
              >
                <Link href={`/business/reviews/${businessProfile?.username}`}>
                  <CardContent className=" min-w-64 px-0   ">
                    {/* image */}
                    <div className=" w-full flex gap-4 items-start  ">
                      <div className="rounded-md ring-1 p-2 w-16 h-16 overflow-hidden">
                        <Image
                          src={profileThumb || businessProfilePic}
                          alt="profile pic"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                      {/* details */}
                      <div className="flex flex-col gap-1 -mt-1 ">
                        {businessName && (
                          <TitleNameAndVerified
                            title={businessName}
                            verified={verified}
                          />
                        )}

                        {/*rating */}
                        <div className="flex gap-x-2  items-center  space-y-2 md:space-y-0 ">
                          <div className="flex gap-1 ">
                            <Rating value={averageRating} size={18} />
                          </div>
                          <h1 className="text-gray-600   ">
                            <span>{businessProfile?.averageRating} </span>
                          </h1>
                          <p className="text-sm">
                            {" "}
                            ({businessProfile?.totalReviews || 0})
                          </p>
                        </div>

                        {/*  adderess   */}
                        <div className="flex gap-1 items-start flex-wrap text-sm -mt-1  text-gray-600 ">
                          <FaRegPaperPlane size={12} className="mt-[4px]" />
                          <span>{businessProfile?.addresses?.country}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <hr className="-mt-2" />
                  <div className=" p-0 flex items-center     justify-between h-8 ">
                    <div className="flex gap-2 items-center cursor-pointer text-primary_color  ">
                      <Image
                        src={myReview}
                        className="w-4"
                        alt="bordercategoriesIcon"
                        priority={true}
                      />
                      <Link
                        href={`/business/reviews/${businessProfile?.username}`}
                        className="text-sm"
                      >
                        Reviews
                      </Link>
                    </div>
                    {category && (
                      <div className="flex gap-2 items-center cursor-pointer text-primary_color   ">
                        <Image
                          src={brifcaseIcon}
                          className="w-8"
                          alt="bordercategoriesIcon"
                          priority={true}
                        />
                        {category}
                      </div>
                    )}
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileSlider;
