/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import IconImage from "@/components/IconImage/IconImage";
import Rating from "@/components/Rating/Rating";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import userIcon from "@/public/icons/customer-review.gif";

import { options } from "@/constant";
import { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Heading from "../Heading";
import OptionSelect from "../OptionSelect/OptionSelect";
import PhoneCountry from "../PhoneNumberInput/PhoneCountry";

export default function WriteReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState(false);

  const currentUser = {
    role: "admin",
  };

  const handleOpenChange = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className="w-full border-2   rounded-md p-4 text-32 flex justify-between items-center cursor-pointer"
        onClick={handleOpenChange}
      >
        <IconImage src={userIcon} size={50} alt="user" />

        <h1 className="text-primary">Write Review</h1>
        <div className="flex gap-1">
          <Rating />
        </div>
      </div>
      {isOpen && (
        <form className="w-full border-2   rounded-md p-4 space-y-8 ">
          <div className="flex justify-end">
            <div
              className="border    w-8 h-8 rounded-full     text-md  flex justify-center items-center cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <IoClose className="text-xl text-primary_color " />
            </div>
          </div>

          <div className=" flex  justify-center items-center gap-8">
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-14  ">
              <div>
                <Heading size="sm">Service</Heading>
                <div className="flex gap-1">
                  <Rating value={1} isEditable size={18} />
                </div>
              </div>
              <div>
                <Heading size="sm">Value</Heading>
                <div className="flex gap-1">
                  <Rating value={3} isEditable size={18} />
                </div>
              </div>
              <div>
                <Heading size="sm">Recommend</Heading>
                <div className="flex gap-1">
                  <Rating value={5} isEditable size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3     md:gap-4   ">
            <div className=" col-span-2 space-y-4">
              <Input placeholder="Title" className=" h-10 " />

              <Textarea
                placeholder="Type your message here."
                className="min-h-28"
              />
            </div>
            <div className=" col-span-1 space-y-4 mt-6 ">
              <DatePicker className="h-12 w-full" />

              <label
                htmlFor="uploadFile1"
                className="  font-semibold text-base rounded p-4  flex flex-col items-center justify-center cursor-pointer border-2 h-28    mx-auto font-[sans-serif]"
              >
                <FaImage className="text-6xl text-primary_color" />

                <input type="file" id="uploadFile1" className="hidden" />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Drag Image or Browse
                </p>
              </label>
            </div>
          </div>
          {/* personal user create */}
          {currentUser.role === "admin" && (
            <div className="space-y-6">
              <h1>Provide Personal Profile Information </h1>
              <Input
                type="text"
                placeholder="Business Name"
                className="bg-white dark:bg-gray-800 h-10 "
              />
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="username"
                  className="bg-white dark:bg-gray-800 h-10 "
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white dark:bg-gray-800  h-10 "
                />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneCountry setPhone={setPhone} />
                <OptionSelect label="country" options={options} />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="password"
                  placeholder="Create Password"
                  className="bg-white dark:bg-gray-800  h-10 "
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-white dark:bg-gray-800  h-10 "
                />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <OptionSelect label="country" options={options} />
                <OptionSelect label="country" options={options} />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="City"
                  className="bg-white dark:bg-gray-800  h-10 "
                />
                <Input
                  type="text"
                  placeholder="Address"
                  className="bg-white dark:bg-gray-800  h-10 "
                />
              </div>
            </div>
          )}
          {/* personal user create end */}
          <div className="  flex justify-center items-center">
            <Button variant="hover" size="lg">
              Submit
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
