"use client";
import { font14 } from "@/constant";
import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ category }) {
  return (
    <Link
      className="slide_card bg-[#d4e5ff] dark:bg-[#0b1120] shadow-md min-w-[80px] h-24  md:h-[120px] before:bg-[#ccd9ff] dark:before:bg-dark dark:border"
      href="/category"
    >
      <div className="relative flex justify-center">
        <div className="absolute top-[-13px] w-36 h-24">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            className=" hidden opacity-20 md:block"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
            <style type="text/css">
              {`
                .st0 { fill: currentColor; }
                .st1 { fill: currentColor; }
              `}
            </style>
            <path
              className="st0"
              d="M-271-107.9c-0.5-0.5-1-1.1-1.4-1.6C-271.8-108.9-271.4-108.4-271-107.9z"
            />
            <path
              className="st0"
              d="M-314.2,27.8c-0.4,0-0.8,0-1.3-0.1C-315,27.7-314.6,27.8-314.2,27.8z"
            />
            <g>
              <g>
                <g>
                  <path
                    className="st1 text-[#f7fafc] dark:text-dark"
                    d="M256,458c-111.4,0-202-90.6-202-202S144.6,54,256,54s202,90.6,202,202S367.4,458,256,458z M256,91.4
                      c-90.7,0-164.6,73.8-164.6,164.6S165.3,420.6,256,420.6S420.6,346.7,420.6,256S346.7,91.4,256,91.4z"
                  />
                </g>
                <g>
                  <path
                    className="st1 text-[#f1f4f5] dark:text-dark"
                    d="M256,378.6c-67.6,0-122.6-55-122.6-122.6s55-122.6,122.6-122.6s122.6,55,122.6,122.6S323.6,378.6,256,378.6z
                      M256,170.8c-47,0-85.2,38.2-85.2,85.2s38.2,85.2,85.2,85.2s85.2-38.2,85.2-85.2S303,170.8,256,170.8z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={category.src}
            width={40}
            height={40}
            alt="Category icon"
            className="absolute top-4   md:top-[35px] p-1 shrink-0"
          />
          <h1
            className={`absolute text-xs md:text-[16px] text-center break-all top-14 md:top-[77px] text-gray-500  font-light ${font14}  `}
          >
            {category.name}
          </h1>
        </div>
      </div>
    </Link>
  );
}
