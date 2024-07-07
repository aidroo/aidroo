"use client";

import filter from "@/asserts/filter.svg";
import category from "@/asserts/mobile-icons/categories.svg";
import pageIcon from "@/asserts/mobile-icons/page_icon.svg";
import businessIcon from "@/asserts/mobile-icons/pricing-plan.svg";
import helpIcon from "@/asserts/mobile-icons/support.svg";
import businessCase from "@/public/icons/businessbriefcase.svg";
import messageIcon from "@/public/icons/messages.svg";
import notificationIcon from "@/public/icons/notifications.svg";
import search from "@/public/icons/search.svg";
import whitesearch from "@/public/icons/whitesearch.svg";
import profilePic from "@/public/images/profile.jpg";
import Image from "next/image";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth.js";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  loginIcon,
  logo,
  myorder,
  myprofile,
  myReview,
  singoutIcon,
  user,
  userdashboard,
  verifiedIcon,
} from "@/exportImage";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [humberOpen, setHumberOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const { currentUser, login, logout } = useAuth();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (window.innerWidth >= 640) {
      setSidebarOpen(false);
    }
  }, [open]);

  return (
    <div className="w-full sticky top-0 z-20">
      <div className="bg-[#002A64]  ">
        {/* desktop view */}
        <div className="hidden lg:block  h-[72px] place-content-center">
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
                />

                <div
                  className="relative"
                  onMouseEnter={() => setIsHovered2(true)}
                  onMouseLeave={() => setIsHovered2(false)}
                >
                  <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10">
                    <Image src={filter} alt="Icon 1" className="w-6" />
                  </div>
                  {isHovered2 && (
                    <div className="absolute  shadow rounded-md    top-[42px] pt-4 -right-6 ">
                      <div className=" file:selection: z-50  border-2 rounded   p-8 ">
                        <input type="checkbox" />
                        <Button variant="hoverButton">submit</Button>
                      </div>
                    </div>
                  )}
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
                    <span className="relative group-hover:text-white">
                      For Business
                    </span>
                  </button>

                  {isHovered && (
                    <div className="absolute  shadow rounded-md    top-11 pt-4 ">
                      <div className=" file:selection: z-50  border-2 rounded   p-8 ">
                        <input type="checkbox" />
                        <Button variant="hoverButton">submit</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-8 col-span-1/2 items-center   ">
              {!currentUser ? (
                <>
                  <Link
                    href="/login"
                    className="relative inline-flex items-center justify-center h-10 px-4    overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-primary_color rounded-md shadow-md group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary_color  group-hover:translate-x-0 ease">
                      <IconImage src={loginIcon} size={24} />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      Log in
                    </span>
                    <span className="relative invisible">Log in</span>
                  </Link>
                </>
              ) : (
                <>
                  <IconImage src={messageIcon} size={32} alt="message icon" />
                  <IconImage
                    src={notificationIcon}
                    size={28}
                    alt="message icon"
                  />
                  <Popover>
                    <PopoverTrigger>
                      <Avatar>
                        <AvatarImage src={profilePic} alt="@shadcn" />
                        <AvatarFallback>
                          <IconImage src={user} />
                        </AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className=" mt-4 rounded-lg ">
                      <div className="bg-[#002A64] p-4 flex items-center gap-4 ">
                        <div className="text-white flex gap-4   ">
                          <div>
                            <h1 className="text-xl">Profile name</h1>
                            <p className="text-sm">@companyname</p>
                          </div>

                          <IconImage src={verifiedIcon} size={28} />
                          {/* <IconImage src={ver} /> */}
                        </div>

                        <Avatar>
                          <AvatarImage src={profilePic} alt="@shadcn" />
                          <AvatarFallback>
                            <IconImage src={user} />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col     space-y-4 p-4">
                        <Link href="/notifications">
                          <span className="flex items-center gap-6  border-b pb-2 ">
                            <IconImage
                              src={myprofile}
                              size={30}
                              alt="notification icon"
                            />
                            <span className="text-lg text-gray-700">
                              My Profile
                            </span>
                          </span>
                        </Link>
                        <Link href="/notifications">
                          <span className="flex items-center gap-6  border-b pb-2   ">
                            <IconImage
                              src={myReview}
                              size={30}
                              alt="notification icon"
                            />
                            <span className="text-lg text-gray-700">
                              My Reviews
                            </span>
                          </span>
                        </Link>
                        <Link href="/notifications">
                          <span className="flex items-center gap-6 border-b pb-2    ">
                            <IconImage
                              src={myorder}
                              size={30}
                              alt="notification icon"
                            />
                            <span className="text-lg text-gray-700">
                              My Order
                            </span>
                          </span>
                        </Link>
                        <Link href="/business_dashboard/business_info">
                          <span className="flex items-center gap-6 border-b pb-2   ">
                            <IconImage
                              src={userdashboard}
                              size={30}
                              alt="notification icon"
                            />
                            <span className="text-lg text-gray-700">
                              Dashboard
                            </span>
                          </span>
                        </Link>{" "}
                        <Link href="/notifications">
                          <span className="flex items-center gap-6     ">
                            <IconImage
                              src={singoutIcon}
                              size={30}
                              alt="notification icon"
                            />
                            <span className="text-lg text-gray-700">
                              Logout
                            </span>
                          </span>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              )}
            </div>
          </div>
        </div>

        {/* mobile view */}

        <div className=" w-full  block lg:hidden bg-[#002A64]    space-y-4  z-50">
          {/* sidebar */}

          <Sheet onOpenChange={() => setHumberOpen(!humberOpen)}>
            <div className="flex   justify-between  h-24 items-center text-lg  mx-4 max-h-[72px] ">
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

              <div className="flex gap-4 items-center ">
                <div
                  className="  relative bg-[#002A64] rounded-md cursor-pointer p-1"
                  onClick={() => setOpen(!open)}
                >
                  {!open ? (
                    <Image
                      src={search}
                      alt="Icon 1"
                      width={500}
                      height={300}
                      className=" w-7"
                    />
                  ) : (
                    <div onClick={() => setOpen(!open)}>
                      <button className="relative group">
                        <div className="relative flex overflow-hidden items-center justify-center rounded-md w-[36px] h-[36px] transform transition-all     ring-[#1E56AD]     duration-200 shadow-md">
                          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                            <div className="w-6 h-6  flex items-center   group-focus:translate-x-0   ">
                              <div className=" absolute bg-primary_color h-[2px] w-5  transform transition-all duration-500 rotate-45 delay-300 group-focus:-rotate-45"></div>
                              <div className=" absolute bg-primary_color h-[2px] w-5  transform transition-all duration-500 -rotate-45 delay-300 group-focus:-rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <SheetTrigger asChild>
                  <div>
                    <div className="border w-7 h-7 rounded-md border-gray-500 relative  flex justify-center items-center group">
                      {!humberOpen ? (
                        <div className="w-4 flex gap-1 flex-col ">
                          <div className=" border-primary_color border transform transition-all duration-300" />
                          <div className=" border-primary_color border transform transition-all duration-300" />
                          <div className=" border-primary_color border transform transition-all duration-300" />
                        </div>
                      ) : (
                        <div className="w-6 h-6  flex items-center     ms-[3px]  ">
                          <div className=" absolute bg-primary_color h-[2px] w-5  transform transition-all duration-300 rotate-45 delay-300 group-focus:-rotate-45"></div>
                          <div className=" absolute bg-primary_color h-[2px] w-5  transform transition-all duration-300 -rotate-45 delay-300 group-focus:-rotate-45"></div>
                        </div>
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
                  : "opacity-0 -translate-y-20 pointer-events-none "
              }`}
            >
              <form className=" flex gap-4 max-w-96 mx-auto  ">
                <Input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="bg-white dark:bg-dark"
                />

                <div className=" flex items-center justify-center  bg-primary_color p-1 rounded-md   cursor-pointer w-[3.2rem] ">
                  <IconImage src={filter} alt="Icon 1" size={30} />
                </div>
                <div className=" flex items-center justify-center  bg-primary_color p-1 rounded-md   cursor-pointer w-[3.2rem] ">
                  <IconImage src={whitesearch} alt="Icon 1" size={24} />
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
                  <div className="bg-[#002A64] p-4 flex items-center gap-8 ">
                    <Avatar>
                      <AvatarImage src={profilePic} alt="@shadcn" />
                      <AvatarFallback>
                        <IconImage src={user} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-white flex gap-4   ">
                      <div>
                        <h1 className="text-xl">Profile name</h1>
                        <p className="text-sm">@companyname</p>
                      </div>

                      <IconImage src={verifiedIcon} size={28} />
                      {/* <IconImage src={ver} /> */}
                    </div>
                  </div>
                )}
              </SheetHeader>
              {/* menu */}

              <Accordion type="single" collapsible>
                <ScrollArea className="  h-screen">
                  <div className="w-full px-8 space-y-4 mt-4 text-sm  pb-96 ">
                    <div className="flex justify-center items-center">
                      <Button variant="hoverButton" size="lg">
                        <div className="absolute -top-2 -right-1">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                          </span>
                        </div>

                        <span className="relative">Explore Job</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 border-b pb-4">
                      <IconImage src={businessCase} size={28} alt="icon" />
                      <span>For Business</span>
                    </div>
                    <div className="flex items-center gap-4 border-b pb-4">
                      <IconImage src={category} size={24} alt="icon" />
                      <span>Categories</span>
                    </div>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex items-center gap-4 no-underline  ">
                          <IconImage src={pageIcon} size={24} alt="icon" />
                          <span>Pages</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-10">
                        <ul className="collapse-content space-y-2   ">
                          <li> Terms of service</li>
                          <li> Privacy Policy </li>
                          <li> Events</li>
                          <li>Blogs</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <div className="flex items-center gap-4 border-b pb-4 ">
                      <IconImage src={businessIcon} size={24} alt="icon" />
                      <span className=""> Business Pricing Plan</span>
                    </div>
                    <div className="flex items-center gap-4 collapse-content border-b pb-4 ">
                      <IconImage src={helpIcon} size={24} alt="icon" />
                      <span> Help and Support</span>
                    </div>
                    <div className="flex pt-14  ">
                      {!currentUser ? (
                        <Button
                          variant="hover"
                          className="   w-32 gap-4     first:ring-2 ring-primary_color ring-offset-2 h-8  md:h-auto lg:h-auto"
                        >
                          Login
                        </Button>
                      ) : (
                        <Button
                          variant="hover"
                          className="   text-lg  w-32         ring-2 ring-primary_color ring-offset-2 h-8 flex gap-2    "
                        >
                          <LogOutSvg />
                          Logout
                        </Button>
                      )}
                    </div>
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
