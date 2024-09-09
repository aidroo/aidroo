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
  value = "",
  onChange,
  name,
  disabled = false,
  label,
}) {
  return (
    <div className="w-full space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select
        value={value.name}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            console.log(option);
            return (
              <SelectItem key={option.name} value={option.name}>
                {option.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
