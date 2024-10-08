/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import messageIconjson from "@/asserts/jsonfile/messageicon4.json";
import f from "@/asserts/jsonfile/notificationnew.json";
import { font16, font18 } from "@/constant";

import {
  addyourbusiness,
  claimWithBusiness,
  loginIcon,
  logo,
  myorder,
  myprofile,
  myReview,
  pricingPlan,
  singoutIcon,
  unclaimed,
  user,
  userdashboard,
  verifiedIcon,
} from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DynamicSearchInput from "./DynamicSearchInput";
import IconImage from "./IconImage/IconImage";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function DesktopMenu() {
  const [isHovered, setIsHovered] = useState(false);

  const { currentUser, logout } = useAuth();

  return (
    <div className=" h-[72px] place-content-center hidden lg:block zindex ">
      <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  h-11  items-start justify-center max-w-[1260px] mx-auto    ">
        {/* logo */}
        <div className=" col-span-1   ">
          <Link href="/">
            <Image
              src={logo}
              alt="aidroo logo image"
              width={500}
              height={300}
              className="h-10"
            />
          </Link>
        </div>

        {/* searching bar */}
        <div className="flex   items-start col-span-2  text-lg text-gray-700 ms-12  ">
          <DynamicSearchInput
          // title={title}
          // verified={verified}sr
          // baseUrl=""
          // searchQuery={searchQuery}
          />
        </div>

        <div className="col-span-2  mr-24 flex justify-end items-center gap-4   ">
          <Link
            href="/explore-jobs"
            className=" rounded px-5 flex items-center  h-10  group bg-[#1E56AD] relative hover:bg-gradient-to-r hover:from-primary_color hover:to-primary_color text-white hover:ring-1 hover:ring-offset-1 hover:ring-white transition-all ease-out duration-300"
          >
            <span className="absolute -top-2 -right-1  flex h-3 w-3">
              <span className="animate-ping  inline-flex absolute    h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="relative">Explore Job</span>
          </Link>
          {/* <div className="px-4  py-2   relative rounded group  font-medium bg-[#1E56AD] text-white inline-block">
            <div className="absolute -top-2 -right-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </div>

            
          </div> */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-11 p-[2px]">
              <button
                href="#"
                className="px-4  py-2   relative rounded group overflow-hidden font-medium bg-[#1E56AD] text-white inline-block"
              >
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-primary_color group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white ">
                  For Business
                </span>
              </button>

              {isHovered && (
                <div className="absolute    -left-8 top-8 pt-4  w-[230px] ">
                  <ul className=" z-50 shadow rounded-md    p-4 bg-white flex flex-col gap-4 mt-3">
                    <Link href="/">
                      <span className="flex items-center gap-6  border-b pb-2 ">
                        {/* <Lottie
                          animationData={f}
                          autoPlay={false} // Do not autoplay, control via ref
                          // Control loop based on prop
                        /> */}
                        <IconImage
                          src={addyourbusiness}
                          size={27}
                          alt="notification icon"
                        />
                        <Link
                          href="/signup/business"
                          className={`${font16} text-gray-700`}
                        >
                          Add Business
                        </Link>
                      </span>
                    </Link>
                    <Link href="/">
                      <span className="flex items-center gap-6  border-b pb-2 ">
                        <IconImage
                          src={claimWithBusiness}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href="/claim">
                          <span className={`${font16} text-gray-700`}>
                            Claim Business
                          </span>
                        </Link>
                      </span>
                    </Link>
                    <Link href="/">
                      <span className="flex items-center gap-6  border-b pb-2 ">
                        <IconImage
                          src={myReview}
                          size={27}
                          alt="notification icon"
                        />
                        <span className={`${font16} text-gray-700`}>
                          Request Review
                        </span>
                      </span>
                    </Link>
                    <Link href="/claim/pricing_plan">
                      <span className="flex items-center gap-6  pb-2 ">
                        <IconImage
                          src={pricingPlan}
                          size={27}
                          alt="notification icon"
                        />
                        <span className={`${font16} text-gray-700`}>
                          Pricing Plan
                        </span>
                      </span>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8 col-span-1/2 items-center   ">
          {!currentUser ? (
            <Link
              href="/login"
              className="relative inline-flex items-center justify-center h-10 px-4   overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-primary_color rounded-sm  shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary_color  group-hover:translate-x-0 ease">
                <Image
                  src={loginIcon}
                  className="w-7"
                  alt="bordercategoriesIcon"
                />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white -all duration-300 transform group-hover:translate-x-full ease">
                Login
              </span>
              <span className="relative invisible text-sm">Login</span>
            </Link>
          ) : (
            <>
              <div className="hover:bg-[#1e56ad] w-11   rounded-sm cursor-pointer">
                <Lottie
                  animationData={messageIconjson}
                  autoPlay={false} // Do not autoplay, control via ref
                  // Control loop based on prop
                  className="w-full"
                />
              </div>
              <div className="hover:bg-[#1e56ad]   rounded-sm cursor-pointer w-12 p-1">
                <Lottie
                  animationData={f}
                  autoPlay={false} // Do not autoplay, control via ref
                  // Control loop based on prop
                />
              </div>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage
                      src={currentUser?.profile.profileThumb}
                      alt="profile pic"
                    />
                    <AvatarFallback>
                      <IconImage src={user} />
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className=" mt-3 min-w-52 ">
                  <div className="bg-[#002A64] p-4 flex items-center gap-4 rounded-t-md ">
                    {/* <TitleNameAndVerified
                      title={""}
                      verified={currentUser.ve}
                      isShown={false}
                      personalVerified={false}
                    /> */}
                    <div className="text-white flex gap-4   ">
                      <div>
                        <h1 className={`${font18}`}>
                          {currentUser?.profile?.businessName ||
                            currentUser?.profile?.fullName}
                        </h1>
                        <p className="text-sm">@{currentUser?.username}</p>
                      </div>

                      {currentUser.verified && (
                        <IconImage src={verifiedIcon} size={28} />
                      )}
                      {!currentUser.verified && (
                        <IconImage src={unclaimed} size={20} className="mt-1" />
                      )}
                      {/* <IconImage src={ver} /> */}
                    </div>

                    {/* <Avatar>
                    <AvatarImage src={profilePic} alt="@shadcn" />
                    <AvatarFallback>
                      <IconImage src={user} />
                    </AvatarFallback>
                  </Avatar> */}
                  </div>
                  {currentUser.role === "admin" && (
                    <div className="flex flex-col     space-y-3 p-4 ">
                      <span className="flex items-center gap-6  border-b pb-2  ">
                        <IconImage
                          src={myprofile}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href="#">
                          <span
                            className={`${font16} text-gray-700 hover:text-primary_color`}
                          >
                            My Profile
                          </span>
                        </Link>
                      </span>

                      <span className="flex items-center gap-6 border-b pb-2    ">
                        <IconImage
                          src={myorder}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href="#">
                          <span className={`${font16} text-gray-600  `}>
                            My Order
                          </span>
                        </Link>
                      </span>
                      <span className="flex items-center gap-6 border-b pb-2   ">
                        <IconImage
                          src={userdashboard}
                          size={27}
                          alt="notification icon"
                        />
                        {
                          <Link href="/admin_dashboard">
                            <span
                              className={`${font16} text-gray-700 hover:text-primary_color`}
                            >
                              Dashboard
                            </span>
                          </Link>
                        }
                      </span>
                      <div onClick={logout}>
                        <div className="flex items-center gap-6 cursor-pointer     ">
                          <IconImage
                            src={singoutIcon}
                            size={27}
                            alt="notification icon"
                          />
                          <span className={`${font16} text-gray-700`}>
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentUser.role === "personal" && (
                    <div className="flex flex-col     space-y-3 p-4 ">
                      <span className="flex items-center gap-6  border-b pb-2  ">
                        <IconImage
                          src={myprofile}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href={`/personal_dashboard/personal_info`}>
                          <span
                            className={`${font16} text-gray-700 hover:text-primary_color`}
                          >
                            My Profile
                          </span>
                        </Link>
                      </span>

                      <span className="flex items-center gap-6 border-b pb-2    ">
                        <IconImage
                          src={myorder}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href="#">
                          <span className={`${font16} text-gray-600  `}>
                            My Order
                          </span>
                        </Link>
                      </span>
                      <span className="flex items-center gap-6 border-b pb-2   ">
                        <IconImage
                          src={userdashboard}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href="/personal_dashboard/personal_info">
                          <span
                            className={`${font16} text-gray-700 hover:text-primary_color`}
                          >
                            Dashboard
                          </span>
                        </Link>
                      </span>
                      <div onClick={logout}>
                        <div className="flex items-center gap-6 cursor-pointer     ">
                          <IconImage
                            src={singoutIcon}
                            size={27}
                            alt="notification icon"
                          />
                          <span className={`${font16} text-gray-700`}>
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {currentUser.role === "business" && (
                    <div className="flex flex-col     space-y-3 p-4 ">
                      <span className="flex items-center gap-6  border-b pb-2  ">
                        <IconImage
                          src={myprofile}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href={`/business/${currentUser.username}`}>
                          <span
                            className={`${font16} text-gray-700 hover:text-primary_color`}
                          >
                            My Profile
                          </span>
                        </Link>
                      </span>

                      <span className="flex items-center gap-6 border-b pb-2    ">
                        <IconImage
                          src={myorder}
                          size={27}
                          alt="notification icon"
                        />
                        <Link href="#">
                          <span className={`${font16} text-gray-600  `}>
                            My Order
                          </span>
                        </Link>
                      </span>
                      <span className="flex items-center gap-6 border-b pb-2   ">
                        <IconImage
                          src={userdashboard}
                          size={27}
                          alt="notification icon"
                        />
                        {
                          <Link href={`/business_dashboard/business_info?username=${currentUser?.username}`}>
                            <span
                              className={`${font16} text-gray-700 hover:text-primary_color`}
                            >
                              Dashboard
                            </span>
                          </Link>
                        }
                      </span>
                      <div onClick={logout}>
                        <div className="flex items-center gap-6 cursor-pointer     ">
                          <IconImage
                            src={singoutIcon}
                            size={27}
                            alt="notification icon"
                          />
                          <span className={`${font16} text-gray-700`}>
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
