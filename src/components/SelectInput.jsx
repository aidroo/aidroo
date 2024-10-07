"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectComponent({
  options = [],
  placeholder = "Select an option",
  value = "", // Controlled value
  onChange,
  name,
  disabled = false,
  label,
  required = false, // If true, the select field will be required
}) {

   
  return (
    <div className="w-full space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select
        value={value} // Controlled value from parent
        onValueChange={onChange}
        disabled={disabled}
        name={name}
        required={required}
      >
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {placeholder !== "Subcategory" && (
            <SelectItem value="default">All {placeholder}</SelectItem>
          )}
          {options.map((option) => (
            <SelectItem key={option.name} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
