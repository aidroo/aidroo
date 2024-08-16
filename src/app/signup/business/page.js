"use client";
import { Combobox } from "@/components/Combobox";
import IconImage from "@/components/IconImage/IconImage";
import CustomInput from "@/components/InputComponent/CustomInput";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PhoneCountry from "@/components/PhoneNumberInput/PhoneCountry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countries, font14 } from "@/constant";
import { category } from "@/exportImage";
import { useDebounce } from "@/hooks/useDebaunce";
import apiService from "@/lib/apiService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import useSWR from "swr";

export default function BusinessPage() {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [phone, setPhone] = useState("");
  const [apiError, setApiError] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const debouncedUsername = useDebounce(username, 500);
  const router = useRouter();
  // user checking with debounce

  // Assuming you have a debounce hook
  const fetcher = (url) => apiService.singeDataFetching(url);
  const { data, error, isLoading } = useSWR(
    debouncedUsername ? `/api/user?username=${debouncedUsername}` : null,
    fetcher
  );

  // fetching category list

  const {
    data: categoryData,
    error: categoryError,

    isLoading: categoryLoading,
  } = useSWR("/api/category", (url) => apiService.getData(url));

  const {
    data: subcategoryData,
    error: subcategoryError,

    isLoading: subcategoryLoading,
  } = useSWR("/api/subcategory", (url) => apiService.getData(url));

  const onSubmit = async (data) => {
    clearErrors();
    setApiError("");
    data.phoneNumber = phone;
    data.role = "business";
    data.username = username;
    data.businessType = "IT";
    data.category = selectedCategory?.name;
    data.subcategory = selectedSubcategory?.name;
    data.country = country;
    // checking password and confirm password match
    const { confirmPassword, ...validData } = data;
    if (data.password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.addData("/api/user", validData);

      if (response.status === 201) {
        router.push("/login");
      } else {
        setApiError(response.message || "Something went wrong");
      }
    } catch (error) {
      setApiError("Error occurred during registration try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="Business Name"
        type="text"
        control={control}
        register={register}
        className="mb-4"
        name="businessName"
      />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`w-full flex items-center border gap-2 h-10 rounded-sm overflow-hidden `}
        >
          <LuUser2 className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />

          <Input
            type="text"
            placeholder="username"
            className="bg-white dark:bg-gray-800 border-none focus-visible:ring-0 flex-grow"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {isLoading && (
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white pr-4 mr-4"
              role="status"
            ></div>
          )}
          {!isLoading && username !== "" && !data?.user && (
            <BsCheckCircleFill className="text-primary_color text-3xl mr-2" />
          )}
        </div>
        <CustomInput
          type="email"
          control={control}
          register={register}
          className="mb-4"
          icon={MdOutlineMail}
          placeholder="Email"
          name="email"
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center border rounded-md ">
          <div className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm flex items-center justify-center">
            <IconImage src={category} size={24} alt="icon" />
          </div>
          <Combobox
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            options={categoryData?.data}
            isLoading={categoryLoading}
            error={categoryError}
            className="border-none"
            placeholder="category"
          />
        </div>
        <div className="flex items-center border rounded-md ">
          <div className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm flex items-center justify-center">
            <IconImage src={category} size={24} alt="icon" />
          </div>
          <Combobox
            selectedCategory={selectedSubcategory}
            setSelectedCategory={setSelectedSubcategory}
            options={subcategoryData?.data}
            isLoading={subcategoryLoading}
            error={subcategoryError}
            placeholder="subcategory"
          />
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          type="password"
          control={control}
          register={register}
          icon={SlLock}
          className={`mb-4 ${errors.confirmPassword ? " border-red-300" : ""}`}
          placeholder="Create password"
          name="password"
        />
        <CustomInput
          type="password"
          control={control}
          register={register}
          icon={SlLock}
          className={`mb-4 ${errors.confirmPassword ? " border-red-300" : ""}`}
          placeholder="Confirm password"
          name="confirmPassword"
        />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneCountry setPhone={setPhone} />
        <OptionSelect
          label="Select a country"
          options={countries}
          className={`text-gray-600 ${font14} h-10`}
          onChange={setCountry}
          value={country}
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          type="text"
          control={control}
          register={register}
          className="mb-4"
          placeholder="City"
          name="city"
        />
        <CustomInput
          type="text"
          control={control}
          register={register}
          className="mb-4"
          placeholder="State"
          name="state"
        />
      </div>
      <CustomInput
        type="text"
        control={control}
        register={register}
        className="mb-4"
        placeholder="State"
        name="zipCode"
      />

      {errors.confirmPassword && (
        <p className="text-red-400">{errors.confirmPassword.message}</p>
      )}
      {apiError && (
        <p className="text-red-400 bg-red-100 p-2 rounded-md">
          {apiError || error}
        </p>
      )}
      <div className="flex items-center justify-center pt-2">
        <Button
          variant="fillButton"
          className="h-10  max-w-64 mx-auto"
          disabled={loading}
        >
          Sign Up
        </Button>
      </div>
      <div className=" w-full flex flex-col items-center justify-center ">
        <p className="text-sm">
          Already have an account?
          <Link href="/login" className=" text-primary_color">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
