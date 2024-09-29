import Schedule from "@/app/business_dashboard/schedule/page";
import MultipleImageUpload from "@/components/MultipleImageUpload";
import SelectComponent from "@/components/SelectInput";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14, font16 } from "@/constant";
import {
  bordercategoriesIcon,
  hashtag,
  locationIcon,
  moneyBag,
} from "@/exportImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";

export default function JobsCreatedForm({
  jobData,
  handleInputChange,
  categories,
  subcategories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  inputValue,
  setInputValue,
  handleAddHashtag,
  hashtags,
  uploadUrl,
  setUploadUrl,
  selectedCountry,
  setSelectedCountry,
}) {
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams();

    if (selectedCategory) query.set("category_id", selectedCategory?.id);
    // if (formState.country) query.set("country", formState.country);

    router.push(`/explore-jobs?${query.toString()}`, {
      shallow: true,
    });
  }, [selectedCategory, router]);
  return (
    <div className="w-full rounded-lg mt-4 flex flex-col space-y-4 mb-8">
      <h1 className={`${font16} text-primary_color flex items-center gap-4`}>
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
        />
      </div>

      {/* Pricing Section */}
      <div className="flex gap-x-4 items-start">
        <div className="w-14 -mt-2">
          <Image src={moneyBag} alt="moneyBag" property={true} />
        </div>

        <div className="w-full">
          <div className="flex items-center bg-white rounded-lg overflow-hidden border h-10 justify-between">
            <Input
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
              // required
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
          <Image src={bordercategoriesIcon} alt="bordercategoriesIcon" />
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
                  subcategories.find((subcat) => subcat.name === value)
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
              <SelectComponent
                options={countries}
                value={selectedCountry?.name || ""}
                onChange={(value) =>
                  setSelectedCountry(countries.find((c) => c.name === value))
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
          <Image src={Schedule} alt="scheduleIcon" />
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

      <MultipleImageUpload setUploadUrl={setUploadUrl} uploadUrl={uploadUrl} />
      {/* Submit Button */}
    </div>
  );
}
