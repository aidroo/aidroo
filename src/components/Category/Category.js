"use client";

import { categories } from "@/constant";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import CategoryItem from "./CategoryItem/CategoryItem";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function Category() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(8);

  const updateItemsPerSlide = () => {
    if (window.innerWidth >= 1008) {
      setItemsPerSlide(8);
    } else if (window.innerWidth > 600) {
      setItemsPerSlide(4);
    } else if (window.innerWidth < 600) {
      setItemsPerSlide(4);
    }
  };

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => {
      window.removeEventListener("resize", updateItemsPerSlide);
    };
  }, []);

  useEffect(() => {
    setCurrentSlide(0); // Reset to the first slide on item count change
  }, [itemsPerSlide]);

  const chunkedCategories = chunkArray(categories, itemsPerSlide);
  const totalSlides = chunkedCategories.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  const prvDisabledColor =
    currentSlide === 0
      ? " text-gray-200 ring-0 ring-offset-0"
      : "   text-primary_color  ring  ring-[#D2E8FF] ring-offset-1  ";

  const nextDisabledColor =
    totalSlides - 1 === currentSlide
      ? " text-gray-200 ring-0 ring-offset-0"
      : "   text-primary_color  ring  ring-[#D2E8FF] ring-offset-1  ";

  return (
    <div className="bg-[#d4e5ff] dark:bg-dark py-10">
      <div className="max-w-[1360px] mx-auto sm:px-8 flex items-center flex-col space-y-6">
        <h1
          className={`text-center text-2xl  font-semibold  ${poppins.variable}`}
        >
          Explore Categories
        </h1>
        <div className=" px-14 relative mx-8">
          <div className=" w-fit lg:max-w-[900px]  flex justify-center overflow-hidden">
            <div
              className="flex w-full transition-transform duration-500 "
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {chunkedCategories.map((categoryChunk, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full grid  max-gap-2 ${
                    itemsPerSlide === 8
                      ? "grid-cols-1 sm:grid-cols-3   md:grid-cols-4  "
                      : itemsPerSlide === 4
                      ? "grid-cols-2  "
                      : itemsPerSlide === 4
                      ? "grid-cols-2"
                      : ""
                  }`}
                >
                  {categoryChunk.map((category) => (
                    <CategoryItem key={Math.random()} category={category} />
                  ))}
                </div>
              ))}
            </div>
            <button
              disabled={currentSlide === 0}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#CCD9FF] ${prvDisabledColor}   w-6 h-6  rounded-full     flex justify-center items-center
              overflow-hidden    text-2xl  `}
              onClick={prevSlide}
            >
              <IoIosArrowBack className="text-sm -ms-[2px]" />
            </button>
            <button
              disabled={totalSlides - 1 === currentSlide}
              className={`absolute right-0 top-1/2 -mt-4  ${nextDisabledColor}   w-6 h-6  rounded-full     flex justify-center items-center
              overflow-hidden    text-2xl  `}
              onClick={nextSlide}
            >
              <IoIosArrowForward className="text-sm ms-[2px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
