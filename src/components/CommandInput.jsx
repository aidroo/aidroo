"use client";

import { useRouter } from "next/navigation"; // For Next.js 13+ with app directory
import { useEffect, useState } from "react";
import { Input } from "./ui/input"; // Ensure correct path for Input component

// Reusable SearchBar component with search functionality
export default function ReviewSearchBar({
  searchQuery = "", // Default to empty string if no searchQuery is provided
  placeholder = "Search reviews...", // Default placeholder
}) {
  const router = useRouter();

  // State to hold search parameters
  const [search, setSearch] = useState(searchQuery);

  // Update the URL whenever search input changes
  useEffect(() => {
    const query = new URLSearchParams();

    if (search) {
      query.set("search", search); // Set the query parameter if there's a search value
    } else {
      query.delete("search"); // If search is empty, remove the query param
    }

    // Update the URL with query parameters without a full page reload
    router.push(`/admin_dashboard/reviews?${query.toString()}`);
  }, [search, router]);

  return (
    <div className="w-1/2">
      <Input
        type="text"
        name="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 focus:outline-none px-4 w-full"
      />
    </div>
  );
}
