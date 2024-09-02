"use client";
import { font18 } from "@/constant";
import { unclaimed, verifiedIcon } from "@/exportImage";
import Image from "next/image";

export default function TitleNameAndVerified({
  title = "",
  verified = false,
  isShown = false,
}) {
  return (
    <div
      className={`text-gray-600 ${font18} font-semibold block`}
      style={{ width: "100%" }}
    >
      <span className="text-justify">{title}</span>
      {verified && (
        <span className="inline-block align-baseline ms-2 ">
          <Image src={verifiedIcon} className="w-5 inline-block" />
        </span>
      )}
      {!verified && isShown && (
        <span className="inline-block align-baseline ms-2 ">
          <Image src={unclaimed} className="w-5 inline-block" />
        </span>
      )}
    </div>
  );
}
