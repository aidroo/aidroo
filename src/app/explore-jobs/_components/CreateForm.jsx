"use client";
import { Combobox } from "@/components/Combobox";
import FileUploadComponent from "@/components/FileUploadComponent";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14, font16 } from "@/constant";
import {
  bordercategoriesIcon,
  hashtag,
  locationIcon,
  moneyBag,
  profileImage,
  schedule,
} from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function CreateForm({ categories, subcategories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [inputValue, setInputValue] = useState(""); // for hashtag input
  const [hashtags, setHashtags] = useState([]); // to store hashtags
  const [uploadUrl, setUploadUrl] = useState([]);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { currentUser } = useAuth();

  const [jobData, setJobData] = useState({
    username: currentUser?.username || "",
    title: "",
    description: "",
    price: 0,
    category_id: null,
    subcategory_id: null,
    priceType: "negotiable",
    currency: "USD",
    location: "",
    country: "",
    startDate: "",
    endDate: "",
    images: uploadUrl,
    tags: [],
    status: "pending",
  });

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle category and subcategory changes
  useEffect(() => {
    setJobData((prevState) => ({
      ...prevState,
      category_id: selectedCategory?.id || null,
      subcategory_id: selectedSubcategory?.id || null,
    }));
  }, [selectedCategory, selectedSubcategory]);

  // Handle adding hashtags
  const handleAddHashtag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      // Prevent duplicate hashtags
      if (!hashtags.includes(inputValue.trim())) {
        setHashtags([...hashtags, inputValue.trim()]);
      }
      setInputValue(""); // Clear input after adding the hashtag
    }
  };

  // Update tags in jobData when hashtags change
  useEffect(() => {
    setJobData((prevState) => ({ ...prevState, tags: hashtags }));
  }, [hashtags]);

  // Update query string in URL
  const query = new URLSearchParams();
  useEffect(() => {
    if (selectedCategory) {
      query.set("category_id", selectedCategory?.id);
    }
    if (jobData.username) {
      query.set("username", jobData.username);
    }
    router.push(`/explore-jobs?${query.toString()}`);
  }, [selectedCategory, router, jobData.username]);
  const handleUploadUrl = (url) => {
    setUploadUrl((prevUrls) => [...prevUrls, url]); // Append the new URL to the array
  };
  const handledelete = async (url) => {
    const avatarId = url?.substring(url.lastIndexOf("/") + 1)?.split(".")?.[0];

    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        username: currentUser?.username,
        avatarId,
        role: "business",
      });
      setUploadUrl((prevUrls) =>
        prevUrls.filter((currentUrl) => currentUrl !== url)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess("");
      const respose = await axiosInstance.post("/api/jobs", {
        ...jobData,
        images: uploadUrl,
      });

      if (respose.data?.status === 201) {
        setSuccess(respose?.data?.message);
        setJobData({
          username: currentUser?.username || "",
          title: "",
          description: "",
          price: 0,
          category_id: null,
          subcategory_id: null,
          priceType: "negotiable",
          currency: "USD",
          location: "",
          country: "",
          startDate: "",
          endDate: "",

          tags: [],
          status: "pending",
        });
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setHashtags([]);
        setUploadUrl([]);
        router.push(`/explore-jobs`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <div className=" bg-[#f5f5f5]  rounded-md w-full flex items-center">
            <div className="my-2 px-2">
              <Image
                src={currentUser?.profile?.profileThumb || profileImage}
                alt="profile iamge"
                width={500}
                height={300}
                className="rounded-full h-12 w-12"
              />
            </div>
            <div className="bg-gray-200 hover:bg-gray-300 h-12 w-full rounded-full mr-4 cursor-pointer flex items-center px-4">
              write your need{" "}
              {currentUser?.profile?.businessName ||
                currentUser?.profile?.fullName}
            </div>
          </div>
        </DialogTrigger>

        {currentUser?.username ? (
          <DialogContent className="border border-red-500">
            <form onSubmit={handleSubmit}>
              <div className="w-full rounded-lg mt-4 flex flex-col space-y-4">
                <h1
                  className={`${font16} text-primary_color flex items-center gap-4`}
                >
                  <FaRegEdit /> Post a Job
                </h1>
                <div className="flex flex-col items-center justify-center">
                  <Input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    className={`${font14}`}
                    placeholder="Enter your job title"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Textarea
                    name="description"
                    value={jobData.description}
                    onChange={handleInputChange}
                    className={`${font14} min-h-32`}
                    placeholder="Enter your job description"
                  />
                </div>

                {/* Pricing Section */}
                <div className="flex gap-x-4 items-start">
                  <div className="w-14 -mt-2">
                    <Image src={moneyBag} alt="moneyBag" />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center bg-white rounded-lg overflow-hidden border h-10 justify-between">
                      <input
                        name="price"
                        type="number"
                        value={jobData.price}
                        onChange={handleInputChange}
                        min={0}
                        placeholder="Amount"
                        className="text-base text-gray-400 flex-grow outline-none px-2"
                      />
                      <div className="flex items-center px-1 rounded-lg space-x-4 mx-auto">
                        <select
                          name="currency"
                          value={jobData.currency}
                          onChange={handleInputChange}
                          className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                        >
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex mt-4 items-center bg-white rounded-lg overflow-hidden border h-10 justify-between px-4">
                      <label htmlFor="priceType">Price Type</label>
                      <select
                        name="priceType"
                        value={jobData.priceType}
                        onChange={handleInputChange}
                        className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                      >
                        <option value="negotiable">Negotiate</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Category and Subcategory */}
                <div className="flex gap-x-4 items-start">
                  <div className="w-14 -mt-2">
                    <Image
                      src={bordercategoriesIcon}
                      alt="bordercategoriesIcon"
                    />
                  </div>
                  <div className="w-full grid md:grid-cols-2 gap-4">
                    <div>
                      <Combobox
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        options={categories}
                        placeholder="Category"
                        className="border-none w-full"
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

                {/* Location and Country */}
                <div className="flex gap-x-4 items-start">
                  <div className="w-14 -mt-2">
                    <Image src={locationIcon} alt="locationIcon" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center bg-white rounded-lg overflow-hidden border h-10 justify-between">
                      <input
                        name="location"
                        value={jobData.location}
                        onChange={handleInputChange}
                        className="text-base text-gray-400 flex-grow outline-none px-2"
                        placeholder="Address"
                      />
                      <div className="ms:flex items-center px-1 rounded-lg space-x-4 mx-auto">
                        <select
                          name="country"
                          value={jobData.country}
                          onChange={handleInputChange}
                          className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                        >
                          <option value="">Country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* calendar */}
                <div className="flex gap-x-4 items-start">
                  <div className="w-14 -mt-2">
                    <Image src={schedule} alt="scheduleIcon" />
                  </div>
                  <div className="w-full grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="startDate"
                        type="date"
                        value={jobData.startDate}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        name="endDate"
                        type="date"
                        value={jobData.endDate}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Hashtag Section */}
                <div className="flex gap-x-4 items-start">
                  <div className="w-14 -mt-2">
                    <Image src={hashtag} alt="hashtag" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleAddHashtag}
                        placeholder="Enter hashtags (press Enter)"
                        className={`${font14} border-gray-300`}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {hashtags.map((tag, index) => (
                        <div
                          key={index}
                          className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                        >
                          #{tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* image */}
                <div className=" flex  justify-between gap-x-2 mt-4   ">
                  {uploadUrl &&
                    uploadUrl?.map((url) => (
                      <div key={url} className="relative group w-24 h-24">
                        <ResponsiveImage
                          src={url}
                          className="border rounded-md  "
                          alt="review image"
                        />

                        <MdDelete
                          className="absolute top-1 right-0 text-xl text-red-500 hidden group-hover:block"
                          onClick={() => handledelete(url)}
                        />
                      </div>
                    ))}
                </div>
                <FileUploadComponent setUploadUrl={handleUploadUrl} />
                {/* Submit Button */}

                {success && (
                  <h1 className="text-green-300 bg-green-50 p-2">{success}</h1>
                )}
                <div className="flex items-center justify-end">
                  <Button className="rounded-lg w-full px-4 py-2">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        ) : (
          <DialogContent>
            <h1 className="p-2 text-xl ">login to create jobs</h1>

            <Link href="/login">Login</Link>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
