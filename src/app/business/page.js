"use client";
import BusinessProfileCard from "@/components/BusinessProfileCard";
import Layout from "@/components/Layout/Layout";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Star from "@/components/Star/Star";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  categories,
  countries,
  font14,
  font16,
  font18bold,
  limitOptions,
} from "@/constant";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

export const options = [
  {
    value: "recent",
    name: "Most Relevant ",
  },
  {
    value: "top",
    name: "Top Rated",
  },
  {
    value: "guaranteed",
    name: "Top Guarented",
  },
];

export const works = [1, 2, 3, 4, 5, 6];

function createQueryURL(baseURL, params) {
  const url = new URL(baseURL);

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  return url.toString();
}
export default function Categories() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState(undefined);
  const [rating, setRating] = useState(0);
  const [country, setCountry] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [claimed, setClaimed] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [totalRecords, setTotalRecords] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [businessProfile, setBusinessProfiles] = useState([]);

  // Define the base URL of your API
  const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business`;

  // Generate the dynamic URL using the createQueryURL function
  const url = createQueryURL(baseURL, {
    searchTerm,
    category: selectedCategory,
    subcategory: selectedSubcategory,
    rating: rating > 0 ? rating : undefined,
    claimed,
    city: city,
    country,
    page,
    limit,
  });

  // Fetch data when the URL changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(url);

        setBusinessProfiles(response?.data?.data);
        setPage(response?.data?.currentPage);
        setTotalRecords(response?.data?.totalRecords);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto  px-6  py-10   ">
        <div>
          <h1
            className={`text-primary_color  ${font18bold}  text-center    py-8`}
          >
            Find your best company
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-8  gap-y-4 md:gap-x-4  ">
          {/* filter section */}
          <form className="min-w-[350px] col-span-3 border-2 rounded-md shadow p-4  space-y-4">
            <div>
              <h1 className={`${font16} font-medium `}>Searchig Listing</h1>
            </div>

            <div className=" space-y-3 md:space-y-6">
              <Input
                type="text"
                placeholder="What are you looking for?"
                className={`text-gray-600  ${font14} h-10 `}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <OptionSelect
                label="Select a category"
                options={categories}
                name="category"
                className={`text-gray-600  ${font14} h-10 `}
                onChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              />
              <OptionSelect
                label="Select a sub category"
                name="category"
                options={categories}
                className={`text-gray-600  ${font14} h-10 `}
                onChange={(value) => setSelectedSubcategory(value)}
                value={selectedSubcategory}
              />
            </div>
            <div>
              <h1 className={`${font16} font-medium `}>Rating</h1>
              <div className="border border-r-0 h-11 rounded grid grid-cols-4">
                <button
                  className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center  cursor-pointer hover:text-white ${
                    rating == 0
                      ? "bg-[#9ce0ff] text-white  "
                      : "hover:bg-[#81d7fe] "
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (rating !== 0) setRating(0);
                  }}
                >
                  <h1 className="text-xs">Any</h1>
                </button>
                <button
                  className={`text-xs md:text-[16px] font-semibold border-r flex justify-center items-center place-content-center hover:text-white gap-1  ${
                    rating == 3
                      ? "bg-[#fcde91]  text-white  "
                      : "hover:bg-[#fcde91]  "
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (rating !== 3) setRating(3);
                  }}
                >
                  <Star colorClass="#0084FF" />

                  <h1 className="text-xs">3.0 +</h1>
                </button>
                <button
                  className={`text-xs md:text-[16px] font-semibold border-r flex justify-center items-center place-content-center gap-1 hover:text-white ${
                    rating == 4
                      ? "bg-[#9ae9cc] text-white"
                      : "hover:bg-[#9ae9cc] "
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (rating !== 4) setRating(4);
                  }}
                >
                  <Star colorClass="#0084FF" />
                  <h1 className="text-xs">4.0 +</h1>
                </button>
                <button
                  className={`text-xs md:text-[16px] font-semibold border-r flex justify-center items-center place-content-center gap-1 hover:text-white   ${
                    rating === 5
                      ? "bg-[#81d7fe] text-white"
                      : "hover:bg-[#81d7fe]"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (rating !== 5) setRating(5);
                  }}
                >
                  <Star colorClass="#0084FF" />
                  <h1 className="text-xs ">5</h1>
                </button>
              </div>
            </div>
            <div className=" ">
              <h1 className={`${font16} font-medium `}>Country</h1>

              <div className="  flex  gap-4 items-center">
                <OptionSelect
                  label="Select a category"
                  options={countries}
                  className={`text-gray-600  ${font14} h-10 `}
                  onChange={(value) => setCountry(value)}
                  value={country}
                />
                <Input
                  placeholder="City or Zip code"
                  className="text-gray-600 text-sm h-10 "
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4   justify-between">
              <div className="space-y-2">
                <h1 className={`${font16} font-medium `}>Profile status</h1>

                <div className="space-y-2">
                  <div className="flex items-center justify-between space-x-2 w-44">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Claimed
                    </label>
                    <Checkbox
                      className="w-5 h-5 rounded-full"
                      id="terms"
                      onCheckedChange={(claimed) => setClaimed(claimed)}
                      checked={claimed}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className=" text-sm md:text-[16px] font-semi-bold ">
                  Open Now
                </h1>
                <Button className=" gap-1  flex items-center justify-center">
                  <AiOutlineClockCircle className=" text-sm md:text-lg font-semi-bold" />
                  <span className=" text-xs md:text-[16px] font-bold ">
                    Open Now
                  </span>
                </Button>
              </div>
            </div>
          </form>
          {/*  business  profile section */}
          <div className=" col-span-5 border-2 rounded-md   p-6 space-y-4  ">
            {/* <div className="flex justify-end">
              <OptionSelect
                options={options}
                label="Aidroo Sort"
                className="w-24"
                onChange={(value) => setSortBy(value)}
                value={sortBy}
              />
            </div> */}

            <div>
              <div className="flex flex-col gap-4">
                {isLoading &&
                  [1, 2, 3, 4].map((item) => (
                    <div
                      className="h-44 mx-auto border-[1px] rounded-md w-full"
                      key={item}
                    >
                      <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
                        <div className="w-12 h-12 bg-gray-300 rounded-full "></div>
                        <div className="flex flex-col space-y-3">
                          <div className="h-6 bg-gray-300 rounded-md w-36 "></div>
                          <div className="w-24 h-6 bg-gray-300 rounded-md "></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {businessProfile.length > 0 &&
                businessProfile.map((businessProfile) => (
                  <div
                    className=" border rounded-md  "
                    key={businessProfile.id}
                  >
                    <BusinessProfileCard businessProfile={businessProfile} />
                  </div>
                ))}
            </div>
            <div>
              {!isLoading && businessProfile.length > 0 && (
                <div className="  flex ">
                  <OptionSelect
                    options={limitOptions}
                    className="max-w-24"
                    label="Select a Limit"
                    onChange={(value) => setLimit(value)}
                    value={limit}
                  />
                  <PaginationComponent
                    currentPage={page}
                    totalRecords={totalRecords}
                    pageSize={limit}
                    onPageChange={handlePageChange}
                    className=" " // Add your custom class
                  />
                </div>
              )}
              {!isLoading && businessProfile.length < 1 && (
                <div className="bg-gradient-to-r from-purple-300 to-blue-200 rounded-md border ">
                  <div className="w-full m-auto    flex items-center justify-center">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                      <div className="border-t border-gray-200 text-center pt-8">
                        <h1 className="text-9xl font-bold text-purple-400">
                          404
                        </h1>
                        <h1 className="text-6xl font-medium py-8">
                          oops! Profile not found
                        </h1>
                        <p className="text-2xl pb-8 px-12 font-medium">
                          Oops! The profile you are looking for does not exist.
                          It might have been moved or deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <section className="bg-white dark:bg-gray-900">
                  <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                    <div className="mx-auto max-w-screen-sm text-center">
                      <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
                        500
                      </h1>

                      <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Sorry something went wrong.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
