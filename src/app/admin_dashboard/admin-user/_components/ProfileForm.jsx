"use client";
import PasswordInput from "@/components/PasswordInput";
import SelectComponent from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";

export default function ProfileForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const options = [
    {
      value: "admin",
      name: "admin",
    },

    {
      value: "reviewer",
      name: "reviewer",
    },
    {
      value: "editor",
      name: "editor",
    },
    {
      value: "becreator",
      name: "becreator",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { confirmPassword, ...dataToSend } = userData;

    if (userData.password !== confirmPassword) {
      // setApiError("Passwords do not match");
      return;
    }

    try {
      // setLoading(true);
      const response = await axiosInstance.post("/api/user", dataToSend);
      console.log(response);
      if (response.data.status === 201) {
        setSuccess(response.data.message);
        // Reset form fields after successful submission
        setUserData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",

          role: "",
        });

        router.refresh("/admin_dashboard/admin-user");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      // setApiError("Error occurred during registration. Try again.");
    } finally {
      setLoading(false);
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
              type="test"
              placeholder="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              type="test"
              placeholder="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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

        {success && (
          <h1 className="text-green-400 bg-green-100 p-2">{success}</h1>
        )}
        {error && <h1 className="text-red-400 bg-red-100 p-2">{error}</h1>}
        <Button variant="outline" className="w-2/3 bg-primary_color">
          {loading ? "Submitting...." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
