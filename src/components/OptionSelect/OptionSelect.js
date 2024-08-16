"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function OptionSelect({
  className,
  label = "",
  options = [],

  onChange,
}) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      className={` ${className}`}
      value={selectedValue}
      onValueChange={handleValueChange}
    >
      <SelectTrigger
        className={` min-w-32   dark:bg-gray-800 h-10   ${className}`}
      >
        <SelectValue placeholder={label} className="text-sm  " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.name}
              value={option.name}
              className="text-sm"
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
