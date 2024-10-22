"use client";
import loaderImage from "@/asserts/jsonfile/loader1.json";
 
import LottePlayer from "./LottePlayer";
export default function Loading() {
  return (
    <div className=" h-screen flex justify-center items-center ">
      <div className="w-32 h-32">
        <LottePlayer animationData={loaderImage} loop={true} />
      </div>
    </div>
  );
}
