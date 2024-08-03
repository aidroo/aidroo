"use client";
import logo from "@/asserts/aidroo-logo.svg";
import Heading from "@/components/Heading";
import CustomInput from "@/components/InputComponent/CustomInput";

import Layout from "@/components/Layout/Layout";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { MdOutlineMail } from "react-icons/md";
import { SlLock } from "react-icons/sl";

export default function Login() {
  const { register, handleSubmit, control } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (data) => {
    // submit the form
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", data);

      if (response.status === 201 || response.status === 200) {
        router.push("/");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login">
      <div className=" border shadow dark:bg-dark p-8   space-y-4 max-w-[450px] mx-auto  my-10 rounded-lg">
        <form className="  space-y-8 " onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-32 mx-auto ">
            <Link href="/">
              <ResponsiveImage
                src={logo}
                alt="aidroo logo image"
                width={500}
                height={300}
              />
            </Link>
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
          <CustomInput
            type="password"
            control={control}
            register={register}
            icon={SlLock}
            className="mb-4"
            placeholder=" password"
            name="password"
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="w-4 h-4  " />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Login
            </label>
          </div>
          {error && (
            <p className="text-red-400 bg-red-100 p-2 rounded-md">{error}</p>
          )}
          <Button
            variant="fillButton"
            className="h-10  md:text-xl"
            disabled={loading}
          >
            Login
          </Button>
        </form>
        <div className=" w-full flex flex-col items-center justify-center ">
          <Link href="#" className="  text-primary_color">
            Forgot Password?
          </Link>
        </div>
        <div className=" w-full flex flex-col items-center justify-center ">
          <Heading className="text-sm">
            Not signed up?{" "}
            <Link href="/signup" className="  text-primary_color">
              Signup
            </Link>
          </Heading>
        </div>
      </div>
    </Layout>
  );
}
