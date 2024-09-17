"use client";
import PasswordInput from "@/components/PasswordInput";
import SelectComponent from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";

export default function ProfileForm() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  console.log(userData);
  const options = [
    {
      value: "personal",
      name: "personal",
    },
    {
      value: "business",
      name: "business",
    },
    {
      value: "admin",
      name: "admin",
    },
    {
      value: "reviewer",
      name: "reviewer",
    },
    {
      value: "reviewer",
      name: "reviewer",
    },
    {
      value: "creator",
      name: "creator",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setApiError("");
    // setSuccess("");
    const { confirmPassword, ...dataToSend } = userData;

    if (userData.password !== confirmPassword) {
      // setApiError("Passwords do not match");
      return;
    }

    try {
      // setLoading(true);
      const response = await axiosInstance.post("/api/user", dataToSend);
      console.log(response.json());
      if (response.data.status === 201) {
        // setSuccess("Pending! We're reviewing your request");
        // Reset form fields after successful submission
        // setUserData({
        //   businessName: "",
        //   username: "",
        //   email: "",
        //   password: "",
        //   confirmPassword: "",
        //   phoneNumber: "",
        //   role: "business",
        //   country: "United States",
        //   city: "",
        //   address: "",
        // });
      } else {
        // setApiError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      // setApiError("Error occurred during registration. Try again.");
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center gap-4 border py-4 rounded-md">
      <h1 className="text-white  flex items-center justify-center text-center h-12 bg-primary_color font-semibold w-1/3 rounded-md">
        Create Profile
      </h1>

      <form
        action=""
        className="flex justify-center items-center flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div className="flex gap-x-4">
            <Input
              type="email"
              icon={MdOutlineMail}
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="username"
              placeholder="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-x-4">
            <PasswordInput
              placeholder="Create Password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
            <PasswordInput
              placeholder="Create Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <SelectComponent
            options={options}
            value={userData?.role || ""}
            onChange={(value) => setUserData({ ...userData, role: value })}
            placeholder="User role"
          />
        </div>
        <Button variant="outline" className="w-2/3 bg-primary_color">
          Submit
        </Button>
      </form>
    </div>
  );
}
