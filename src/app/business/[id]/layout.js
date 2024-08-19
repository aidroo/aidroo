"use client";

import BusinessProfileSidebar from "@/components/BusinessProfileSidebar";
import Error from "@/components/Error";
import Layout from "@/components/Layout/Layout";
import Loading from "@/components/Loading";
import Notfound from "@/components/Notfound";
import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { font14, font18bold } from "@/constant";
import { businessProfilePic, claimedIcon, verifiedIcon } from "@/exportImage";
import apiService from "@/lib/apiService";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import { FaPlus, FaRegStar } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { IoIosArrowDropright } from "react-icons/io";
import { LiaSmsSolid } from "react-icons/lia";
import { VscBriefcase } from "react-icons/vsc";
import useSWR from "swr";

export default function BusinessProfileLayout({ children }) {
  const pathname = usePathname();
  const { id } = useParams();

  // Fetch business profile data using SWR
  const { data, error, isLoading } = useSWR(`/api/business/${id}`, (url) =>
    apiService.singeDataFetching(url)
  );

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (error) {
    return <Error error={error.message} />;
  }

  // Handle not found state
  if (!data?.data) {
    return <Notfound />;
  }

  if (data?.status !== 201) {
    return <Error error={data.message} />;
  }

  return (
    <Layout>
      <div className="w-full space-y-6 pb-14">
        {/* Business profile header section */}
        <div className="w-full bg-slate-300 rounded-md dark:bg-dark">
          <div className="max-w-[1280px] mx-auto pb-10">
            {/* Profile banner */}
            <div className="w-full bg-[#f5fafc] dark:bg-dark">
              <div className="max-w-[1280px] mx-auto">
                <div className="grid w-full lg:w-2/3 mx-auto grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 py-8">
                  {/* Profile picture and details */}
                  <div className="flex gap-8 px-8 items-center justify-center">
                    <div className="w-24 md:w-32 shrink-0 overflow-hidden ring-1 rounded-md">
                      <ResponsiveImage
                        src={
                          data?.data?.businessProfile?.profileThumb ||
                          businessProfilePic
                        }
                        width={500}
                        height={300}
                        alt="profile image"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex gap-4 items-center">
                        <h1 className={font18bold}>
                          {data?.data?.businessProfile?.businessName}
                        </h1>
                        {data?.data?.businessProfile?.verified && (
                          <Image
                            src={verifiedIcon}
                            className="w-5"
                            alt="Verified"
                          />
                        )}
                      </div>
                      <div className="flex gap-6 items-center">
                        <ul className="flex items-center gap-2">
                          <li className="bg-primary w-2 h-2 rounded-full border" />
                          <li className={font14}>Excellent</li>
                        </ul>
                      </div>
                      <div className="flex gap-x-2 mt-2">
                        <Rating
                          value={data?.data?.businessProfile?.rating}
                          size={22}
                        />
                        <p className="text-[18px] text-gray-700 font-semibold">
                          {data?.data?.businessProfile?.rating}
                        </p>
                      </div>
                      <Image
                        src={claimedIcon}
                        alt="Claimed"
                        className="w-24 mt-2"
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="lg:border-s border-primary items-center justify-center flex gap-2 lg:gap-4 px-8">
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

            {/* Navbar and sidebar section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-10 bg-slate-50 p-10 rounded-md mb-4">
              {/* Main content */}
              <div className="col-span-5">
                {/* Navbar */}
                <div className="grid grid-cols-3 gap-4 border items-center mb-10 rounded-md p-2">
                  <Link
                    href={`/business/${id}/reviews`}
                    className={`flex gap-2 justify-center h-10 items-center rounded-md ${
                      pathname === `/business/${id}/reviews`
                        ? "bg-primary_color text-white"
                        : ""
                    }`}
                  >
                    <FaRegStar className="text-[22px]" />
                    <span>Reviews</span>
                  </Link>
                  <Link
                    href={`/business/${id}/jobs`}
                    className={`flex gap-2 justify-center h-10 items-center rounded-md ${
                      pathname === `/business/${id}/jobs`
                        ? "bg-primary_color text-white"
                        : ""
                    }`}
                  >
                    <VscBriefcase className="text-2xl" />
                    <span>Jobs</span>
                  </Link>
                  <Link
                    href={`/business/${id}/more`}
                    className={`flex gap-2 justify-center h-10 items-center rounded-md ${
                      pathname === `/business/${id}/more`
                        ? "bg-primary_color text-white"
                        : ""
                    }`}
                  >
                    <IoIosArrowDropright className="text-2xl" />
                    <span>More</span>
                  </Link>
                </div>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>

              {/* Sidebar */}
              <BusinessProfileSidebar data={data?.data} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
