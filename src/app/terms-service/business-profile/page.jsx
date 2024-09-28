"use client";

import f from "@/asserts/jsonfile/lock.json";
import Lottie from "lottie-react";
import { LuDot } from "react-icons/lu";
import { businessPrivacyPolicy } from "../_components/constants";
export default function page() {
  return (
    <div className="border py-4 rounded-md -mt-10">
      <h1 className="text-2xl font-semibold text-primary_color  text-center my-10   ">
        Terms of conditions
      </h1>
      <div className="w-80 mx-auto">
        <Lottie
          animationData={f}
          autoPlay={false} // Do not autoplay, control via ref
          // Control loop based on prop
        />
      </div>
      <div className="flex h-auto items-center justify-center bg-white px-6  ">
        <div className="space-y-6 ">
          <div>
            <p className="text-gray-700 font-light tracking-tight">
              Welcome to Aidroo, a listing and directory website agency
              dedicated to connecting businesses and customers seamlessly. By
              using our website and services, you agree to comply with and be
              bound by the following terms and conditions. Please read these
              terms carefully before accessing or using our website.
            </p>
          </div>
          {businessPrivacyPolicy.map((term, index) => (
            <div key={index} className="border-l-2 border-dashed">
              <div className="relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-6">
                  <h4 className="font-bold text-blue-500">{term.section}</h4>
                  <p className="mt-2   text-sm text-gray-500">{term.content}</p>
                </div>
              </div>
              {term.subsections &&
                term.subsections.map((subsection, subIndex) => (
                  <div className="mb-6 ml-8 mt-2" key={subIndex}>
                    <div className="flex items-center ">
                      <LuDot className="-mt-2 text-2xl" />
                      <h3 className="text font-semibold text-gray-700  mb-1">
                        {subsection.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 font-light ml-6">
                      {subsection.content}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
