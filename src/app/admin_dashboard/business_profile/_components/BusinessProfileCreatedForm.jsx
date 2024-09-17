"use client";
import FileUploadComponent from "@/components/FileUploadComponent";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import SelectComponent from "@/components/SelectInput";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { countries } from "@/constant";
import { brifcaseIcon } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";

export default function BusinessProfileCreateForm({ categories, isExit }) {
  const router = useRouter();
  const { currentUser } = useAuth();

  // Form states
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [verified, setVerified] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    businessName: "",
    username: "",
    email: "",
    password: "",
    city: "",
    description: "",
    funds: "",
    employees: "",
  });
  const [uploadUrl, setUploadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch subcategories when category is selected
  useEffect(() => {
    if (selectedCategory?.id) {
      const fetchSubcategories = async () => {
        try {
          const response = await axiosInstance.get("/api/subcategory", {
            params: { categoryId: selectedCategory.id },
          });
          setSubcategories(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  // Update form data in URL
  useEffect(() => {
    const query = new URLSearchParams();
    if (formData.username) {
      query.set("username", formData.username);
      router.push(`/admin_dashboard/business_profile?${query.toString()}`, {
        shallow: true,
      });
    } else {
      router.push(`/admin_dashboard/business_profile`, {
        shallow: true,
      });
    }
  }, [router, formData.username]);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file deletion
  const deleteUploadedFile = async () => {
    const avatarId = uploadUrl
      ?.substring(uploadUrl.lastIndexOf("/") + 1)
      ?.split(".")?.[0];
    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        username: currentUser?.username,
        avatarId,
        role: "business",
      });
      setUploadUrl("");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const userData = {
    ...formData,
    profileThumb: uploadUrl,
    category: selectedCategory?.name,
    subcategory: selectedSubcategory?.name,
    country: selectedCountry?.name,
    role: "business",
    status: "approved",
    verified: verified,
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    setApiError("");

    try {
      const response = await axiosInstance.post("/api/user", userData);

      if (response?.data?.status === 201) {
        setMessage("Business profile created successfully!");
        resetForm();
      } else {
        setApiError(response?.data.message || "Something went wrong");
      }
    } catch (error) {
      setApiError(
        error.message || "An error occurred while creating the profile."
      );
    } finally {
      setLoading(false);
      router.refresh("/admin_dashboard/business_profile");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      businessName: "",
      username: "",
      email: "",
      password: "",
      country: "",
      city: "",
      description: "",
      funds: "",
      employees: "",
    });
    setUploadUrl("");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedCountry(null);
    setVerified(false);
  };

  return (
    <>
      {(currentUser?.role === "admin" || currentUser?.role === "becreator") && (
        <div className="border p-4 rounded-md w-fit h-auto">
          <Dialog>
            <DialogTrigger asChild>
              <h1 className="text-primary_color text-xl font-semibold cursor-pointer">
                Create a Business Profile
              </h1>
            </DialogTrigger>
            <DialogContent className="h-screen overflow-scroll w-[500px]">
              <div className="border rounded-lg p-10 space-y-6">
                <div className="flex gap-4 items-center border-b-2 pb-4">
                  <div className="ring-2 ring-primary_color ring-offset-8 rounded-full w-20 md:w-24 overflow-hidden">
                    <ResponsiveImage
                      src={uploadUrl || brifcaseIcon}
                      alt="profile image"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div>
                    <FileUploadComponent setUploadUrl={setUploadUrl} />
                    {uploadUrl && (
                      <Button variant="hover" onClick={deleteUploadedFile}>
                        Remove Photo
                      </Button>
                    )}
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="w-full flex gap-x-2">
                    <Input
                      type="text"
                      name="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                    <div
                      className={`w-full flex items-center border gap-2 h-10 rounded-sm ${
                        isExit && "border-red-200"
                      }`}
                    >
                      <LuUser2 className="text-2xl bg-gray-100 h-10 p-[10px] w-14 rounded-r-sm" />
                      <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="flex-grow"
                        required
                      />
                      {!isExit && formData.username && (
                        <BsCheckCircleFill className="text-primary_color text-2xl mr-2" />
                      )}
                    </div>
                  </div>

                  <div className="w-full flex gap-x-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-10"
                      required
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-10"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectComponent
                      options={categories}
                      value={selectedCategory?.name || ""}
                      onChange={(value) =>
                        setSelectedCategory(
                          categories.find((cat) => cat.name === value)
                        )
                      }
                      placeholder="Category"
                    />
                    {/* <Combobox
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  options={categories}
                  placeholder="Category"
                /> */}
                    <SelectComponent
                      options={subcategories}
                      value={selectedSubcategory?.name || ""}
                      onChange={(value) =>
                        setSelectedSubcategory(
                          subcategories.find((sub) => sub.name === value)
                        )
                      }
                      placeholder="Subcategory"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectComponent
                      options={countries}
                      value={selectedCountry?.name || ""}
                      onChange={(value) =>
                        setSelectedCountry(
                          countries.find((c) => c.name === value)
                        )
                      }
                      placeholder="Country"
                    />
                    {/* <OptionSelect
                  label="Select a country"
                  options={countries}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, country: value }))
                  }
                  className={`text-gray-600 ${font14} h-10`}
                /> */}
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                    <Input
                      type="number"
                      name="funds"
                      placeholder="Total funds"
                      value={formData.funds}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                    <Input
                      type="number"
                      name="employees"
                      placeholder="Total Employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex gap-4 items-center">
                    <Checkbox
                      checked={verified}
                      onCheckedChange={(e) => setVerified(e)}
                    />
                    <Label>Verified</Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : "Submit"}
                  </Button>

                  {apiError && <div className="text-red-500">{apiError}</div>}
                  {message && <div className="text-green-500">{message}</div>}
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
