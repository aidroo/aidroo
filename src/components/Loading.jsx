"use client";
import loaderImage from "@/asserts/jsonfile/loader1.json";
 
import LottePlayer from "./LottePlayer";
export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LottePlayer animationData={loaderImage} loop={true} />
    </div>
  );
}
