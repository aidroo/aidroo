/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import filter from "@/asserts/filter.svg";
import category from "@/asserts/mobile-icons/categories.svg";
import pageIcon from "@/asserts/mobile-icons/page_icon.svg";
import businessIcon from "@/asserts/mobile-icons/pricing-plan.svg";
import helpIcon from "@/asserts/mobile-icons/support.svg";
import whitesearch from "@/public/icons/whitesearch.svg";
import profilePic from "@/public/images/profile.jpg";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth.js";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { font16 } from "@/constant";
import {
  addyourbusiness,
  brifcaseIcon,
  claimWithBusiness,
  logo,
  myReview,
  pricingPlan,
  user,
  verifiedIcon,
} from "@/exportImage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IoMenu } from "react-icons/io5";
import Heading from "../Heading";
import IconImage from "../IconImage/IconImage";
import LogOutSvg from "../logoutIcon/LogOutSvg";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
export default function Header() {
  const [setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [humberOpen, setHumberOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const { currentUser, logout } = useAuth();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  return (
    <div className="w-full sticky top-0 z-20 bg-[#002A64] ">
      <div className="max-w-7xl mx-auto  ">
        {/* desktop view */}
        {!isDesktop ? (
          <div className=" w-full  block   bg-[#002A64]    space-y-4  z-50">
            {/* sidebar */}

            <Sheet onOpenChange={() => setHumberOpen(!humberOpen)}>
              <div className="flex   justify-between  h-24 items-center text-lg   max-h-[72px] ">
                <div className=" w-24 ">
                  <Link href="/">
                    <ResponsiveImage
                      src={logo}
                      alt="aidroo logo image"
                      width={500}
                      height={300}
                    />
                  </Link>
                </div>

                <div className="flex gap-4 items-center  ">
                  <div
                    onClick={() => setOpen(!open)}
                    className=" w-9 h-9 rounded-md border-gray-500   flex justify-center items-center   bg-primary_color"
                  >
                    {!open ? (
                      <Image src={whitesearch} className="w-5" alt="image" />
                    ) : (
                      <IoClose className="text-white text-3xl transition ease transform duration-300" />
                    )}
                  </div>

                  <SheetTrigger asChild>
                    <div>
                      <div className="border w-9 h-9 rounded-md border-gray-500 relative  flex justify-center items-center  transition-all duration-500 ">
                        {!humberOpen ? (
                          <IoMenu className="text-primary_color text-3xl" />
                        ) : (
                          <IoClose
                            className={`text-primary_color text-2xl ${
                              open ? "opacity-0  " : " rotate-180 opacity-100  "
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </SheetTrigger>
                </div>
              </div>
              <div
                className={`absolute top-[48px] w-full transition-all duration-500 bg-[#002A64] p-4 ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8 pointer-events-none "
                }`}
              >
                <form className="flex gap-4 justify-center  h-10">
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search"
                    className="bg-white dark:bg-dark  max-w-80  "
                    onChange={(e) => handleInputChange(e)}
                  />

                  <div className="relative flex gap-4">
                    <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-10 md:w-[42px]    ">
                      <Image src={filter} alt="Icon 1" className="w-5" />
                    </div>
                    <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-10 md:w-[42px] ">
                      <Image src={whitesearch} alt="Icon 1" className="w-5" />
                    </div>
                  </div>
                </form>
              </div>

              <SheetContent>
                <SheetHeader className=" w-full flex justify-center items-center h-24 bg-[#002A64]">
                  {!currentUser ? (
                    <div className="w-32">
                      <Link href="/">
                        <ResponsiveImage
                          src={logo}
                          alt="aidroo logo image"
                          width={500}
                          height={300}
                        />
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-[#002A64] p-4 flex items-center gap-4 ">
                      <Avatar>
                        <AvatarImage src={profilePic} alt="@shadcn" />
                        <AvatarFallback>
                          <IconImage src={user} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-white flex gap-4   ">
                        <div>
                          <Heading size="sm">{currentUser.name}</Heading>
                          <Heading size="xs">@companyname</Heading>
                        </div>

                        <IconImage src={verifiedIcon} size={18} />
                        {/* <IconImage src={ver} /> */}
                      </div>
                    </div>
                  )}
                </SheetHeader>
                {/* menu */}

                <Accordion type="single" collapsible>
                  <ScrollArea className="  h-screen ">
                    <div className="w-full px-8 space-y-4   text-sm  pb-96 py-4 border bg-gray-100 ">
                      <div className="flex justify-center items-center">
                        <Button variant="hoverButton" size="md">
                          <div className="absolute -top-2 -right-1">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                          </div>
                          <Heading size="xs">Explore job</Heading>
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 border-b pb-4">
                        <IconImage src={brifcaseIcon} size={20} alt="icon" />
                        <h1 className={`${font16}`}>For Business</h1>
                      </div>
                      <div className="flex items-center gap-4 border-b pb-4">
                        <IconImage src={category} size={20} alt="icon" />
                        <h1 className={`${font16}`}>Categories</h1>
                      </div>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="flex items-center gap-4 no-underline  ">
                            <IconImage src={pageIcon} size={20} alt="icon" />
                            <h1 className={`${font16}`}>Pages</h1>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-10">
                          <ul className="collapse-content space-y-2   ">
                            <li className="text-sm"> Terms of service</li>
                            <li className="text-sm"> Privacy Policy </li>
                            <li className="text-sm"> Events</li>
                            <li className="text-sm">Blogs</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <div className="flex items-center gap-4 border-b pb-4 ">
                        <IconImage src={businessIcon} size={20} alt="icon" />
                        <h1 className={`${font16}`}>Business Pricing Plan</h1>
                      </div>
                      <div className="flex items-center gap-4 collapse-content border-b pb-4 ">
                        <IconImage src={helpIcon} size={20} alt="icon" />
                        <h1 className={`${font16}`}> Help and Support</h1>
                      </div>
                      <div className="flex justify-center   ">
                        <div
                          className="w-28 h-10"
                          onMouseEnter={() => setIsHovered(!isHovered)}
                          onMouseLeave={() => setIsHovered(!isHovered)}
                        >
                          {!currentUser ? (
                            <Button variant="hover">
                              <Link Link href="/login">
                                Login
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              variant="hover"
                              className="  ring-primary_color ring-offset-2  flex gap-2    "
                            >
                              <LogOutSvg size={16} isHovered={isHovered} />
                              <Heading size="sm">Logout</Heading>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </Accordion>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className=" h-[72px] place-content-center">
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
              <div className="flex   items-center  col-span-2  text-lg text-gray-700  ">
                <form className="flex gap-4">
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search"
                    className="bg-white dark:bg-dark h-10 max-w-72 w-[280px]"
                    onChange={(e) => handleInputChange(e)}
                  />

                  <div className="relative">
                    <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10">
                      <Image src={filter} alt="Icon 1" className="w-6" />
                    </div>
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
                <Button variant="hoverButton" size="md">
                  <div className="absolute -top-2 -right-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </div>

                  <span className="relative">Explore Job</span>
                </Button>
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
                      <span className="relative group-hover:text-white text-sm">
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
                    className="text-white border border-blue-300 h-10 flex justify-center items-center px-4 rounded-sm"
                  >
                    Log in
                  </Link>
                ) : (
                  <button onClick={logout}>Logout</button>
                  // <>
                  //   <IconImage src={messageIcon} size={32} alt="message icon" />
                  //   <IconImage
                  //     src={notificationIcon}
                  //     size={28}
                  //     alt="message icon"
                  //   />
                  //   <Popover>
                  //     <PopoverTrigger>
                  //       <Avatar>
                  //         <AvatarImage src={profilePic} alt="profile pic" />
                  //         <AvatarFallback>
                  //           <IconImage src={user} />
                  //         </AvatarFallback>
                  //       </Avatar>
                  //     </PopoverTrigger>
                  //     <PopoverContent className=" mt-3  ">
                  //       <div className="bg-[#002A64] p-4 flex items-center gap-4 rounded-t-md ">
                  //         <div className="text-white flex gap-4   ">
                  //           <div>
                  //             <h1 className={`${font18}`}>
                  //               {currentUser.name}
                  //             </h1>
                  //             <p className="text-sm">
                  //               @{currentUser?.username}
                  //             </p>
                  //           </div>

                  //           <IconImage src={verifiedIcon} size={28} />
                  //           {/* <IconImage src={ver} /> */}
                  //         </div>

                  //         {/* <Avatar>
                  //           <AvatarImage src={profilePic} alt="@shadcn" />
                  //           <AvatarFallback>
                  //             <IconImage src={user} />
                  //           </AvatarFallback>
                  //         </Avatar> */}
                  //       </div>
                  //       <div className="flex flex-col     space-y-3 p-4">
                  //         <span className="flex items-center gap-6  border-b pb-2 ">
                  //           <IconImage
                  //             src={myprofile}
                  //             size={27}
                  //             alt="notification icon"
                  //           />
                  //           <Link href={`/business/${currentUser?.userId}`}>
                  //             <span className={`${font16} text-gray-700`}>
                  //               My Profile
                  //             </span>
                  //           </Link>
                  //         </span>

                  //         <span className="flex items-center gap-6 border-b pb-2    ">
                  //           <IconImage
                  //             src={myorder}
                  //             size={27}
                  //             alt="notification icon"
                  //           />
                  //           <Link href="/business_dashboard/business_info">
                  //             <span className={`${font16} text-gray-700`}>
                  //               My Order
                  //             </span>
                  //           </Link>
                  //         </span>
                  //         <span className="flex items-center gap-6 border-b pb-2   ">
                  //           <IconImage
                  //             src={userdashboard}
                  //             size={27}
                  //             alt="notification icon"
                  //           />
                  //           <Link href="/business_dashboard/business_info">
                  //             <span className={`${font16} text-gray-700`}>
                  //               Dashboard
                  //             </span>
                  //           </Link>
                  //         </span>
                  //         <div onClick={logout}>
                  //           <div className="flex items-center gap-6 cursor-pointer     ">
                  //             <IconImage
                  //               src={singoutIcon}
                  //               size={27}
                  //               alt="notification icon"
                  //             />
                  //             <span className={`${font16} text-gray-700`}>
                  //               Logout
                  //             </span>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </PopoverContent>
                  //   </Popover>
                  // </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
