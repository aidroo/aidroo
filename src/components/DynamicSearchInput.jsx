import { font16 } from "@/constant";
import { brifcaseIcon, brifcaseIcon4 } from "@/exportImage";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  // Debouncing logic using useEffect
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch(search);
    }, 500); // Adjust the delay (in milliseconds) as needed

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  const handleSearch = async (query) => {
    try {
      if (query) {
        const response = await axiosInstance.get(
          `/api/user?businessName=${query}`
        );

        setResults(response?.data?.businessProfiles || []);
        setShow(true);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  const handleResultClick = () => {
    router.push(`/business?search=${search}`);
  };

  return (
    <div
      className="w-full  bg-gray-50 shadow-md rounded-md border overflow-hidden"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="flex">
        <Input
          className="w-full rounded-md bg-gray-50 text-gray-700 leading-tight focus:outline-none py-2 px-2 border-none focus-visible:ring-0 h-10"
          id="search"
          type="text"
          placeholder="Search Business"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // Directly updating the search state
        />

        <Select
          value={selectedValue}
          onValueChange={handleValueChange}
          className="focus:ring-ring"
          align="end"
        >
          <SelectTrigger className="w-fit px-2 h-10 rounded-none focus:ring-0 bg-gray-50 border-none shadow-none">
            {selectedValue === "business" && (
              <Image
                src={brifcaseIcon}
                className="w-6"
                alt="bordercategoriesIcon"
              />
            )}
            {selectedValue === "job" && (
              <Image
                src={brifcaseIcon4}
                className="w-6"
                alt="bordercategoriesIcon"
              />
            )}
          </SelectTrigger>
          <SelectContent className="" align="end">
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

      {show &&
        results.length > 0 &&
        results.map((profile) => {
          const roundedRating = Math.floor(profile.averageRating * 10) / 10;
          console.log(roundedRating);
          return (
            <div className=" text-sm border-b" key={profile.username}>
              <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-1 my-2">
                <div className="  font-medium px-2 flex flex-col">
                  <Link href={`/business/reviews/${profile.username}`}>
                    <TitleNameAndVerified
                      title={profile.businessProfile.businessName}
                      verified={profile.businessProfile.verified}
                      isShown={true}
                    />

                    <div className="flex items-center text-[16px] gap-x-4  mt-1">
                      <div className="flex gap-x-4 items-center">
                        {profile.totalReviews || 0} Reviews
                      </div>
                      <div className="flex  gap-x-2">
                        <GoDotFill className={` text-primary_color`} />
                        <span
                          className={`${
                            roundedRating < 3
                              ? "bg-red-400"
                              : roundedRating < 4
                              ? "bg-yellow-300"
                              : roundedRating <= 5
                              ? "bg-primary_color text-white"
                              : "  "
                          } px-1 flex rounded-sm`}
                        >
                          {profile.averageRating || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* {profile.businessProfile.verified && (
                  <div className="text-sm font-normal text-gray-500 tracking-wide">
                    <span className="inline-block align-baseline ms-2">
                      <Image src={verifiedIcon} className="w-5 inline-block" />
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          );
        })}

      {show && results.length > 0 && (
        <div className="flex justify-center py-2">
          <button
            className="bg-blue-500 w-2/3 hover:bg-blue-700 text-white  py-2 px-4 rounded-full"
            onClick={handleResultClick}
          >
            Show all results
          </button>
        </div>
      )}
    </div>
  );
}
