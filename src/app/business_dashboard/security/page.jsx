"use client";
import Heading from "@/components/Heading";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

export default function Security() {
 
const {currentUser}=useAuth()
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const update = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message
    setIsLoading(true);  

    // Check if the new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post("/api/auth/update-password", {
        ...formData,
        username:currentUser?.username,
      });
       setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccess("Password updated successfully");
    } catch (error) {
      // Extract error message
      const errorMessage =
        error.response?.data?.error || error.message || "An error occurred";
      setError(errorMessage);
    }finally{
      setIsLoading(false);
     
    }
  };
 
  return (
    <div className="border-2 p-8">
      <div className="flex justify-center items-center">
        <Heading size="sm" className="border p-3 rounded-md">
          Update Your Password
        </Heading>
      </div>

      <form onSubmit={update} className="flex flex-col items-center justify-center">
        <div className="w-full md:w-96 space-y-4 mt-4">
          <PasswordInput
            name="oldPassword"
            type="password"
            placeholder="Old password"
            onChange={handleChange}
            value={formData.oldPassword}
          />
          <PasswordInput
            name="newPassword"
            type="password"
            placeholder="New password"
            onChange={handleChange}
            value={formData.newPassword}
          />
          <PasswordInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}

        <Button variant="default" type="submit" className="w-24 mt-4">
         {isLoading?"Updating...": "Update"}
        </Button>
      </form>
    </div>
  );
}
