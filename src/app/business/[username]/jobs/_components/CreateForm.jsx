"use client";
import { Combobox } from "@/components/Combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14, font16 } from "@/constant";
import {
  bordercategoriesIcon,
  hashtag,
  locationIcon,
  moneyBag,
  schedule,
} from "@/exportImage";
import Image from "next/image";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";

export default function CreateForm({ categories, subcategories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddHashtag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Prevent form submission or page reload
      setHashtags([...hashtags, `#${inputValue.trim()}`]);
      setInputValue(""); // Clear the input after adding a hashtag
    }
  };
  // const { currentUser } = useAuth();
  // const router = useRouter;

  // const [jobData, setJobData] = useState({
  //   username: currentUser?.username,
  //   title: "",
  //   description: "",
  //   price: 0,
  //   category_id: selectedCategory?.id,
  //   subcategory_id: selectedSubcategory?.id,
  //   priceType: "",
  //   currency: "USD",
  //   location: "",
  //   country: "",
  //   startDate: "",
  //   endDate: "",
  //   images: [],
  //   tags: [],
  //   status: "pending",
  // });

  // const query = new URLSearchParams();
  // useEffect(() => {
  //   if (selectedCategory) {
  //     query.set("category_id", selectedCategory?.id);
  //   }
  //   if (jobData.username) {
  //     query.set("username", jobData.username);
  //   }
  //   router.push(`/signup/business?${query.toString()}`, {
  //     shallow: true,
  //   });
  //   // Reset subcategory when category is changed
  // }, [selectedCategory, router, jobData.username]);
  return (
    <div>
      <form>
        <div className="w-full rounded-lg border-2 p-6 flex flex-col space-y-4">
          <h1
            className={`${font16}   text-primary_color flex items-center gap-4`}
          >
            <FaRegEdit /> Post a Job
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Input
              type="text"
              className={`${font14}`}
              placeholder="Enter your job title"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Textarea
              className={`${font14} min-h-32 `}
              placeholder="Enter your job description"
            />
          </div>
          <div className="flex gap-x-4 items-start   ">
            <div className="w-14 -mt-2">
              <Image src={moneyBag} alt="moneyBag " />
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4">
              <div className="sm:flex items-center bg-white rounded-lg overflow-hidden   border h-10 justify-between">
                <input
                  className="text-base text-gray-400 flex-grow outline-none px-2 "
                  type="number"
                  min={0}
                  placeholder=" amount"
                />
                <div className="ms:flex items-center px-1 rounded-lg space-x-4 mx-auto ">
                  <select
                    id="Com"
                    className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                  >
                    <option value="com" selected>
                      Usd
                    </option>
                    <option value="gbp">
                      <IoLogoUsd />
                      Gbp
                    </option>
                    <option value="eur">Eur</option>
                  </select>
                </div>
              </div>
              <div className="sm:flex items-center bg-white rounded-lg overflow-hidden   border h-10 justify-between px-4">
                <label htmlFor="prife">Prices </label>
                <select
                  id="Com"
                  className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                >
                  <option value="com" selected>
                    Negotiate
                  </option>
                  <option value="gbp">Fixed</option>
                </select>
              </div>
            </div>
          </div>

          {/* category and subcategory */}
          <div className="flex gap-x-4 items-start   ">
            <div className="w-14 -mt-2">
              <Image src={bordercategoriesIcon} alt="bordercategoriesIcon" />
            </div>
            <div className=" w-full grid grid-cols-2 gap-4">
              <div className="">
                <Combobox
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  options={categories}
                  className="border-none w-full"
                  placeholder="Category"
                />
              </div>
              <div>
                <Combobox
                  selectedCategory={selectedSubcategory}
                  setSelectedCategory={setSelectedSubcategory}
                  options={subcategories}
                  placeholder="Subcategory"
                  className="border-none w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-x-4 items-start   ">
            <div className="w-14 -mt-2">
              <Image src={locationIcon} alt="bordercategoriesIcon" />
            </div>

            <div className="w-full   ">
              <div className="sm:flex items-center bg-white rounded-lg overflow-hidden   border h-10 justify-between">
                <input
                  className="text-base text-gray-400 flex-grow outline-none px-2 "
                  type="number"
                  min={0}
                  placeholder=" address"
                />

                <div className="ms:flex items-center px-1 rounded-lg space-x-4 mx-auto ">
                  <select
                    id="Com"
                    className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                  >
                    <option value="com" selected>
                      Country
                    </option>
                    {countries.map((country, index) => (
                      <option value="gbp" key={index}>
                        <IoLogoUsd />
                        {country?.name}
                      </option>
                    ))}
                    <option value="eur">Eur</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* calender */}

          <div className="flex gap-x-4 items-start   ">
            <div className="w-14 -mt-2">
              <Image src={schedule} alt="bordercategoriesIcon" />
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4">
              <Input type="date" placeholder="Star Date" />

              <Input type="date" />
            </div>
          </div>

          {/* 
          <Image src={locationIcon} className="w-6 md:w-8" alt="image" />
          <Image src={photoadd} className="w-6 md:w-8" alt="image" /> */}
          {/* image */}
          {/* <div className="flex gap-4 h-32">
            <div className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden">
              <ResponsiveImage
                src={profileImage}
                alt="profile image"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div className=" w-24 md:w-32 h-24 md:h-32 border-2 border-dashed rounded-lg place-content-center">
              <div className="font-semibold text-base rounded p-1 flex flex-col items-center justify-center cursor-pointer mx-auto font-[sans-serif]">
                <CiCirclePlus className="text-6xl text-primary_color" />
                <input type="file" id="uploadFile1" className="hidden" />
              </div>
            </div>
          </div> */}

          <div className="flex gap-x-4 items-start   ">
            <div className="w-14 -mt-2">
              <Image src={hashtag} alt="bordercategoriesIcon" />
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4">
              <div className="flex gap-x-2">
                <div className="col-span-2  ">
                  {hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="inline-block mr-2 rounded-md bg-blue-100 px-2  h-9 mb-2 text-primary_color"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>

                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleAddHashtag}
                  placeholder="Add a hashtag"
                  className="w-28 h-9"
                />
              </div>

              <div className="flex justify-end">
                <h1 className="bg-gray-100 p-1 h-9 w-fit rounded-md text-gray-400">
                  #add hashtag to find your job
                </h1>
              </div>
            </div>
          </div>
          {/* tags */}

          <Button
            variant="hover"
            size="sm"
            className=" max-w-40 mx-auto rounded-full   hover:ring-1 ring-primary_color ring-offset-2 animate-in duration-100 hover:zoom-in-50"
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
