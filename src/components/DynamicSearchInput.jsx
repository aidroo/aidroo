"use client";
import { font16 } from "@/constant";
import { brifcaseIcon, brifcaseIcon4, verifiedIcon } from "@/exportImage";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import IconImage from "./IconImage/IconImage";
import TitleNameAndVerified from "./TitleNameAndVerified";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";

export default function DynamicSearchInput() {
  const [selectedValue, setSelectedValue] = useState("business");

  const handleValueChange = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (query) => {
    setSearch(query);
    if (query.length > 2) {
      try {
        // Fetch results from your API
        const response = await axiosInstance.get(
          `/api/user?businessName=${search}`
        );
        // console.log(response.data.user);

        console.log(response);
        setResults(response?.data?.user);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleResultClick = () => {
    // Navigate to filtering page with the selected item's data
    router.push(`/business?search=${search}`);
  };

  return (
    <div className="w-full max-w-md bg-gray-50 shadow-md rounded-md border overflow-hidden">
      <div className="flex">
        <Input
          className="w-full rounded-md bg-gray-50 text-gray-700 leading-tight focus:outline-none py-2 px-2 border-none focus-visible:ring-0 h-10"
          id="search"
          type="text"
          placeholder="Search Jobs"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Select
          value={selectedValue}
          onValueChange={handleValueChange}
          className="focus:ring-ring"
        >
          <SelectTrigger className="w-fit px-2 h-10 rounded-none focus:ring-0 bg-gray-50 border-none shadow-none">
            {selectedValue === "business" && (
              <Image src={brifcaseIcon} className="w-6" />
            )}
            {selectedValue === "job" && (
              <Image src={brifcaseIcon4} className="w-6" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="business">
                <div className="flex items-center gap-6 border-b pb-2">
                  <IconImage
                    src={brifcaseIcon}
                    size={32}
                    alt="notification icon"
                  />
                  <p className={`${font16} text-gray-700`}>Business</p>
                </div>
              </SelectItem>
              <SelectItem value="job">
                <div className="flex items-center gap-6 border-b pb-2">
                  <IconImage
                    src={brifcaseIcon4}
                    size={32}
                    alt="notification icon"
                  />
                  <p className={`${font16} text-gray-700`}>Jobs</p>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {results.length > 0 &&
        results.map((profile) => {
          const roundedRating =
            Math.round(profile.businessProfile.rating * 10) / 10;

          return (
            <div className=" text-sm border-b" key={profile}>
              <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-1 my-2">
                <div className="  font-medium px-2 flex flex-col">
                  <Link href={`/business/${profile.username}`}>
                    <TitleNameAndVerified
                      title={profile.businessProfile.businessName}
                      verified={profile.businessProfile.verified}
                      isShown={true}
                    />
                  </Link>
                  {profile.businessProfile.totalReviews && (
                    <div className="flex items-center text-[16px] gap-x-4  mt-1">
                      <div className="flex gap-x-4 items-center">
                        {profile.businessProfile.totalReviews} Reviews
                      </div>
                      <div className="flex  gap-x-2">
                        <GoDotFill className={` text-primary_color`} />
                        <span
                          className={`${
                            roundedRating < 3
                              ? "bg-red-400"
                              : roundedRating < 4
                              ? "bg-yellow-300"
                              : roundedRating < 5
                              ? "bg-primary_color"
                              : " "
                          } px-1 flex `}
                        >
                          {" "}
                          {profile.businessProfile.rating}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {profile.businessProfile.verified && (
                  <div className="text-sm font-normal text-gray-500 tracking-wide">
                    <span className="inline-block align-baseline ms-2">
                      <Image src={verifiedIcon} className="w-5 inline-block" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

      {results.length > 0 && (
        <div className="flex justify-center py-2">
          <button
            className="bg-blue-500 w-2/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  "
            onClick={handleResultClick}
          >
            Show all results
          </button>
        </div>
      )}
    </div>
  );
}
