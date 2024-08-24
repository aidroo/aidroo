/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { font16, font18 } from "@/constant";
import {
  addyourbusiness,
  claimWithBusiness,
  logo,
  messageIcon,
  myorder,
  myprofile,
  myReview,
  notificationIcon,
  pricingPlan,
  singoutIcon,
  user,
  userdashboard,
  verifiedIcon,
  whitesearch,
} from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IconImage from "./IconImage/IconImage";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function DesktopMenu() {
  const [setSearchText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className=" h-[72px] place-content-center hidden lg:block">
      <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  h-11  items-center justify-center max-w-[1260px] mx-auto    ">
        {/* logo */}
        <div className=" col-span-1   ">
          <Link href="/">
            <Image
              src={logo}
              alt="aidroo logo image"
              width={500}
              height={300}
              className="h-11"
            />
          </Link>
        </div>

        {/* searching bar */}
        <div className="flex   items-center  col-span-2  text-lg text-gray-700 ms-12  ">
          <form className="flex gap-2">
            <Input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-white dark:bg-dark h-10 max-w-72 w-[280px]"
              onChange={(e) => handleInputChange(e)}
            />

            <div className="relative">
              {/* <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10">
              <Image src={filter} alt="Icon 1" className="w-6" />
            </div> */}
              {/* {isHovered2 && (
            <div className="absolute  shadow rounded-md    top-[42px] pt-4 -right-6 ">
              <div className=" file:selection: z-50  border-2 rounded   p-8 ">
                <input type="checkbox" />
                <Button variant="hoverButton">submit</Button>
              </div>
            </div>
          )} */}
            </div>
            <div className=" flex items-center justify-center  bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10">
              <Image src={whitesearch} alt="Icon 1" className="w-6 " />
            </div>
          </form>
        </div>

        <div className="col-span-2  mr-24 flex justify-end items-center gap-4   ">
          <button
            href="#_"
            class=" rounded px-5  h-10 overflow-hidden group bg-[#1E56AD] relative hover:bg-gradient-to-r hover:from-primary_color hover:to-primary_color text-white hover:ring-1 hover:ring-offset-2 hover:ring-white transition-all ease-out duration-300"
          >
            <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping  inline-flex absolute    h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="relative">Explore Job</span>
          </button>
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
                        <span className={`${font16} text-gray-700`}>
                          Claim Business
                        </span>
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
                    <Link href="/">
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
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  width={24}
                >
                  <style type="text/css">{`.st0{fill:#FFFFFF;}`}</style>
                  <g>
                    <path
                      className="st0"
                      d="M107.5,57.9h296.4c16,0,29,13,29,29v48.3c0,4.8-3.9,8.7-8.7,8.7H414c-4.8,0-8.7-3.9-8.7-8.7V93.5
            c0-4.5-3.6-8.1-8.1-8.1H114.2c-4.5,0-8.1,3.6-8.1,8.1v324c0,4.5,3.6,8.1,8.1,8.1h283.1c4.5,0,8.1-3.6,8.1-8.1v-41.6
            c0-4.8,3.9-8.7,8.7-8.7h10.2c4.8,0,8.7,3.9,8.7,8.7v48.3c0,16-13,29-29,29H107.5c-16,0-29-13-29-29V86.9
            C78.5,70.9,91.5,57.9,107.5,57.9z"
                    />
                    <path
                      className="st0"
                      d="M432.9,265.5v-16c0-4.8-3.9-8.7-8.7-8.7H276.6v-77.6l-92.2,92.2l92.2,92.2v-73.5h147.6
            C429,274.2,432.9,270.3,432.9,265.5z"
                    />
                  </g>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white -all duration-300 transform group-hover:translate-x-full ease">
                Login
              </span>
              <span className="relative invisible text-sm">Login</span>
            </Link>
          ) : (
            <>
              <div className="hover:bg-[#1e56ad]   rounded-sm cursor-pointer">
                <IconImage
                  src={messageIcon}
                  size={32}
                  alt="message icon"
                  className="hover:bg-[#1e56ad]   rounded-sm cursor-pointer"
                />
              </div>
              <div className="hover:bg-[#1e56ad]   rounded-sm cursor-pointer">
                <IconImage
                  src={notificationIcon}
                  size={28}
                  alt="message icon"
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
                    <div className="text-white flex gap-4   ">
                      <div>
                        <h1 className={`${font18}`}>
                          {currentUser?.profile?.businessName ||
                            currentUser?.profile?.fullName}
                        </h1>
                        <p className="text-sm">@{currentUser?.username}</p>
                      </div>

                      <IconImage src={verifiedIcon} size={28} />
                      {/* <IconImage src={ver} /> */}
                    </div>

                    {/* <Avatar>
                    <AvatarImage src={profilePic} alt="@shadcn" />
                    <AvatarFallback>
                      <IconImage src={user} />
                    </AvatarFallback>
                  </Avatar> */}
                  </div>
                  {currentUser.role === "business" ? (
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
                        <Link href="/business_dashboard/business_info">
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
                  ) : (
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
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
