/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { font16 } from "@/constant";
import {
  addyourbusiness,
  brifcaseIcon,
  businessIcon,
  categoryImage,
  helpIcon,
  logo,
  messageIcon,
  myReview,
  notificationIcon,
  pageIcon,
  user,
  whitesearch,
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
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";
import TitleNameAndVerified from "./TitleNameAndVerified";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export default function MobileMenu() {
  const { currentUser, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [humberOpen, setHumberOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=" w-full lg:hidden  block   bg-[#002A64]    space-y-4  z-50">
      {/* sidebar */}

      <Sheet onOpenChange={() => setHumberOpen(!humberOpen)}>
        <div className="flex   justify-between  h-24 items-center text-lg   max-h-[72px] ">
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
                <Image src={whitesearch} className="w-5" alt="image" />
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
          className={`absolute top-[48px] w-full transition-all duration-500 bg-[#002A64] p-4 ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8 pointer-events-none "
          }`}
        >
          <div className="flex w-full gap-x-4   items-start col-span-2  text-lg text-gray-700    ">
            <DynamicSearchInput
            // title={title}
            // verified={verified}
            // baseUrl=""
            // searchQuery={searchQuery}
            />
            {/* <div className=" flex items-center justify-center  h-9    bg-primary_color p-1 rounded-md   cursor-pointer w-10 md:w-[42px] ">
              <Image src={whitesearch} alt="Icon 1" className="w-5" />
            </div> */}
          </div>
        </div>

        <SheetContent>
          <SheetHeader className=" w-full flex  items-start h-24 bg-[#002A64]">
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
              <div className="bg-[#002A64] p-4 flex items-start gap-4 ">
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
                {/* business profile */}
                {currentUser?.role === "business" && (
                  <Link
                    href={`/business/${currentUser?.username}`}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <IconImage src={addyourbusiness} size={20} alt="icon" />
                    <h1 className={`${font16}`}>My profile</h1>
                  </Link>
                )}
                {/* personal profile */}
                {currentUser?.role === "personal" && (
                  <Link
                    href={`/personal_dashboard `}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <IconImage src={addyourbusiness} size={20} alt="icon" />
                    <h1 className={`${font16}`}>My profile</h1>
                  </Link>
                )}
                {/* business review */}
                {currentUser?.role === "business" && (
                  <Link
                    href={`/business/${currentUser?.username}`}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <IconImage src={myReview} size={20} alt="icon" />
                    <h1 className={`${font16}`}>Review</h1>
                  </Link>
                )}
                {/* messages */}
                <Link
                  href={`#`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <IconImage src={messageIcon} size={20} alt="icon" />
                  <h1 className={`${font16}`}>Messages</h1>
                </Link>
                {/* notification */}
                <Link
                  href={`#`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <IconImage src={notificationIcon} size={20} alt="icon" />
                  <h1 className={`${font16}`}>Notification</h1>
                </Link>
                {/* my order */}
                <Link
                  href={`#`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <IconImage src={myReview} size={20} alt="icon" />
                  <h1 className={`${font16}`}>My Order</h1>
                </Link>

                <div className="flex items-center gap-4 border-b pb-4">
                  <IconImage src={brifcaseIcon} size={20} alt="icon" />
                  <h1 className={`${font16}`}>For Business</h1>
                </div>

                {/* category */}
                <Link
                  href="/category"
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <IconImage src={categoryImage} size={20} alt="icon" />
                  <h1 className={`${font16}`}>Categories</h1>
                </Link>
                {/* pages */}
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
                {/* pricing plan */}
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
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}
