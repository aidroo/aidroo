"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobsFilterComponents({
  categories = [],
  subcategories = [],
}) {
  const router = useRouter();
  // State to hold all form values
  const [formState, setFormState] = useState({
    searchInput: "",
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
    if (formState.subcategory)
      query.set("subcategory_id", formState.subcategory);

    router.push(`/explore-jobs?${query.toString()}`, {
      shallow: true,
    });
  }, [
    formState.category,

    formState.subcategory,
    formState.searchInput,
    router,
  ]);

  console.log(formState);
  return (
    <form className="col-span-3 border-2 rounded-md shadow p-4 space-y-4">
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
    </form>
  );
}

// Effect to fetch subcategories based on selected category name
//   useEffect(() => {
//     if (selectedCategory?.name) {
//       const getSubcategories = async () => {
//         try {
//           const response = await axiosInstance.get("/api/subcategory", {
//             params: { categoryId: selectedCategory?.id }, // Fetching subcategories based on selected category name
//           });
//           setSubcategories(response.data?.data || []);
//         } catch (error) {
//           console.error("Error fetching subcategories:", error);
//         }
//       };

//       getSubcategories();
//     } else {
//       setSubcategories([]); // Clear subcategories when no category is selected
//     }
//   }, [selectedCategory?.name]);

// Effect to update the URL when search parameters change
//   useEffect(() => {
//     const query = new URLSearchParams();

// if (search) query.set("search", search);
// if (selectedCategory?.name) query.set("category", selectedCategory?.name);
// if (subcategory) query.set("subcategory", subcategory);
// if (country) query.set("country", country);
// if (rating) query.set("rating", rating);
// if (rating) query.set("rating", rating);
// if (city) query.set("city", city);
// if (claimedStatues) query.set("claimed", claimedStatues);
// if (openNow) query.set("openNow", openNow);

//     router.push(`/business?${query.toString()}`, {
//       shallow: true,
//     });
//   }, [
//     selectedCategory?.name,

//     // openNow,
//   ]);

//   {/* Rating Filter */}
//   <div>
//   <h1 className={`${font16} font-medium`}>Rating</h1>
// </div>

// {/* Location Filter */}
// <div>
//   <h1 className={`${font16} font-medium`}>Country</h1>
//   <div className="flex gap-4 items-center">
//     <div className="w-full">
//       <select
//         name="country"
//         //   value={country}
//         //   onChange={(e) => setCountry(e.target.value)}
//         className="h-10 px-2 w-full border rounded-md focus:rounded-md"
//       >
//         <option value="">All Countries</option>
//         {countries.map((country) => (
//           <option key={country.name} value={country.name}>
//             {country.name}
//           </option>
//         ))}
//       </select>
//     </div>
//     <Input
//       placeholder="City or Zip code"
//       className="text-gray-600 text-sm h-10"
//       // value={city}
//       // onChange={(e) => setCity(e.target.value)}
//     />
//   </div>
// </div>

// {/* Profile Status Filter */}
// <div className="flex gap-4 justify-between">
//   <div className="space-y-2">
//     <h1 className={`${font16} font-medium`}>Profile Status</h1>
//     <div className="flex items-center justify-between space-x-2 w-44">
//       <label htmlFor="claimed" className="text-sm font-medium">
//         Claimed
//       </label>
//       <Checkbox
//         className="w-5 h-5 rounded-full"
//         id="claimed"
//         //   onCheckedChange={setClaimedStatus}
//         //   checked={claimedStatues}
//       />
//     </div>
//   </div>
//   <div className="space-y-2">
//     <h1 className={`${font16} font-medium`}>Open Now</h1>
//     {/* <Button
//       disabled
//       className={`flex items-center gap-1 ${
//         openNow
//           ? "bg-[#81d7fe] text-white"
//           : "hover:bg-[#81d7fe] hover:text-white"
//       }`}
//       onClick={(e) => {
//         e.preventDefault();
//         setOpenNow(!openNow);
//       }}
//     >
//       <AiOutlineClockCircle className="text-sm md:text-lg" />
//       <span className="text-xs md:text-[16px] font-bold">Open Now</span>
//     </Button> */}
//   </div>
// </div>
