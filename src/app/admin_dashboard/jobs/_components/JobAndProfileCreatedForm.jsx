"use client";

import { Combobox } from "@/components/Combobox";
import MultipleImageUpload from "@/components/MultipleImageUpload";
import PersonalProfileCreatedForm from "@/components/PersonalProfileCreatedForm";
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
  const [uploadUrl, setUploadUrl] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
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
    images: uploadUrl,
    tags: [],
    status: "approved",
  });

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    address: "",
    role: "personal",
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
      status: "approved",
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
    setUploadUrl([]);
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
    router.push(`/admin_dashboard/jobs?${query.toString()}`);
  }, [selectedCategory, router, jobData.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess("");
      setError("");
      setLoading(true);

      const user = await axiosInstance.post("/api/user", {
        ...userData,
        profileThumb: avatar,
      });

      if (user) {
        await axiosInstance.post("/api/jobs", {
          ...jobData,

          username: currentUser?.username || userData.username,
          images: uploadUrl,
        });
      }

      setSuccess(
        "Pending ! we are review your job and sent email for profile verification!"
      );

      router.push(`/explore-jobs`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      resetForm();
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setHashtags([]);
      setUploadUrl([]);
      setAvatar("");
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
                priority={true}
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
        <DialogContent className="border border-red-500 h-screen overflow-y-auto">
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
                      required
                    />
                    <div className="flex items-center px-1 rounded-lg space-x-4 mx-auto">
                      <select
                        name="currency"
                        value={jobData.currency}
                        onChange={handleInputChange}
                        className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg max-h-24"
                        required
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
                      required
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
                      required
                    />
                    <div className="ms:flex items-center px-1 rounded-lg space-x-4 mx-auto">
                      <select
                        name="country"
                        value={jobData.country}
                        onChange={handleInputChange}
                        className="text-base text-gray-800 outline-none border-2 px-1 py-1 rounded-lg"
                        required
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
                      required
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

              <MultipleImageUpload
                setUploadUrl={setUploadUrl}
                uploadUrl={uploadUrl}
              />
              {/* Submit Button */}
            </div>
            {/* profile */}

            <PersonalProfileCreatedForm
              userData={userData}
              setUserData={setUserData}
              avatar={avatar}
              setAvatar={setAvatar}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />

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
        </DialogContent>
      </Dialog>
    </>
  );
}
