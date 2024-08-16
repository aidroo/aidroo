"use client";
import Heading from "@/components/Heading";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { font14, font16, font18bold, options } from "@/constant";
import {
  locationIcon,
  photoadd,
  profileImage,
  profilePic,
} from "@/exportImage";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

export default function Jobs() {
  const pathname = usePathname();
  const { id } = useParams();
  const dynamicId = id || pathname.split("/").filter(Boolean)[1];

  return (
    <div>
      {" "}
      <form>
        <div className="w-full rounded-lg border-2 p-6 flex flex-col space-y-4">
          <h1
            className={`${font16}   text-primary_color flex items-center gap-4`}
          >
            <FaRegEdit /> Post a Job
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Input
              type="text"
              className={`${font14}`}
              placeholder="Enter your job title"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Textarea
              className={`${font14} min-h-32 `}
              placeholder="Enter your job description"
            />
          </div>

          {/* image */}
          <div className="flex gap-4 h-32">
            <div className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden">
              <ResponsiveImage
                src={profileImage}
                alt="profile image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className=" w-24 md:w-32 h-24 md:h-32 border-2 border-dashed rounded-lg place-content-center">
              <div className="font-semibold text-base rounded p-1 flex flex-col items-center justify-center cursor-pointer mx-auto font-[sans-serif]">
                <CiCirclePlus className="text-6xl text-primary_color" />
                <input type="file" id="uploadFile1" className="hidden" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-2xl">
                <Image src={locationIcon} className="w-6 md:w-8" alt="image" />
                <Image src={photoadd} className="w-6 md:w-8" alt="image" />
              </div>
              <Heading
                size="xs"
                className=" bg-gray-100 p-1 w-fit rounded-md  text-gray-400"
              >
                #add hashtag to find your job
              </Heading>
            </div>
          </div>
          <Button
            variant="hover"
            size="sm"
            className=" max-w-40 mx-auto rounded-full   hover:ring-1 ring-primary_color ring-offset-2 animate-in duration-100 hover:zoom-in-50"
          >
            Publish
          </Button>
        </div>
      </form>
      {/* post job card */}
      <div>
        <div className="w-full rounded-lg border-2 p-6 flex flex-col space-y-4">
          <h1
            className={` ${font16}text-primary_color flex items-center gap-4`}
          >
            Looking for sels manager
          </h1>
          <div className="flex flex-col items-center justify-center">
            <p
              className={`text-justify text-gray-400 tracking-tight ${font14}`}
            >
              I had a seamless experience with Panacea. Other companies denied
              me credit due to not providing evidence of income. Other financial
              institutions that are supposedly for medical professionals.
            </p>
          </div>

          {/* image */}
          <div className="flex gap-4 ">
            <div className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden">
              <ResponsiveImage
                src={profilePic}
                alt="profile image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className="dark:ring-offset-slate-700 rounded  w-24 md:w-32 shrink-0 overflow-hidden">
              <ResponsiveImage
                src={profileImage}
                alt="profile image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <h1 key={item} className="text-primary_color text-xs">
                #job
              </h1>
            ))}
          </div>

          <Button
            variant="hover"
            size="sm"
            className=" max-w-40 mx-auto rounded-full   hover:ring-1 ring-primary_color ring-offset-2 animate-in duration-100 hover:zoom-in-50"
          >
            Apply Now
          </Button>
        </div>
      </div>
      {/* report this review */}
      <form className="border-2 p-6 rounded-md space-y-4 ">
        <h1 className={`${font18bold}`}>Report this review?</h1>
        <div className="border-2" />
        <h1 className={`${font16}`}>Please choose a reson</h1>
        <ul className="ms-4 space-y-1 mt-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className=" h-4 w-4 rounded-full" />
            <Label htmlFor="terms" className={`${font14}`}>
              Offensive or Inappropriate Content
            </Label>
          </div>

          <OptionSelect options={options} className="w-64" label="Label" />
        </ul>

        <div className="flex gap-4 max-w-64 ">
          <Button variant="hoverButton">Submit</Button>
          <Button variant="hoverButton">Close</Button>
        </div>
      </form>
    </div>
  );
}
