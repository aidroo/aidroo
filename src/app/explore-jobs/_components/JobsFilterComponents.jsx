/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { Input } from "@/components/ui/input";
import { countries } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobsFilterComponents({
  categories = [],
  subcategories = [],
}) {
  const [active, setActive] = useState("latest"); // State to track active button
  const router = useRouter();

  // State to hold all form values
  const [formState, setFormState] = useState({
    searchInput: "",
    country: "",
    category: 0,
    subcategory: 0,
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState, // Spread the previous state
      [name]: value, // Update the specific field
    }));
  };

  useEffect(() => {
    const query = new URLSearchParams();

    if (formState.searchInput) query.set("search", formState.searchInput);
    if (formState.category) query.set("category_id", formState.category);
    if (formState.country) query.set("country", formState.country);
    if (active) query.set("filter", active);
    if (formState.subcategory)
      query.set("subcategory_id", formState.subcategory);

    router.push(`/explore-jobs?${query.toString()}`, {
      shallow: true,
    });
  }, [
    formState.category,
    formState.subcategory,
    formState.searchInput,
    formState.country,
    router,
    active,
  ]);

  // Handle button click to set active state
  const handleButtonClick = (buttonName) => {
    setActive(buttonName);
  };

  return (
    <form className="col-span-3">
      <div className="border p-4 rounded-md grid grid-cols-4 gap-x-4 bg-gray-200 my-4">
        {/* Top Feed Button */}
        <div
          onClick={() => handleButtonClick("top")}
          className={`ring-[1px] h-full ring-primary_color py-2 text-center rounded-md cursor-pointer ${
            active === "top"
              ? "bg-primary_color text-white"
              : "hover:bg-primary_color hover:text-white"
          }`}
        >
          Top feed
        </div>

        {/* Latest Feed Button */}
        <div
          onClick={() => handleButtonClick("latest")}
          className={`ring-[1px] h-full ring-primary_color py-2 text-center rounded-md cursor-pointer ${
            active === "latest"
              ? "bg-primary_color text-white"
              : "hover:bg-primary_color hover:text-white"
          }`}
        >
          Latest feed
        </div>

        {/* Business Profile Button */}
        <div
          onClick={() => handleButtonClick("business")}
          className={`col-span-2 ring-[1px] h-full ring-primary_color py-2 text-center rounded-md cursor-pointer ${
            active === "business"
              ? "bg-primary_color text-white"
              : "hover:bg-primary_color hover:text-white"
          }`}
        >
          Business profile
        </div>
      </div>

      <div className="border rounded-md shadow p-4 space-y-4">
        {/* Search Input */}
        <Input
          type="text"
          name="searchInput"
          placeholder="What are you looking for?"
          value={formState.searchInput}
          onChange={handleInputChange}
          className="text-gray-600 h-10"
        />

        {/* Category Filter */}
        <div>
          <select
            name="category"
            value={formState.category}
            onChange={handleInputChange}
            className="h-10 px-2 w-full border rounded-md focus:rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <select
            name="subcategory"
            value={formState.subcategory}
            onChange={handleInputChange}
            className="h-10 px-2 w-full border rounded-md focus:rounded-md"
          >
            <option value="">All Subcategories</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.name} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ms:flex items-center px-1 rounded-lg space-x-4 mx-auto">
          <select
            name="country"
            value={formState.country}
            onChange={handleInputChange}
            className="text-base text-gray-800 outline-none border px-1 py-1 rounded-lg w-full h-10" // Set the select height to h-12
          >
            <option value="">Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name} className="option-item">
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
