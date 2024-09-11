/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import PayPalButton from "@/components/PayPalButton";
import Rating from "@/components/Rating/Rating";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import TitleNameAndVerified from "@/components/TitleNameAndVerified";
import {
  businessProfilePic,
  unverified_badge,
  verified_badge,
} from "@/exportImage";
import Image from "next/image";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

/* eslint-disable @next/next/no-img-element */
export default function CheckoutForm({ profile, price }) {
  const { starImage } = profile;

  // Determine rating label based on the rating value
  const ratingLabel =
    profile?.averageRating < 3.5
      ? "Poor"
      : profile?.averageRating <= 4.5
      ? "Good"
      : "Excellent";

  const [discountCode, setDiscountCode] = useState("");

  const [cardDetails, setCardDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationMonth: "01",
    expirationYear: "2024",
    securityCode: "",
  });

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    // Handle discount code logic here
    console.log("Discount code:", discountCode);
  };

  const payNow = () => {
    // Handle payment logic here
    console.log("Payment details:", cardDetails);
  };
  return (
    <>
      <style>
        {`
          .form-radio {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            display: inline-block;
            vertical-align: middle;
            background-origin: border-box;
            user-select: none;
            flex-shrink: 0;
            border-radius: 100%;
            border-width: 2px;
          }
          .form-radio:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
            border-color: transparent;
            background-color: currentColor;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
          }
          .form-radio:focus {
            outline: none;
          }
          .form-select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
            appearance: none;
            background-repeat: no-repeat;
            padding-right: 2.5rem;
            background-position: right 0.5rem center;
            background-size: 1.5em 1.5em;
          }
          `}
      </style>

      <div className="max-w-7xl mx-auto bg-white border rounded-md  border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full h-auto bg-gray-50  ">
          <div className="  h-32 flex justify-center items-center">
            {/* <div className="mb-2">
              <a
                href="#"
                className="focus:outline-none hover:underline text-gray-500 text-sm"
              >
                <i className="mdi mdi-arrow-left text-gray-400"></i> Back
              </a>
            </div> */}
            <div className="">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
                Checkout
              </h1>
            </div>
            {/* <div className="mb-5 text-gray-400">
              <a
                href="#"
                className="focus:outline-none hover:underline text-gray-500"
              >
                Home
              </a>{" "}
              /{" "}
              <a
                href="#"
                className="focus:outline-none hover:underline text-gray-500"
              >
                Cart
              </a>{" "}
              / <span className="text-gray-600">Checkout</span>
            </div> */}
          </div>
          <div className="w-full bg-white border-t   border-gray-200 px-5 py-10 text-gray-800">
            <div className="w-full">
              <div className="-mx-3 md:flex items-start">
                {/* profiel hea */}
                <div className="px-3 md:w-7/12 lg:pr-10">
                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    {profile && (
                      <div className="flex  justify-start gap-x-10">
                        {/* Profile Image */}

                        <div className="w-28 h-28  rounded-md p-1  flex  ">
                          <ResponsiveImage
                            src={profile?.profileThumb || businessProfilePic}
                            size={120}
                            className=" rounded-md ring-1 p-1   "
                            alt="profile pic"
                          />
                        </div>

                        {/* Profile Details */}
                        <div className="flex  flex-col min-h-28  ">
                          {/* Business Name and Verification */}
                          <div className="flex gap-x-2 items-center">
                            {profile?.businessName && (
                              <TitleNameAndVerified
                                title={profile.businessName}
                                verified={profile.verified}
                                isShown={true}
                              />
                            )}
                          </div>

                          {/* Reviews and Rating */}
                          <div className="flex gap-x-2   items-center">
                            <p className="text-gray-700">
                              {profile?.totalReviews} Reviews
                            </p>
                            <GoDotFill className="text-primary_color" />
                            <p>{ratingLabel}</p>
                          </div>
                          <div className="flex gap-x-2   items-center">
                            <Rating
                              value={Math.floor(profile?.averageRating)}
                              size={22}
                            />
                            <p className="text-[18px] text-gray-700 font-semibold">
                              {profile?.averageRating < 1
                                ? 0
                                : profile?.averageRating}
                            </p>
                            {starImage && (
                              <Image
                                src={starImage}
                                alt="Star Rating"
                                width={24}
                                height={24}
                              />
                            )}
                          </div>

                          {/* Claimed Badge */}
                          {profile.verified && (
                            <Image
                              src={verified_badge}
                              alt="Claimed"
                              className="w-24  "
                            />
                          )}
                          {!profile.verified && (
                            <Image
                              src={unverified_badge}
                              alt="Claimed"
                              className="w-24  "
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    {/* discount code */}
                    {/* <div className="-mx-2 flex items-end justify-end">
                      <div className="flex-grow px-2 lg:max-w-xs">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                          Discount code
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary_color transition-colors"
                            placeholder="XXXXXX"
                            type="text"
                            value={discountCode}
                            onChange={handleDiscountChange}
                          />
                        </div>
                      </div>
                      <div className="px-2">
                        <button
                          className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                          onClick={applyDiscount}
                        >
                          APPLY
                        </button>
                      </div>
                    </div> */}
                  </div>
                  <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                    <div className="w-full flex mb-3 items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Subtotal</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">${price}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Taxes (GST)</span>
                      </div>
                      {/* <div className="pl-3">
                        <span className="font-semibold">$0</span>
                      </div> */}
                    </div>
                  </div>
                  <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                    <div className="w-full flex items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Total</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">
                          AUD
                        </span>
                        <span className="font-semibold">${price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3 md:w-5/12">
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-3 items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">
                          Contact
                        </span>
                      </div>
                      <div className="flex-grow pl-3">
                        <span>Scott Windon</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">
                          Billing Address
                        </span>
                      </div>
                      <div className="flex-grow pl-3">
                        <span>
                          123 George Street, Sydney, NSW 2000 Australia
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                    <div className="w-full p-3 border-b border-gray-200">
                      <div className="mb-5">
                        <label
                          htmlFor="type1"
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-primary_color"
                            name="type"
                            disabled
                            id="type1"
                          />
                          <img
                            src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                            className="h-6 ml-3"
                            alt="card icon"
                          />
                        </label>
                      </div>
                      {/* <div>
                        <div className="mb-3">
                          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                            Name on card
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-primary_color  transition-colors"
                              placeholder="John Smith"
                              type="text"
                              name="nameOnCard"
                              value={cardDetails.nameOnCard}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                            Card number
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-primary_color transition-colors"
                              placeholder="0000 0000 0000 0000"
                              type="text"
                              name="cardNumber"
                              value={cardDetails.cardNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="mb-3 -mx-2 flex items-end">
                          <div className="px-2 w-1/4">
                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                              Expiration Month
                            </label>
                            <div>
                              <select
                                className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-primary_color transition-colors cursor-pointer"
                                name="expirationMonth"
                                value={cardDetails.expirationMonth}
                                onChange={handleInputChange}
                              >
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                            </div>
                          </div>
                          <div className="px-2 w-1/4">
                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                              Expiration Year
                            </label>
                            <div>
                              <select
                                className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-primary_color  transition-colors cursor-pointer"
                                name="expirationYear"
                                value={cardDetails.expirationYear}
                                onChange={handleInputChange}
                              >
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                              </select>
                            </div>
                          </div>
                          <div className="px-2 w-1/4">
                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                              Security Code
                            </label>
                            <div>
                              <input
                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-primary_color transition-colors"
                                placeholder="000"
                                type="text"
                                name="securityCode"
                                value={cardDetails.securityCode}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="w-full  ">
                        <label
                          htmlFor="type1"
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="form-radio h-5 w-5 text-primary_color"
                            name="type"
                            id="type1"
                            defaultChecked
                          />
                          <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            width="80"
                            className="ml-3"
                            height={200}
                          />
                        </label>
                      </div>
                    </div>
                    {/* <div className="w-full p-3">
                      <button
                        className="block w-full max-w-xs mx-auto border border-transparent bg-primary_color  hover:bg-indigo-400 focus:border-primary_color  text-white rounded-md px-5 py-2 font-semibold"
                        onClick={payNow}
                      >
                        PAY NOW
                      </button>
                    </div> */}
                    <PayPalButton amount={price} />
                  </div>
                  <div className="text-gray-600">
                    <p className="text-sm">
                      All transactions are secure and encrypted. Credit card
                      information is never stored.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
