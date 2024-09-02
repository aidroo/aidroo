import { useState } from "react";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { SlLock } from "react-icons/sl";
import { Input } from "./ui/input"; // Assuming you have an Input component

export default function PasswordInput({
  placeholder = "",
  value,
  onChange,
  name,
  className,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`w-full flex items-center border gap-2 h-10 rounded-sm overflow-hidden ${className}`}
    >
      <SlLock className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />
      <Input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className="bg-white dark:bg-gray-800 border-none focus-visible:ring-0 flex-grow"
        required
        value={value}
        onChange={onChange}
      />
      <button type="button" onClick={handleToggleShowPassword} className="px-2">
        {showPassword ? (
          <IoEye className="text-xl text-primary_color " />
        ) : (
          <IoEyeOffSharp className="text-xl text-gray-400 " />
        )}
      </button>
    </div>
  );
}
