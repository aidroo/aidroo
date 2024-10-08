"use client";

import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PhoneCountry from "@/components/PhoneNumberInput/PhoneCountry";
import SelectComponent from "@/components/SelectInput";
import SingleFileUpload from "@/components/SingleFileUpload";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14 } from "@/constant";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BusinessProfileUpdatedForm({
  categories,
  subcategories,
  profile,
  username
}) {
  const router = useRouter();
 

  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((cat) => cat.name === profile?.category) || null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState( subcategories.find((subcat) => subcat.name === profile?.subcategory) || null);
  const [uploadUrl, setUploadUrl] = useState(profile?.profileThumb);
 
  const [loading, setLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const [formState, setFormState] = useState({
    businessName: profile?.businessName || "",
    category: profile?.category || "",
    subcategory: profile?.subcategory || "",
    country: profile?.country || "",
    phoneNumber: profile?.phoneNumber || "",
    address: profile?.address || "",
    city: profile?.city || "",
    description: profile?.description || "",
    funds: profile?.funds || "",
    employees: profile?.employees || "",
    profileThumb: uploadUrl || "",
  });

  const query = new URLSearchParams();

  useEffect(() => {
    if (selectedCategory) {
      query.set("category_id", selectedCategory?.id);
    }

    // Check if username is provided, and if not, use current user's username
    if (username) {
      query.set("username", username);
      // Push the updated URL only if the username was not already provided
      router.push(`/business_dashboard/business_info?${query.toString()}`, {
        shallow: true,
      });
    }
    // Reset subcategory when category is changed
  }, [selectedCategory, router, username]);

  const handleInputChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");
    setApiSuccess("");
    try {
      setLoading(true);
   const response=   await axiosInstance.put(`/api/user/${username}`, {
        ...formState,
        username: username,
        role: "business",
        profileThumb: uploadUrl,
        category:selectedCategory.name,
        subcategory:selectedSubcategory.name
      });
 
      if(response?.data?.status===201){
        setApiSuccess(response?.data?.message)
      }
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-6">
      {/* image uploaded */}
      <h1 className="text-xl text-gray-700">Profile Details</h1>
      <hr />

      <SingleFileUpload uploadUrl={uploadUrl} setUploadUrl={setUploadUrl} username={username} />

      {/* profile update */}
      <div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full">
            <Input
              type="text"
              placeholder="Business Name"
              value={formState.businessName}
              className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OptionSelect
              label="Select a country"
              options={countries}
              className={`text-gray-600 ${font14} h-10`}
              onChange={(value) => handleInputChange("country", value)}
              value={formState.country}
            />
            <PhoneCountry
              setPhone={(value) => handleInputChange("phoneNumber", value)}
              value={formState.phoneNumber}
            />
            <Input
              type="text"
              placeholder="City"
              className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
              onChange={(e) => handleInputChange("city", e.target.value)}
              value={formState.city}
            />
            <Input
              type="text"
              placeholder="Address"
              className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
              onChange={(e) => handleInputChange("address", e.target.value)}
              value={formState.address}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Funds"
              className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
              onChange={(e) => handleInputChange("funds", e.target.value)}
              value={formState.funds}
            />
            <Input
              type="number"
              placeholder="Employees"
              className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
              onChange={(e) => handleInputChange("employees", e.target.value)}
              value={formState.employees}
            />
          </div>

          <Textarea
            placeholder="Tell people about your business"
            className="bg-white dark:bg-gray-800 h-10 text-xs md:text-sm"
            value={formState.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          {apiError && <h1 className="text-red-300">{apiError}</h1>}
          {apiSuccess && <h1 className="text-green-300">{apiSuccess}</h1>}

          <Button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
