/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { Combobox } from "@/components/Combobox";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";

export default function JobsFilterComponents({
  categories = [],
  subcategories = [],
 
}) {
  // State to track active button
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
 
  const pathname = usePathname(); // Detects the current URL pathname

  const [formState, setFormState] = useState({
    searchInput: "",
    country: "",
    category: selectedCategory?.id,
    subcategory: selectedSubcategory?.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const query = new URLSearchParams();

    if (formState.searchInput) query.set("search", formState.searchInput);
    if (selectedCategory) query.set("category_id", selectedCategory.id);
    if (selectedSubcategory) query.set("subcategory_id", selectedSubcategory.id);
    

    // Append filter to query if defined

    // Push to the current pathname with updated query parameters
    router.push(`${pathname}?${query.toString()}`, {
      shallow: true,
    });
  }, [
    selectedCategory,
    selectedSubcategory,
    formState.searchInput,
    formState.country,
    router,
    pathname,
  ]);

  return (
    <form className="w-full mx-auto   ">
      <div className="border rounded-md p-2  ">
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
        <div className="flex items-center gap-4 mt-4 ">
          {categories?.length>0&&<Combobox
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            options={categories}
            placeholder="Category"
          />}

          {/* Subcategory Filter */}
         {subcategories?.length>0&& <Combobox
            selectedCategory={selectedSubcategory}
            setSelectedCategory={setSelectedSubcategory}
            options={subcategories}
            placeholder="Subcategory"
          />}
        </div>

        <div className="ms:flex items-center px-1 rounded-lg lg:space-x-4 mx-auto">
          {/* Country Filter (uncomment and pass countries if needed) */}
          {/* <select
            name="country"
            value={formState.country}
            onChange={handleInputChange}
            className="text-base text-gray-800 outline-none border px-1 py-1 rounded-lg w-full h-10"
          >
            <option value="">Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name} className="option-item">
                {country.name}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </form>
  );
}
