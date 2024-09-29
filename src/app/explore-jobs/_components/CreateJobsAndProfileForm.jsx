"use client";
import PersonalProfileCreatedForm from "@/components/PersonalProfileCreatedForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { profileImage } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import JobsCreatedForm from "./JobsCreatedForm";

export default function CreateJobsAndProfileForm({
  categories,
  subcategories,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [selectedProfileCountry, setSelectedProfileCountry] = useState(false);
  const [inputValue, setInputValue] = useState(""); // For hashtag input
  const [hashtags, setHashtags] = useState([]); // To store hashtags
  const [uploadUrl, setUploadUrl] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // Job data state
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
    startDate: "", // Default to today
    endDate: "", // Default to 7 days ago
    images: uploadUrl,
    tags: [],
    status: "pending",
  });

  // User data state for creating the user profile
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    city: "",
    address: "",
    role: "personal",
  });

  // Reset the form after submission
  const resetForm = () => {
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
      startDate: null,
      endDate: null,
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
    setUploadUrl([]);
    setAvatar("");
  };

  // Handle input change for jobs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle category and subcategory selection
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

  // Update jobData tags when hashtags change
  useEffect(() => {
    setJobData((prevState) => ({ ...prevState, tags: hashtags }));
  }, [hashtags]);

  // Submit job and profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess("");
      setError("");
      setLoading(true);

      // Create user profile if not already created
      if (!currentUser?.username) {
        await axiosInstance.post("/api/user", {
          ...userData,
          profileThumb: avatar,
          country: selectedProfileCountry.name,
        });
      }

      // Submit job data
      await axiosInstance.post("/api/jobs", {
        ...jobData,
        username: currentUser?.username || userData.username,
        country: selectedCountry.name,
        images: uploadUrl,
      });

      setSuccess(
        "Pending! We are reviewing your job, and you'll receive an email for profile verification."
      );
      resetForm();
      router.push(`/explore-jobs`);
    } catch (error) {
      setError("An error occurred while submitting the job. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="border rounded-md w-full flex items-center justify-between px-4">
          <div className="my-2">
            <Image
              src={currentUser?.profile?.profileThumb || profileImage}
              alt="profile image"
              width={500}
              height={300}
              className="rounded-full h-12 w-12"
            />
          </div>
          <h1 className="text-lg font-semibold text-primary_color">
            Post a job{" "}
            {currentUser?.profile?.businessName ||
              currentUser?.profile?.fullName}
          </h1>
          <FaRegEdit className="text-primary_color text-xl" />
        </div>
      </DialogTrigger>

      <DialogContent className="border border-red-500 h-screen overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Jobs form */}
          <JobsCreatedForm
            jobData={jobData}
            handleInputChange={handleInputChange}
            categories={categories}
            subcategories={subcategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            inputValue={inputValue}
            setInputValue={setInputValue}
            hashtags={hashtags}
            handleAddHashtag={handleAddHashtag}
            uploadUrl={uploadUrl}
            setUploadUrl={setUploadUrl}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          {/* Profile form */}
          {!currentUser?.username && (
            <PersonalProfileCreatedForm
              userData={userData}
              setUserData={setUserData}
              avatar={avatar}
              setAvatar={setAvatar}
              selectedCountry={selectedProfileCountry}
              setSelectedCountry={setSelectedProfileCountry}
            />
          )}
          {/* Success/Error messages */}
          {error && (
            <p className="text-red-400 bg-red-100 p-2 rounded-md">{error}</p>
          )}
          {success && (
            <h1 className="text-green-300 bg-green-50 p-2">{success}</h1>
          )}
          <div className="flex items-center justify-end">
            <Button className="rounded-lg w-full px-4 py-2">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
