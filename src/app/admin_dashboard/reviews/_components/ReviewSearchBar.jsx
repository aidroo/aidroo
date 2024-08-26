"use client";

import { Input } from "@/components/ui/input";
import { countries } from "@/constant";
import { useRouter } from "next/navigation"; // For Next.js 13+ with app directory
import { useEffect, useState } from "react";

export default function ReviewSearchBar({
  searchQuery,

  countryFilter,
}) {
  const router = useRouter();

  // State to hold search parameters
  const [search, setSearch] = useState(searchQuery || "");

  const [country, setCountry] = useState(countryFilter || "");

  // Update the URL whenever a change occurs
  useEffect(() => {
    const query = new URLSearchParams();

    if (search) query.set("search", search);

    if (country) query.set("country", country);

    // Update the URL with query parameters without a full page reload
    router.push(`/admin_dashboard/reviews?${query.toString()}`);
  }, [search, country, router]);

  return (
    <div className="w-full">
      <div className="border flex overflow-hidden h-14  rounded-md w-full space-x-4  px-2 items-center">
        <Input
          type="text"
          name="search"
          placeholder="Search comment on title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 focus:outline-none px-4 w-full"
        />

        <select
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-10 px-2"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option value={country.name} key={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
