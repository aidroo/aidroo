"use client";
import Heading from "@/components/Heading";
import { GoogleMap } from "@/components/Map/Map";
import ThumbSlider from "@/components/ThumbSlider/ThumbSlider";
import { Switch } from "@/components/ui/switch";
import { businessOur, font18 } from "@/constant";
import { useParams, usePathname } from "next/navigation";

export default function More() {
  const pathname = usePathname();
  const { id } = useParams();
  const dynamicId = id || pathname.split("/").filter(Boolean)[1];
  console.log(dynamicId);
  return (
    <>
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
        <GoogleMap showMarker={false} className="h-[400px] w-full rounded-md" />
      </div>
    </>
  );
}
