import Heading from "@/components/Heading";
import IconImage from "@/components/IconImage/IconImage";
import Layout from "@/components/Layout/Layout";
import { GoogleMap } from "@/components/Map/Map";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PublicReview from "@/components/PublicReview/PublicReview";
import QRCodeComponent from "@/components/Qrcode/Qrcode";
import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import ThumbSlider from "@/components/ThumbSlider/ThumbSlider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  businessOur,
  font14,
  font16,
  font18,
  font18bold,
  options,
} from "@/constant";
import {
  bagIcon,
  brifcaseIcon,
  categories,
  locationIcon,
  photoadd,
  verifiedIcon,
} from "@/exportImage";

import ceoIcon from "@/public/icons/ceo.svg";
import claimedIcon from "@/public/icons/claimed.svg";
import claimWithBusiness from "@/public/icons/claimthisbusiness.svg";
import dealonIcon from "@/public/icons/dealon.svg";
import earningIcon from "@/public/icons/usd.svg";

import workerIcon from "@/public/icons/worker.svg";
import google from "@/public/images/google.svg";
import profileImage from "@/public/images/profile.jpg";
import srsoft from "@/public/images/srsoft.svg";
import tesla from "@/public/images/tesla.svg";
import { Label } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";

import {
  CiCircleChevRight,
  CiCirclePlus,
  CiShare2,
  CiStar,
} from "react-icons/ci";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { LiaSmsSolid } from "react-icons/lia";

export default function PublicProfile() {
  return (
    <Layout title="Public Profile">
      <div className="w-full space-y-6  pb-14  ">
        <div className="w-full bg-[#f5fafc] dark:bg-dark">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid w-full lg:w-2/3  mx-auto grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 py-8 ">
              <div className=" flex gap-8 px-8 items-center justify-center ">
                <div className="  rounded-lg w-24  md:w-32 shrink-0  overflow-hidden ">
                  <ResponsiveImage
                    src={profileImage}
                    alt="profile image"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex gap-4 items-center">
                    <h1 size="sm" className={`${font18bold}`}>
                      Safari Biz
                    </h1>
                    <Image src={verifiedIcon} className="w-5 " alt="image" />
                  </div>
                  <div className="flex gap-6 items-center">
                    <h className={`${font14}`}>
                      <span>Reviews </span>
                      <span>3124</span>
                    </h>

                    <ul className="flex  items-center gap-2">
                      <li className="bg-primary  w-2 h-2 rounded-full border" />
                      <li className={`${font14}`}> Excellent</li>
                    </ul>
                  </div>
                  <div className="flex gap-x-2 mt-2">
                    <div className="flex gap-1">
                      <Rating value={4} size={22} />
                    </div>
                    <p className="text-[18px] text-gray-700 font-semibold">
                      4.7
                    </p>
                  </div>
                  <Image
                    src={claimedIcon}
                    alt="claimed image"
                    className="w-24 mt-2"
                  />
                </div>
              </div>

              <div className="  lg:border-s border-primary  items-center justify-center flex  gap-2 lg:gap-4 px-8">
                <div className="bg-primary_color p-2 rounded-lg text-white flex items-center gap-2">
                  <LiaSmsSolid className="text-sm md:text-xl" />{" "}
                  <span className={`${font14}`}>Chat</span>
                </div>

                <div className="bg-primary_color p-2 rounded-lg text-white flex items-center gap-2">
                  <FaPlus className="text-sm " />{" "}
                  <span className={`${font14}`}>Follow</span>
                </div>
                <div className="bg-primary_color p-2 rounded-lg text-white flex items-center gap-2">
                  <CiShare2 className="text-sm md:text-xl" />{" "}
                  <span className={`${font14}`}>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="review"
          className="max-w-[1280px] mx-auto px-8 space-y-6 "
        >
          <TabsList className="grid lg:w-4/6   grid-cols-3 h-12  ">
            <TabsTrigger value="review" className="h-10 flex gap-4 text-lg">
              <CiStar className="text-24   " />
              <span className={`${font16}`}> Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="job" className="h-10 flex gap-4 text-xl">
              <IconImage src={brifcaseIcon} size={20} />
              <span className={`${font16}`}> Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="more" className="h-10 flex gap-4 text-xl">
              <CiCircleChevRight className=" text-lg " />
              <span className={`${font16}`}> More</span>
            </TabsTrigger>
          </TabsList>
          {/* review  tab content  */}
          <div className=" full  mx-auto grid grid-cols-1   lg:grid-cols-7 gap-8 space-y-2  ">
            <div className=" lg:col-span-5">
              <TabsContent value="review">
                <PublicReview />
              </TabsContent>
              <TabsContent value="job" className="space-y-6">
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
                          <input
                            type="file"
                            id="uploadFile1"
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2 text-2xl">
                          <Image
                            src={locationIcon}
                            className="w-6 md:w-8"
                            alt="image"
                          />
                          <Image
                            src={photoadd}
                            className="w-6 md:w-8"
                            alt="image"
                          />
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
                        I had a seamless experience with Panacea. Other
                        companies denied me credit due to not providing evidence
                        of income. Other financial institutions that are
                        supposedly for medical professionals.
                      </p>
                    </div>

                    {/* image */}
                    <div className="flex gap-4 ">
                      <div className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden">
                        <ResponsiveImage
                          src={profileImage}
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

                    <OptionSelect
                      options={options}
                      className="w-64"
                      label="Label"
                    />
                  </ul>

                  <div className="flex gap-4 max-w-64 ">
                    <Button variant="hoverButton">Submit</Button>
                    <Button variant="hoverButton">Close</Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="more" className="space-y-8">
                <div className=" border-2 rounded-md p-10 mx-auto  ">
                  <ThumbSlider />
                </div>
                {/* business Our */}
                <Heading className="text-primary_color text-xl text-center pt-10 pb-2">
                  Business Our
                </Heading>
                <div className="border-2 rounded-md">
                  {businessOur.map((our) => (
                    <h1
                      key={our.day}
                      className={`flex  text-xs   place-content-center justify-between p-4 ${font18}  `}
                    >
                      <h1 className="w-12">{our.day}</h1>
                      <div className="flex items-center space-x-2 w-24">
                        <Switch id={our.day} disabled={!our.open} />
                      </div>

                      <span className="">9.00 AM - 10.00 PM</span>
                    </h1>
                  ))}
                </div>

                {/* map */}
                <div className="   h-[440px] w-full p-4 border-2 rounded-md">
                  <GoogleMap
                    showMarker={false}
                    className="h-[400px] w-full rounded-md"
                  />
                </div>
              </TabsContent>{" "}
            </div>
            <div className=" w-full lg:col-span-2 ">
              <div className="w-full  space-y-4  ">
                {/* qr code  */}

                <QRCodeComponent />

                {/* business name */}
                <div className="border rounded-md shadow p-4 space-y-4 ">
                  <div className="flex flex-col justify-center items-center">
                    <h1 className={` ${font18} `}>Business Name</h1>
                    <div className="flex items-center       ">
                      <IconImage
                        src={categories}
                        size={35}
                        alt="notification icon"
                      />
                      <Link href="#" className={`${font14} text-gray-500`}>
                        Developing
                      </Link>
                    </div>
                  </div>

                  <p className={`tracking-tight    pb-2 ${font14}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque sit neque natus quidem aperiam iste, deleniti,
                    voluptatem doloribus totam quam quaerat molestiae vero
                    sapiente dignissimos minima optio. Repellendus, sunt
                    tempora.
                  </p>
                  <div className="border-2 rounded-md p-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-14 ">
                        <ResponsiveImage src={earningIcon} />
                      </div>
                      <div className="">
                        <h1 className={` text-primary_color ${font16}`}>
                          Total Fundings
                        </h1>
                        <p className={`text-gray-500 ${font14} `}>10B - 20B</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-14 ">
                        <ResponsiveImage src={workerIcon} />
                      </div>
                      <div className="">
                        <h1 className={` text-primary_color ${font16}`}>
                          Worker
                        </h1>
                        <p className={`text-gray-500 ${font14} `}>700+</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* contact */}
                {/* deals on aidroo */}
                <div className="border rounded-md shadow p-4 space-y-6 ">
                  <div className="bg-primary_color/20 text-center flex items-center  gap-2  justify-center rounded-md">
                    <IconImage src={dealonIcon} alt="" />
                    <h1 className={` text-primary_color ${font18}`}>
                      Deals on Aidroo
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 px-8">
                    <IconImage src={bagIcon} alt="bag icon" size={4} />
                    <div className="">
                      <h1 className={`${font16} text-primary_color`}>
                        Total Posted Job
                      </h1>
                      <p className={`text-gray-500 ${font14}`}>0 Job posted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-8">
                    <div className="w-14 ">
                      <ResponsiveImage src={workerIcon} />
                    </div>
                    <div className="">
                      <h1 className={`${font16} text-primary_color`}>
                        Total Posted Job
                      </h1>
                      <p className={`text-gray-500 ${font14}`}>0 Job posted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-8">
                    <IconImage
                      src={earningIcon}
                      alt="total spent icon"
                      size={64}
                    />
                    <div className="">
                      <h1 className={`${font16} text-primary_color`}>
                        Total Spent
                      </h1>
                      <p className={`text-gray-500 ${font14}`}>1200 $</p>
                    </div>
                  </div>
                  <div className="border" />
                  <div className="flex items-center gap-2 px-8">
                    <IconImage src={ceoIcon} alt="bag icon" size={64} />
                    <div className="">
                      <h1 className={`${font16} text-primary_color`}>
                        Work with
                      </h1>
                      <p className={`text-gray-500 ${font14}`}>7 Profile</p>
                    </div>
                  </div>
                </div>

                {/* BUSINESS OUR */}

                {/* claim business */}
                <div className="border rounded-md p-8 space-y-4">
                  <IconImage src={claimWithBusiness} />
                  <div className="">
                    <h className={`text-primary_color ${font16}`}>
                      In this Your Business
                    </h>
                    <p className={`tracking-tighter ${font14}`}>
                      Claim listing is the best way to manage and protect your
                      business.
                    </p>
                    <a
                      href="#_"
                      className="relative inline-flex items-center justify-center h-12 px-4 py-3 mt-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-primary_color rounded-full shadow-md group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary_color  group-hover:translate-x-0 ease">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-primary_color transition-all duration-300 transform group-hover:translate-x-full ease">
                        Access your Business
                      </span>
                      <span className="relative invisible text-sm">
                        Access your Business
                      </span>
                    </a>
                  </div>
                </div>
                {/* popular listing  */}
                <div className="border rounded-md p-8 space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-24 md:32">
                      <ResponsiveImage src={google} />
                    </div>
                    <div className="space-y-[2px]">
                      <div className="flex gap-6">
                        <h className={`${font16}`}>Google</h>
                        <div className="w-4 md:w-5 ">
                          <ResponsiveImage src={verifiedIcon} />
                        </div>
                      </div>
                      <p className={`${font14}`}>Tech Company</p>
                      <div className="flex gap-1">
                        <Rating value={5} size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-24 md:32">
                      <ResponsiveImage src={tesla} />
                    </div>
                    <div className="space-y-[2px]">
                      <div className="flex gap-10">
                        <h1 className={`${font16}`}>Tesla</h1>
                        <div className="w-4 md:w-5 ">
                          <ResponsiveImage src={verifiedIcon} />
                        </div>
                      </div>
                      <h1 className={`${font14}`}>Tech Company</h1>
                      <div className="flex gap-1">
                        <Rating value={5} size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4  items-center">
                    <div className="w-24 md:32">
                      <ResponsiveImage src={srsoft} />
                    </div>
                    <div className="space-y-[2px]">
                      <div className="flex gap-10">
                        <h1 className={`${font16}`}>Srsoft</h1>
                        <div className="w-4 md:w-5 ">
                          <ResponsiveImage src={verifiedIcon} />
                        </div>
                      </div>
                      <h1 className={`${font14}`}>Tech Company</h1>
                      <div className="flex gap-1">
                        <Rating value={5} size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}
