"use client";
import { font18 } from "@/constant";
import { perosnal_verified, unclaimed, verifiedIcon } from "@/exportImage";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function TitleNameAndVerified({
  title = "",
  verified = false,
  isShown = false,
  personalVerified = false,
  className = "",
  sort=false,
}) {
   const displayTitle = sort
     ? title.length > 15
       ? `${title.slice(0, 15)}...`
       : title
     :title;
  return (
    <div
      className={`text-gray-600 ${font18} font-semibold block`}
      style={{ width: "100%" }}
    >
      <span className={`text-justify ${className}`}>{displayTitle}</span>
      {verified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-block align-baseline ms-2  -mt-1 ">
                <Image
                  src={verifiedIcon}
                  className="w-[20px] inline-block"
                  alt="bordercategoriesIcon"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {personalVerified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-block align-baseline ms-2   ">
                <Image
                  src={perosnal_verified}
                  className="w-[18px] inline-block mb-1"
                  alt="bordercategoriesIcon"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {!verified && !personalVerified && isShown && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="inline-block align-baseline ms-2 -mt-1 ">
                <Image
                  src={unclaimed}
                  className="w-[16px] inline-block"
                  alt="bordercategoriesIcon"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unverified</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
