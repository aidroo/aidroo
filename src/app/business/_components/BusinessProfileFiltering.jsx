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
  verifiedStatus,
  searchCity,
  openNowFilter,
}) {
  const router = useRouter();

  // State management
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState(searchQuery || "");
  const [rating, setRating] = useState(0);
  const [city, setCity] = useState(searchCity || "");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFilter || null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subcategoryFilter || null
  );
  const [selectedCountry, setSelectedCountry] = useState(countryFilter || null);
  const [verified, setVerified] = useState(verifiedStatus || false);
  const [openNow, setOpenNow] = useState(openNowFilter || false);

  // Fetch subcategories when category is selected
  useEffect(() => {
    if (selectedCategory?.id) {
      const getSubcategories = async () => {
        try {
          const response = await axiosInstance.get("/api/subcategory", {
            params: { categoryId: selectedCategory.id },
          });
          setSubcategories(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      getSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  // Update the URL when filters change
  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (selectedCategory?.name) query.set("category", selectedCategory?.name);
    if (selectedSubcategory?.name)
      query.set("subcategory", selectedSubcategory?.name);
    if (selectedCountry?.name) query.set("country", selectedCountry?.name);
    if (rating) query.set("rating", rating);
    if (city) query.set("city", city);
    if (verified) query.set("verified", verified);
    if (openNow) query.set("openNow", openNow);

    router.push(`/business?${query.toString()}`, {
      shallow: true,
    });
  }, [
    search,
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    rating,
    city,
    verified,
    openNow,
  ]);

  return (
    <form className="col-span-3 border rounded-md shadow p-4 space-y-4 h-fit sticky top-20">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="What are you looking for?"
        className={`text-gray-600 ${font14} h-10`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <Combobox
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        options={categories}
        placeholder="Category"
      />

      {/* Subcategory Filter */}
      <Combobox
        selectedCategory={selectedSubcategory}
        setSelectedCategory={setSelectedSubcategory}
        options={subcategories}
        placeholder="Subcategory"
      />

      {/* Rating Filter */}
      <div>
        <h1 className={`${font16} font-medium`}>Rating</h1>
        <div className="border border-r-0 h-11 rounded grid grid-cols-4">
          <button
            className={`text-gray-700 font-semibold border-r flex justify-center items-center gap-2 ${
              rating === 0
                ? "bg-[#81d7fe] text-white"
                : "hover:bg-[#81d7fe] hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(0);
            }}
          >
            <h1>Any</h1>
          </button>
          <button
            className={`text-gray-700 font-semibold border-r flex justify-center items-center gap-2 ${
              rating === 3 ? "bg-yellow-100" : "hover:bg-yellow-100"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(3);
            }}
          >
            <IconImage src={yellowStr} size={24} />
            <h1>3.0 +</h1>
          </button>
          <button
            className={`text-gray-700 font-semibold border-r flex justify-center items-center gap-2 ${
              rating === 4 ? "bg-green-200" : "hover:bg-green-200"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(4);
            }}
          >
            <IconImage src={greenStr} size={24} />
            <h1>4.0 +</h1>
          </button>
          <button
            className={`text-gray-700 font-semibold border-r flex justify-center items-center gap-2 ${
              rating === 5 ? "bg-[#81d7fe]" : "hover:bg-[#81d7fe]"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setRating(5);
            }}
          >
            <IconImage src={blueStr} size={24} />
            <h1>5.0</h1>
          </button>
        </div>
      </div>

      {/* Country and City Filters */}
      <div>
        <h1 className={`${font16} font-medium`}>Country</h1>
        <div className="flex gap-4 items-center">
          <Combobox
            selectedCategory={selectedCountry}
            setSelectedCategory={setSelectedCountry}
            options={countries}
            placeholder="Country"
          />
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
              Verified
            </label>
            <Checkbox
              className="w-5 h-5 rounded-full"
              id="claimed"
              checked={verified}
              onChange={() => setVerified(!verified)}
              disabled // Disable the checkbox
            />
          </div>
        </div>

        {/* Open Now Filter */}
        <div className="space-y-2">
          <h1 className={`${font16} font-medium`}>Open Now</h1>
          <Button
            className={`flex items-center gap-1 ${
              openNow
                ? "bg-[#81d7fe] text-white"
                : "hover:bg-[#81d7fe] hover:text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenNow(!openNow);
            }}
            disabled // Disable the button
          >
            <AiOutlineClockCircle className="text-sm md:text-lg" />
            <span className="text-xs md:text-[16px] font-bold">Open Now</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
