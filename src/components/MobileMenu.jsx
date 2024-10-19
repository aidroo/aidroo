/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import notificationIcon from "@/asserts/jsonfile/BellNotificationMObile.json";
import brifcaseIcon from "@/asserts/jsonfile/briefcase.json";
import helpIcon from "@/asserts/jsonfile/HelpSupport.json";
import messageIcon from "@/asserts/jsonfile/MessageiconMObile.json";
import pricingIcon from "@/asserts/jsonfile/PricingPlan.json";
import { font16 } from "@/constant";

import {
  addyourbusiness,
  categoryImage,

  logo,

  myReview,

  pageIcon,
  whitesearch
} from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import DynamicSearchInput from "./DynamicSearchInput";
import Heading from "./Heading";
import IconImage from "./IconImage/IconImage";
import LogOutSvg from "./logoutIcon/LogOutSvg";
import LottePlayer from "./LottePlayer";
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export default function MobileMenu() {
  const { currentUser, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [humberOpen, setHumberOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=" w-full lg:hidden  block    bg-[#002A64]    space-y-4  border-0  ">
      {/* sidebar */}

      <Sheet onOpenChange={() => setHumberOpen(!humberOpen)} className="px-0">
        <div className="flex   justify-between  h-[72px] items-center text-lg     ">
          <div className=" w-24 ps-2 ">
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
                <Image
                  src={whitesearch}
                  className="w-5"
                  alt="image"
                  priority={true}
                />
              ) : (
                <IoClose className="text-white text-3xl transition ease transform duration-300" />
              )}
            </div>

            <SheetTrigger asChild className="pr-2">
              <div>
                <div className="border w-9 h-9 rounded-md border-[#00408B] relative  flex justify-center items-center  transition-all duration-500 ">
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
          className={`absolute top-[48px] w-full bg-[#002A64] p-4 transition-all duration-500 ease-in-out ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-0 pointer-events-none"
          }`}
        >
          <div className="flex w-full gap-x-4 justify-center items-center text-lg text-gray-700">
            <DynamicSearchInput />
          </div>
        </div>

        <SheetContent className="w-[260px] px-0 ">
          <SheetHeader className=" w-full flex  justify-center items-center h-24 bg-[#002A64]   ">
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

            {/* <div className="bg-[#002A64] p-4 flex items-start gap-4 ">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={currentUser?.profile?.profileThumb || user}
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="text-white flex  items-start justify-start flex-col   ">
                  <TitleNameAndVerified
                    title={
                      currentUser?.profile?.businessName ||
                      currentUser?.profile?.fullName
                    }
                    className="text-white"
                    verified={currentUser?.profile?.verified}
                  />

                  <p>{currentUser?.username}</p>

                  
                </div>
              </div> */}
          </SheetHeader>
          {/* menu */}

          <ScrollArea className="  h-screen bg-slate-100 ">
            <Accordion type="single" collapsible className="w-full ">
              <div className="w-full px-4 space-y-4   text-sm    py-4    ">
                <div className="flex justify-center items-center">
                  <Button variant="hoverButton" size="md">
                    <div className="absolute -top-2 -right-1">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    </div>
                    <Link href="/explore-jobs">
                      <Heading size="xs">Explore job</Heading>
                    </Link>
                  </Button>
                </div>
                {/* business profile */}
                {currentUser?.role === "business" && (
                  <Link
                    href={`/business_dashboard`}
                    className="flex items-center gap-2 border-b border-gray-300 pb-4"
                  >
                    <IconImage src={addyourbusiness} size={20} alt="icon" />
                    <h1
                      className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out `}
                    >
                      My profile
                    </h1>
                  </Link>
                )}
                {/* personal profile */}
                {currentUser?.role === "personal" && (
                  <Link
                    href={`/personal_dashboard `}
                    className="flex items-center gap-2 border-b border-gray-300 pb-4"
                  >
                    <IconImage src={addyourbusiness} size={20} alt="icon" />
                    <h1
                      className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out `}
                    >
                      My profile
                    </h1>
                  </Link>
                )}
                {/* business review */}
                {currentUser?.role === "business" && (
                  <Link
                    href={`/business_dashboard`}
                    className="flex items-center gap-2 border-b border-gray-300 pb-4"
                  >
                    <IconImage src={myReview} size={20} alt="icon" />
                    <h1
                      className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out `}
                    >
                      Review
                    </h1>
                  </Link>
                )}
                {/* messages */}

                {currentUser?.username && (
                  <Link
                    href={`#`}
                    className="flex items-center gap-2 border-b border-gray-300 pb-4"
                  >
                    <div className="-ml-1 w-8 h-8">
                      <LottePlayer animationData={messageIcon} loop={true} />
                    </div>
                    <h1
                      className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out -ml-1 `}
                    >
                      Messages
                    </h1>
                  </Link>
                )}
                {/* notification */}
                {currentUser?.username && (
                  <Link
                    href={`#`}
                    className="flex items-center gap-2 border-b border-gray-300 pb-4"
                  >
                    <div className=" w-6 h-6">
                      <LottePlayer
                        animationData={notificationIcon}
                        loop={true}
                      />
                    </div>
                    <h1
                      className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out `}
                    >
                      Notification
                    </h1>
                  </Link>
                )}
                {/* my order */}
                {currentUser?.username && (
                  <Link
                    href={`#`}
                    className="flex items-center gap-2 border-b border-gray-300 pb-4"
                  >
                    <IconImage src={myReview} size={20} alt="icon" />
                    <h1
                      className={`${font16}  hover:text-primary_color transition-all duration-300 ease-in-out `}
                    >
                      My Order
                    </h1>
                  </Link>
                )}

                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center gap-4  hover:no-underline py-0 pb-2">
                    <div className="flex   gap-2">
                      <div className="-ml-2 w-8 h-8">
                        <LottePlayer animationData={brifcaseIcon} loop={true} />
                      </div>
                      <h1
                        className={`${font16}  mt-1 hover:text-primary_color transition-all duration-300 ease-in-out -ml-2 `}
                      >
                        For Business
                      </h1>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 transition-all duration-300 ease-in-out ">
                    <ul className="flex flex-col gap-3">
                      <Link href="/signup/business">
                          <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out">
                          Add Business
                        </li>
                      </Link>
                      <Link href={`/business/${currentUser?.username}`}>
                        <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out">
                          Claim Business
                        </li>
                      </Link>
                      <Link href="#">
                        <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out  ">
                          Request Review
                        </li>
                      </Link>
                      <Link href="/pricing-plan">
                        <li className="text-[15px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out  ">
                          Pricing Plan
                        </li>
                      </Link>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* category */}
                <Link
                  href="/category"
                  className="flex items-center gap-2 border-b border-gray-300 pb-4"
                >
                  <IconImage src={categoryImage} size={20} alt="icon" />
                  <h1
                    className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out `}
                  >
                    Categories
                  </h1>
                </Link>
                {/* pages */}

                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center gap-4  hover:no-underline py-0 pb-2">
                    <div className="flex items-center gap-2  no-underline">
                      <IconImage src={pageIcon} size={20} alt="icon" />
                      <h1
                        className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out `}
                      >
                        Pages
                      </h1>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 transition-all duration-300 ease-in-out">
                    <ul className="flex flex-col gap-3">
                      <Link href="/terms-service">
                        <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out">
                          Terms of service
                        </li>
                      </Link>
                      <Link href="/terms-service">
                        <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out">
                          Privacy Policy
                        </li>
                      </Link>
                      <Link href="#">
                        <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out">
                          Events
                        </li>
                      </Link>
                      <Link href="#">
                        <li className="text-[16px]  hover:text-primary_color cursor-pointer transition-all duration-300 ease-in-out">
                          Blogs
                        </li>
                      </Link>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* pricing plan */}
                <div className="flex items-center gap-2 border-b border-gray-300 pb-4 ">
                  <div className=" w-5  h-5">
                    <LottePlayer animationData={pricingIcon} loop={true} />
                  </div>
                  <h1
                    className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out  cursor-pointer `}
                  >
                    Pricing Plan
                  </h1>
                </div>

                <div className="flex items-center gap-2 border-b border-gray-300 pb-4 ">
                  <div className=" w-5  h-5">
                    <LottePlayer animationData={helpIcon} loop={true} />
                  </div>
                  <h1
                    className={`${font16}   hover:text-primary_color transition-all duration-300 ease-in-out cursor-pointer `}
                  >
                    {" "}
                    Help and Support
                  </h1>
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
                        onClick={logout}
                        variant="hover"
                        className="  ring-primary_color ring-offset-2  flex gap-2    "
                      >
                        <LogOutSvg size={16} isHovered={isHovered} />
                        <h1> Logout</h1>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Accordion>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
