"use client";
import { Combobox } from "@/components/Combobox";
import IconImage from "@/components/IconImage/IconImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { countries, font14, font16 } from "@/constant";
import axiosInstance from "@/lib/axios";
import blueStr from "@/public/images/star/blue.svg";
import greenStr from "@/public/images/star/green.svg";
import yellowStr from "@/public/images/star/yellow.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function BusinessProfileFiltering({
  categories,
  searchQuery,
  categoryFilter,
  countryFilter,
  subcategoryFilter,
  claimedStatus,
  searchCity,
  openNowFilter,
}) {
  const router = useRouter();

  // State
  const [subcategories, setSubcategories] = useState([]);
  // const [category, setCategory] = useState(categoryFilter || "");
  const [search, setSearch] = useState(searchQuery || "");
  const [subcategory, setSubcategory] = useState(subcategoryFilter || "");
  const [country, setCountry] = useState(countryFilter || "");
  const [rating, setRating] = useState(0);
  const [city, setCity] = useState(searchCity || "");
  const [claimedStatues, setClaimedStatus] = useState(claimedStatus || false);
  const [openNow, setOpenNow] = useState(openNowFilter || false);
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFilter || null
  );
  // Effect to fetch subcategories based on selected category name
  useEffect(() => {
    if (selectedCategory?.name) {
      const getSubcategories = async () => {
        try {
          const response = await axiosInstance.get("/api/subcategory", {
            params: { categoryId: selectedCategory?.id }, // Fetching subcategories based on selected category name
          });
          setSubcategories(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      getSubcategories();
    } else {
      setSubcategories([]); // Clear subcategories when no category is selected
    }
  }, [selectedCategory?.name]);

  // Effect to update the URL when search parameters change
  useEffect(() => {
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (selectedCategory?.name) query.set("category", selectedCategory?.name);
    if (subcategory) query.set("subcategory", subcategory);
    if (country) query.set("country", country);
    if (rating) query.set("rating", rating);
    if (rating) query.set("rating", rating);
    if (city) query.set("city", city);
    if (claimedStatues) query.set("claimed", claimedStatues);
    if (openNow) query.set("openNow", openNow);

    router.push(`/business?${query.toString()}`, {
      shallow: true,
    });
  }, [
    search,
    selectedCategory?.name,
    subcategory,
    country,
    rating,
    city,
    claimedStatues,
    // openNow,
  ]);

  return (
    <form className=" col-span-3 border-2 rounded-md shadow p-4 space-y-4">
      {/* <h1 className={`${font16} font-medium`}>Search Listings</h1> */}

      <div className="space-y-3 md:space-y-6">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="What are you looking for?"
          className={`text-gray-600 ${font14} h-10`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        {/* <div>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 px-2 w-full border rounded-md focus:rounded-md"
          >
            <option value="">All Categories</option>
            {categories?.length > 0 &&
              categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div> */}

        {/* 00 */}

        <Combobox
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          options={categories}
          placeholder=" Selected Category"
        />

        {/* Subcategory Filter */}
        <div>
          <select
            name="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="h-10 px-2 w-full border rounded-md focus:rounded-md"
          >
            <option value="">All Subcategories</option>
            {subcategories?.length > 0 &&
              subcategories.map((subcategory) => (
                <option key={subcategory.name} value={subcategory.name}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>
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
            <h1 className="text-md">Any</h1>
          </button>
          <button
            className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
              rating === 3
                ? "bg-yellow-100"
                : "hover:bg-yellow-100 hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(3);
            }}
          >
            <IconImage src={yellowStr} size={24} />
            <h1 className="text-md">3.0 +</h1>
          </button>
          <button
            className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
              rating === 4
                ? "bg-green-200"
                : "hover:bg-green-200 hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(4);
            }}
          >
            <IconImage src={greenStr} size={24} />
            <h1 className="text-md font-bold">4.0 +</h1>
          </button>
          <button
            className={`${font14} text-gray-700 font-semibold border-r flex justify-center items-center cursor-pointer gap-2 ${
              rating === 5
                ? "bg-[#81d7fe]"
                : "hover:bg-[#81d7fe] hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(5);
            }}
          >
            <IconImage src={blueStr} size={24} />
            <h1 className="text-md font-bold">5.0</h1>
          </button>
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <h1 className={`${font16} font-medium`}>Country</h1>
        <div className="flex gap-4 items-center">
          <div className="w-full">
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-10 px-2 w-full border rounded-md focus:rounded-md"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            placeholder="City or Zip code"
            className="text-gray-600 text-sm h-10"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      {/* Profile Status Filter */}
      <div className="flex gap-4 justify-between">
        <div className="space-y-2">
          <h1 className={`${font16} font-medium`}>Profile Status</h1>
          <div className="flex items-center justify-between space-x-2 w-44">
            <label htmlFor="claimed" className="text-sm font-medium">
              Claimed
            </label>
            <Checkbox
              className="w-5 h-5 rounded-full"
              id="claimed"
              onCheckedChange={setClaimedStatus}
              checked={claimedStatues}
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className={`${font16} font-medium`}>Open Now</h1>
          <Button
            disabled
            className={`flex items-center gap-1 ${
              openNow
                ? "bg-[#81d7fe] text-white"
                : "hover:bg-[#81d7fe] hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenNow(!openNow);
            }}
          >
            <AiOutlineClockCircle className="text-sm md:text-lg" />
            <span className="text-xs md:text-[16px] font-bold">Open Now</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
