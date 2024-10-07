"use client";

import ImageComponent from "@/components/ImageComponent";
import MultiFileUpload from "@/components/MultiFileUpload";
import PersonalProfileCreatedForm from "@/components/PersonalProfileCreatedForm";
import SelectComponent from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function JobsAndProfileCreatedForm({
  categories,
  subcategories,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [inputValue, setInputValue] = useState(""); // for hashtag input
  const [hashtags, setHashtags] = useState([]); // to store hashtags
  const [uploadUrls, setUploadUrls] = useState([]);
  const [uploadUrl, setUploadUrl] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    address: "",
    status: "approved",
    role: "personal",
  });
  const [jobData, setJobData] = useState({
    username: currentUser?.username,
    title: " ",
    description: " ",
    price: 0,
    category_id: null,
    subcategory_id: null,
    priceType: "negotiable",
    currency: "USD",
    location: "",
    country: "",
    startDate: "",
    endDate: "",
    images: uploadUrls,
    tags: [],
    status: "pending",
  });

  const resetForm = () => {
    setJobData({
      username: currentUser?.username || "",
      title: "",
      description: "",
      price: null,
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

    setUserData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      country: "",
      city: "",
      address: "",
      role: "personal",
    });

    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setHashtags([]);
    setUploadUrls([]);
  };

  // Handle input change for text fields jobs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({ ...prevState, [name]: value }));
  };
  // handle change of profile

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess("");
      setError("");
      setLoading(true);

      if (!currentUser?.username) {
        const user = await axiosInstance.post("/api/user", {
          ...userData,
          profileThumb: uploadUrl,
        });

        if (user?.data?.status !== 201) {
          setError(user?.data?.message);
          return
        }
      }

      await axiosInstance.post("/api/jobs", {
        ...jobData,

        country:selectedCountry?.name,

        username: currentUser?.username || userData?.username,
        images: uploadUrls,
      });

      setSuccess("Pending! we wre reviewing your jobs");
      resetForm();
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setHashtags([]);
      setUploadUrls([]);
      setUploadUrl("");
      router.refresh(`/explore-jobs`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" border rounded-md p-2">
      <button
        className="w-full  flex justify-between items-center bg-slate-100 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <div className="my-2 px-2">
          <ImageComponent
            src={currentUser?.profile?.profileThumb || profileImage}
            alt="profile image"
            width="60px"
            height="60px"
            priority={true}
            className="rounded-full  "
          />
        </div>
        <div className=" text-primary_color  rounded-full mr-4 cursor-pointer flex items-center px-4">
          Post a job{" "}
          {/* {currentUser?.profile?.businessName ||
              currentUser?.profile?.fullName} */}
        </div>
        <FaRegEdit
          size={24}
          className="justify-self-end mr-4  text-primary_color"
        />
      </button>

      {open && (
        <div className=" ">
          <form onSubmit={handleSubmit}>
            <div className="w-full rounded-lg mt-4 flex flex-col space-y-4 mb-8">
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
                  required
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  className={`${font14} min-h-32`}
                  placeholder="Enter your job description"
                    required
                />
              </div>

              {/* Pricing Section */}
              <div className="flex gap-x-4 items-start">
                <div className="w-14 -mt-2">
                  <Image src={moneyBag} alt="moneyBag" priority={true} />
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
                        className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg max-h-24"
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
                    <SelectComponent
                      options={categories}
                      value={selectedCategory?.name || ""}
                      onChange={(value) =>
                        setSelectedCategory(
                          categories.find((cat) => cat.name === value)
                        )
                      }
                      placeholder="Category"
                    />
                  </div>
                  <div>
                    <SelectComponent
                      options={subcategories}
                      value={selectedSubcategory?.name || ""}
                      onChange={(value) =>
                        setSelectedSubcategory(
                          subcategories.find((sub) => sub.name === value)
                        )
                      }
                      placeholder="Subcategory"
                    />
                  </div>
                </div>
              </div>

              {/* Location and Country */}
              <div className="flex gap-x-4 items-start">
                <div className="w-14 -mt-2">
                  <Image
                    src={locationIcon}
                    alt="locationIcon"
                    priority={true}
                    width={500}
                    height={300}
                  />
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
                      <SelectComponent
                        options={countries}
                        value={selectedCountry?.name || ""}
                        onChange={(value) =>
                          setSelectedCountry(
                            countries.find((c) => c.name === value)
                          )
                        }
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* calendar */}
              <div className="flex gap-x-4 items-start">
                <div className="w-14 -mt-2">
                  <Image src={schedule} alt="scheduleIcon" priority={true} />
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
                  <Image src={hashtag} alt="hashtag" priority={true} />
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

              <MultiFileUpload
                uploadUrls={uploadUrls}
                setUploadUrls={setUploadUrls}
              />
              {/* Submit Button */}
            </div>
            {/* profile */}

            {!currentUser?.username && (
              <PersonalProfileCreatedForm
                userData={userData}
                setUserData={setUserData}
                uploadUrl={uploadUrl}
                setUploadUrl={setUploadUrl}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            )}

            {error && (
              <p className="text-red-400 bg-red-100 p-2 rounded-md">{error}</p>
            )}
            {success && (
              <h1 className="text-green-300 bg-green-50 p-2">{success}</h1>
            )}
            <div className="flex items-center justify-end">
              <Button className="rounded-lg w-full px-4 py-2">
                {loading ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
