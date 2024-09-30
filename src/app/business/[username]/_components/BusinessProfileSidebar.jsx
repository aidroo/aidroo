import IconImage from "@/components/IconImage/IconImage";
import QRCodeComponent from "@/components/Qrcode/Qrcode";
import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { font14, font16, font18 } from "@/constant";
import {
  brifcaseIcon2,
  categories,
  ceoIcon,
  claimWithBusiness,
  dealonIcon,
  earningIcon,
  google,
  srsoft,
  tesla,
  verifiedIcon,
  workerIcon,
} from "@/exportImage";
import Link from "next/link";

export default function BusinessProfileSidebar({ profile }) {
  const { businessName, category, funds, employees, description } = profile;
  return (
    <div className="col-span-2 w-full  mb-8 ">
      <div className="w-full  space-y-4   ">
        {/* qr code  */}

        <QRCodeComponent />

        {/* business name */}
        <div className="border rounded-md shadow p-4 space-y-4 ">
          <div className="flex flex-col justify-center items-center">
            <h1 className={` ${font18} `}>{businessName}</h1>
            <div className="flex items-center       ">
              <IconImage src={categories} size={35} alt="notification icon" />
              <Link href="#" className={`${font14} text-gray-500`}>
                {category}
              </Link>
            </div>
          </div>

          <p className={`tracking-tight    pb-2 ${font14}`}>{description}</p>
          <div className="border-2 rounded-md p-8 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-14 ">
                <ResponsiveImage src={earningIcon} />
              </div>
              <div className="">
                <h1 className={` text-primary_color ${font16}`}>
                  Total Funding
                </h1>
                <p className={`text-gray-500 ${font14} `}>{funds} B</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-14 ">
                <ResponsiveImage src={workerIcon} />
              </div>
              <div className="">
                <h1 className={` text-primary_color ${font16}`}>Employees</h1>
                <p className={`text-gray-500 ${font14} `}>{employees} +</p>
              </div>
            </div>
          </div>
        </div>

        {/* contact */}
        {/* deals on aidroo */}
        <div className="border rounded-md shadow p-4 space-y-6 ">
          <div className="bg-primary_color/20 text-center flex items-center  gap-2  justify-center rounded-md">
            <IconImage src={dealonIcon} alt="" />
            <h1 className={` text-primary_color ${font18}`}>Deals on Aidroo</h1>
          </div>
          {/* <div className="flex items-center gap-2 px-8">
            <Image src={brifcaseIcon} alt="bag icon" className="" />
            <div className="">
              <h1 className={`${font16} text-primary_color`}>
                Total Posted Job
              </h1>
              <p className={`text-gray-500 ${font14}`}>0 Job posted</p>
            </div>
          </div> */}
          <div className="flex items-center gap-2 px-8">
            <div className="w-14 ">
              <ResponsiveImage src={brifcaseIcon2} />
            </div>
            <div className="">
              <h1 className={`${font16} text-primary_color`}>
                Total Posted Job
              </h1>
              <p className={`text-gray-500 ${font14}`}>0 Job posted</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-8">
            <IconImage src={earningIcon} alt="total spent icon" size={64} />
            <div className="">
              <h1 className={`${font16} text-primary_color`}>Total Spent</h1>
              <p className={`text-gray-500 ${font14}`}>0 $</p>
            </div>
          </div>
          <div className="border" />
          <div className="flex items-center gap-2 px-8">
            <IconImage src={ceoIcon} alt="bag icon" size={64} />
            <div className="">
              <h1 className={`${font16} text-primary_color`}>Work with</h1>
              <p className={`text-gray-500 ${font14}`}>0 Profile</p>
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
              Claim listing is the best way to manage and protect your business.
            </p>
            <Link
              href={`/claim?username=${profile.username} `}
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
                Access my Business
              </span>
              <span className="relative invisible text-sm">
                Access my Business
              </span>
            </Link>
          </div>
        </div>
        {/* popular listing  */}
        <div className="border rounded-md p-8 space-y-4">
          <h1 className=" text-center text-xl text-primary_color font-semibold">
            Popular listing
          </h1>
          <div className="flex gap-4 border-2 items-center">
            <div className="w-24 md:32">
              <ResponsiveImage src={google} />
            </div>
            <div className="space-y-[2px] border-gray-900">
              <div className="flex gap-6">
                <h className={`${font16} border`}>Google</h>
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
          <p>fffkfk</p>
          <div className="flex gap-4 border-b items-center">
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
          <div className="flex gap-4 border-b  items-center">
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
  );
}
