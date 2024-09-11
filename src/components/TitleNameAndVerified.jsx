"use client";
import { font18 } from "@/constant";
import { perosnal_verified, unclaimed, verifiedIcon } from "@/exportImage";
import Image from "next/image";

export default function TitleNameAndVerified({
  title = "",
  verified = false,
  isShown = false,
  personalVerified = false,
}) {
  return (
    <div
      className={`text-gray-600 ${font18} font-semibold block`}
      style={{ width: "100%" }}
    >
      <span className="text-justify">{title}</span>
      {verified && (
        <span className="inline-block align-baseline ms-2 ">
          <Image
            src={verifiedIcon}
            className="w-[20px] inline-block"
            alt="bordercategoriesIcon"
          />
        </span>
      )}

      {personalVerified && (
        <span className="inline-block align-baseline ms-2 ">
          <Image
            src={perosnal_verified}
            className="w-[18px] inline-block"
            alt="bordercategoriesIcon"
          />
        </span>
      )}

      {!verified && !personalVerified && isShown && (
        <span className="inline-block align-baseline ms-2 ">
          <Image
            src={unclaimed}
            className="w-[16px] inline-block"
            alt="bordercategoriesIcon"
          />
        </span>
      )}
    </div>
  );
}
