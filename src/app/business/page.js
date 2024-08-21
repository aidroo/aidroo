"use client";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import useSWR from "swr";

import BusinessProfileCard from "@/components/BusinessProfileCard";
import Error from "@/components/Error";
import Layout from "@/components/Layout/Layout";
import Notfound from "@/components/Notfound";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import blueStart from "@/public/images/star/blue.svg";
import greenStar from "@/public/images/star/green.svg";
import yellowStart from "@/public/images/star/yellow.svg";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { Combobox } from "@/components/Combobox";
import IconImage from "@/components/IconImage/IconImage";
import {
  countries,
  font14,
  font16,
  font18bold,
  limitOptions,
} from "@/constant";
import apiService from "@/lib/apiService";

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState(undefined);
  const [rating, setRating] = useState(0);
  const [country, setCountry] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [claimed, setClaimed] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Parameters for filtering
  const queryParams = {
    searchTerm,
    category: selectedCategory?.name,
    subcategory: selectedSubcategory?.name,
    rating: rating > 0 ? rating : undefined,
    claimed,
    city,
    country,
    page: currentPage,
    limit,
  };

  // Fetch data using SWR
  const { data, error, isLoading } = useSWR(
    ["/api/business", queryParams],
    (url) => apiService.getData(url)
  );
  // fetching categories and subcategories
  const {
    data: categoryData,
    error: categoryError,

    isLoading: categoryLoading,
  } = useSWR("/api/category", (url) => apiService.getData(url));

  const {
    data: subcategoryData,
    error: subcategoryError,

    isLoading: subcategoryLoading,
  } = useSWR(
    ["/api/subcategory", { categoryId: selectedCategory?.id }],
    (url) => apiService.getData(url)
  );

  const businessProfiles = data?.data || [];

  // Loading placeholder
  const loadingPlaceholder = (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div className="h-44 mx-auto border rounded-md w-full" key={item}>
          <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col space-y-3">
              <div className="h-6 bg-gray-300 rounded-md w-36"></div>
              <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className={`text-primary_color ${font18bold} text-center py-8`}>
          Find your best company
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-4 md:gap-x-4">
          {/* Filter Section */}
          <form className="min-w-[350px] col-span-3 border-2 rounded-md shadow p-4 space-y-4">
            <h1 className={`${font16} font-medium`}>Search Listings</h1>

            <div className="space-y-3 md:space-y-6">
              <Input
                type="text"
                placeholder="What are you looking for?"
                className={`text-gray-600 ${font14} h-10`}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Combobox
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                options={categoryData?.data}
                isLoading={categoryLoading}
                error={categoryError}
                className="border-none"
                placeholder="category"
              />
              <Combobox
                selectedCategory={selectedSubcategory}
                setSelectedCategory={setSelectedSubcategory}
                options={subcategoryData?.data}
                isLoading={subcategoryLoading}
                error={subcategoryError}
                placeholder="subcategory"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <h1 className={`${font16} font-medium`}>Rating</h1>
              <div className="border border-r-0 h-11 rounded grid grid-cols-4">
                <button
                  className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
                    rating === 0
                      ? "bg-[#81d7fe] text-white"
                      : "hover:bg-[#81d7fe] hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setRating(0);
                  }}
                >
                  <h1 className="text-md  ">any</h1>
                </button>{" "}
                <button
                  className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
                    rating === 3
                      ? "bg-yellow-100 text-gray-700"
                      : "hover:bg-yellow-100 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setRating(3);
                  }}
                >
                  <IconImage src={yellowStart} size={24} />
                  <h1 className="text-md  ">3.0 +</h1>
                </button>{" "}
                <button
                  className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
                    rating === 4
                      ? "bg-green-200   "
                      : "hover:bg-green-200 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setRating(4);
                  }}
                >
                  <IconImage src={greenStar} size={24} />
                  <h1 className="text-md font-bold  ">4.0 +</h1>
                </button>
                <button
                  className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
                    rating === 5
                      ? "bg-[#81d7fe]   "
                      : "hover:bg-[#81d7fe] hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setRating(5);
                  }}
                >
                  <IconImage src={blueStart} size={24} />
                  <h1 className="text-md font-bold  ">5.0 </h1>
                </button>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h1 className={`${font16} font-medium`}>Country</h1>
              <div className="flex gap-4 items-center">
                <OptionSelect
                  label="Select a country"
                  options={countries}
                  className={`text-gray-600 ${font14} h-10`}
                  onChange={setCountry}
                  value={country}
                />
                <Input
                  placeholder="City or Zip code"
                  className="text-gray-600 text-sm h-10"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Profile Status Filter */}
            <div className="flex gap-4 justify-between">
              <div className="space-y-2">
                <h1 className={`${font16} font-medium`}>Profile Status</h1>
                <div className="flex items-center justify-between space-x-2 w-44">
                  <label
                    htmlFor="claimed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Claimed
                  </label>
                  <Checkbox
                    className="w-5 h-5 rounded-full"
                    id="claimed"
                    onCheckedChange={setClaimed}
                    checked={claimed}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className={`${font16} font-medium`}>Open Now</h1>
                <Button className="flex items-center gap-1">
                  <AiOutlineClockCircle className="text-sm md:text-lg" />
                  <span className="text-xs md:text-[16px] font-bold">
                    Open Now
                  </span>
                </Button>
              </div>
            </div>
          </form>

          {/* Business Profile Section */}
          <div className="col-span-5 border-2 rounded-md p-6 space-y-4">
            {isLoading && loadingPlaceholder}

            {!isLoading && businessProfiles.length > 0 && (
              <>
                {businessProfiles.map((businessProfile) => (
                  <div
                    className="border rounded-md space-y-4"
                    key={businessProfile.username}
                  >
                    <BusinessProfileCard
                      businessProfile={businessProfile}
                      id={businessProfile.username}
                    />
                  </div>
                ))}
                <div className="flex">
                  <OptionSelect
                    options={limitOptions}
                    className="max-w-24"
                    label="Select a Limit"
                    onChange={setLimit}
                    value={limit}
                  />
                  <PaginationComponent
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={data?.totalPages}
                  />
                </div>
              </>
            )}

            {!isLoading && businessProfiles.length === 0 && <Notfound />}
            {error && !isLoading && <Error error={error} />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
