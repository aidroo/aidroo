/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import { countries, font14, font16 } from "@/constant";
import { Input } from "../ui/input";

const PhoneCountry = ({ setPhone, value }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[1]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className="select-box  w-full">
      <div className="flex w-full h-10 border items-center gap-4 ps-2">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Icon
            icon={`flag:${selectedCountry.code.toLowerCase()}-4x3`}
            className="text-lg"
          />
          <p className={`${font16}`}>+{selectedCountry.phone}</p>
        </div>
        <Input
          type="tel"
          name="phone"
          value={value}
          placeholder="Phone Number"
          className="border-none focus-visible:ring-0 px-0"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {showDropdown && (
        <div className="relative z-50">
          <Input
            type="text"
            className="mt-2  "
            placeholder="Search Country Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute  tikmark  " />
          <div className="h-72  overflow-y-auto">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                className="flex justify-between items-center border px-4"
                onClick={() => handleCountrySelect(country)}
              >
                <div className="flex gap-4 items-center h-11 place-content-center ">
                  <Icon
                    icon={`flag:${country?.code.toLowerCase()}-4x3`}
                    className="text-lg"
                  />
                  <span className={`${font14}`}>{country?.name}</span>
                </div>
                <p className={`${font14}`}>
                  +{country?.phone || country.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneCountry;
