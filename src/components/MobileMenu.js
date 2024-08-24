/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { font16 } from "@/constant";
import {
  brifcaseIcon,
  businessIcon,
  categoryImage,
  filter,
  helpIcon,
  logo,
  pageIcon,
  profilePic,
  user,
  verifiedIcon,
  whitesearch,
} from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import Heading from "./Heading";
import IconImage from "./IconImage/IconImage";
import LogOutSvg from "./logoutIcon/LogOutSvg";
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export default function MobileMenu() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [humberOpen, setHumberOpen] = useState(false);
  const [setSearchText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className=" w-full lg:hidden  block   bg-[#002A64]    space-y-4  z-50">
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
                    <Heading size="sm">
                      {currentUser?.profile?.businessName ||
                        currentUser?.profile?.fullName}
                    </Heading>
                    <Heading size="xs">{currentUser?.username}</Heading>
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
                  <IconImage src={categoryImage} size={20} alt="icon" />
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
                        <h1 onClick={logout}> Logout</h1>
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
