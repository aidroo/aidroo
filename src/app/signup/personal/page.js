// app/signup/personal/PersonalSignup.js (or .jsx)
"use client";
import Heading from "@/components/Heading";
import CustomInput from "@/components/InputComponent/CustomInput";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import PhoneCountry from "@/components/PhoneNumberInput/PhoneCountry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countries, font14 } from "@/constant";
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

export default function PersonalSignup() {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [phone, setPhone] = useState("");
  const [apiError, setApierror] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedUsername = useDebounce(username, 1000);
  const router = useRouter();

  const fetcher = (url) => apiService.singeDataFetching(url);
  const { data, error, isLoading } = useSWR(
    debouncedUsername ? `/api/user?username=${debouncedUsername}` : null,
    fetcher
  );

  const onSubmit = async (data) => {
    data.phoneNumber = phone;
    data.role = "personal";
    data.username = username;
    data.country = country;
    setLoading(true);
    clearErrors();
    setApierror("");

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
      const response = await apiService.addData("/api/user", validData);

      if (response.status === 201) {
        router.push("/login");
      } else {
        setApierror(response.message || "Something went wrong");
      }
    } catch (error) {
      setApierror("Error occurred during registration try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          type="text"
          name="firstName"
          placeholder="First Name"
          control={control}
          register={register}
          className="mb-4"
        />
        <CustomInput
          type="text"
          placeholder="Last name"
          className="mb-4"
          name="lastName"
          control={control}
          register={register}
        />
      </div>
      <div className="w-full flex items-center border gap-2 h-10 rounded-sm overflow-hidden">
        <LuUser2 className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />
        <Input
          type="text"
          placeholder="Username"
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
          <BsCheckCircleFill className="text-primary_color text-2xl mr-2" />
        )}
      </div>
      <CustomInput
        type="email"
        placeholder="Email"
        icon={MdOutlineMail}
        control={control}
        register={register}
        className="mb-4"
        name="email"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          type="password"
          placeholder="Create Password"
          icon={SlLock}
          control={control}
          register={register}
          className={`mb-4 ${errors.confirmPassword ? " border-red-300" : ""}`}
          name="password"
        />
        <CustomInput
          type="password"
          placeholder="Confirm Password"
          icon={SlLock}
          className={`mb-4 ${errors.confirmPassword ? " border-red-300" : ""}`}
          name="confirmPassword"
          control={control}
          register={register}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneCountry setPhone={setPhone} />
        <OptionSelect
          label="Select a country"
          options={countries}
          className={`text-gray-600 ${font14} h-10`}
          onChange={setCountry}
          value={country}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          type="text"
          placeholder="City"
          className="mb-4"
          control={control}
          register={register}
          name="city"
        />
        <CustomInput
          type="text"
          placeholder="address"
          className="mb-4"
          name="address"
          control={control}
          register={register}
        />
      </div>

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
          className="h-10 max-w-64 mx-auto"
          disabled={loading}
        >
          Sign Up
        </Button>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <Heading className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary_color">
            Login
          </Link>
        </Heading>
      </div>
    </form>
  );
}
