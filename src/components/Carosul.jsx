"use client";
import aliexpress from "@/public/images/slider/Aliexpress.png";
import amazon from "@/public/images/slider/amazon.png";
import BBC from "@/public/images/slider/BBC.png";
import cnn from "@/public/images/slider/cnn.png";
import fiverr from "@/public/images/slider/fiverr.png";
import malchimp from "@/public/images/slider/malchimp.png";
import microsoft from "@/public/images/slider/microsoft.png";
import NBCnews from "@/public/images/slider/NBCnews.png";
import payoneer from "@/public/images/slider/payoneer.png";
import paypal from "@/public/images/slider/paypal.png";
import srksoft from "@/public/images/slider/srksoft.png";
import tesla from "@/public/images/slider/tesla.png";
import upwork from "@/public/images/slider/upwork.png";
import whatsapp from "@/public/images/slider/whatsapp.png";
import xcom from "@/public/images/slider/x-com.png";
import Image from "next/image";
const carosulImag = [
  tesla,
  srksoft,
  microsoft,
  xcom,
  amazon,
  BBC,
  paypal,
  upwork,
  whatsapp,
  aliexpress,
  NBCnews,
  malchimp,
  payoneer,
  fiverr,
  cnn,
];
export default function Carosul() {
  return (
    <div className="flex flex-col   overflow-hidden max-w-7xl mx-auto py-24 ">
      <h1 className="text-center text-sm lg:text-2xl gap-2 font-thin flex items-center justify-center">
        Listed by over
        <span className="text-xl lg:text-4xl font-semibold text-primary_color">
          321,000
        </span>{" "}
        businesses globally
      </h1>
      <div className="flex overflow-hidden   group mt-14">
        <div className="flex  space-x-16  px-2 animate-loop-scroll group-hover:paused">
          {carosulImag.map((img) => (
            <Image
              key={img}
              src={img}
              className="max-w-no w-32 h-6  "
              alt="Image 1"
            />
          ))}
        </div>
        {/* <div
          className="flex  animate-loop-scroll group-hover:paused"
          aria-hidden="true"
        >
          {carosulImag.map((img) => (
            <IconImage
              key={img}
              loading="lazy"
              src={img}
              className="max-w-no border "
              size={200}
              alt="Image 1"
            />
          ))}
        </div> */}
      </div>
    </div>
    // <div className="flex overflow-hidden max-w-7xl mx-auto  group">
    //   <div className="flex   animate-loop-scroll group-hover:paused">
    //     {carosulImag.map((img) => (
    //       <IconImage
    //         key={img}
    //         loading="lazy"
    //         src={img}
    //         className="max-w-no  "
    //         size={200}
    //         alt="Image 1"
    //       />
    //     ))}
    //   </div>
    // </div>
  );
}
