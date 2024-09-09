"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function OptionSelect({
  className,
  label = "",
  options = [],
  value,
  onChange,
  clearValue, // Add a prop to trigger clearing the selection
}) {
  const [selectedValue, setSelectedValue] = useState("");

  // Handle clearing the selected value when `clearValue` is true
  useEffect(() => {
    if (clearValue) {
      setSelectedValue("");
    }
  }, [clearValue]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      className={` ${className}`}
      value={selectedValue || value}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className={`min-w-32 dark:bg-gray-800 ${className}`}>
        <SelectValue placeholder={label} className="text-sm" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.name}
            value={option.name || value}
            className="text-sm"
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
