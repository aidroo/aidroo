"use client";
import { Combobox } from "@/components/Combobox";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, font14, font18 } from "@/constant";
import { brifcaseIcon } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/lib/apiService";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function ProfileForm() {
  const router = useRouter();
  // Initialize state with empty strings or defaults
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [funds, setFunds] = useState("");
  const [employees, setEmployees] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [message, setMessage] = useState("");

  const { currentUser } = useAuth();

  // Fetch categories and subcategories
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR("/api/category", (url) => apiService.getData(url));

  const {
    data: subcategoryData,
    error: subcategoryError,

    isLoading: subcategoryLoading,
  } = useSWR(
    ["/api/subcategory", { categoryId: selectedCategory?.id }],
    (url) => apiService.getData(url)
  );

  // useEffect(() => {
  //   const checkusername = async () => {
  //    try {
  //      const isExit = await apiService.singeDataFetching(
  //        `/api/user?username=${username}`
  //      );
  //    } catch (error) {

  //    }

  //     console.log(isExit);
  //   };
  //   checkusername();
  // }, [username]);

  const userData = {
    businessName: businessName,
    username,
    email,
    password,
    role: "business",
    profileThumb: uploadUrl,
    category: selectedCategory?.name,
    subcategory: selectedSubcategory?.name,
    country,
    city,
    description,
    employees,
    funds,
  };
  // handler

  // image  upload
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setApiError("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!result) {
        setApiError("Failed to upload file.");
        return;
      }
      setUploadUrl(result?.data?.url); // Save the Cloudinary URL
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };
  const filenameWithExtension = uploadUrl?.substring(
    uploadUrl.lastIndexOf("/") + 1
  );
  // Remove the file extension to get the desired string
  const avatarId = filenameWithExtension?.split(".")?.slice(0, -1)?.join(".");

  const deleteUploadedFile = async () => {
    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        username: currentUser?.username,
        avatarId,
        role: "business",
      });
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const user = await apiService.addData("/api/user", userData);
      setMessage(user.message);
      if (user.status === 201) {
        router.push("/admin_dashboard/business_profile");
      } else {
        setApiError(response.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }

    // Handle error state
    if (apiError) {
      return <Error error={apiError} />;
    }
  };
  return (
    <div className="border  p-4 rounded-md  w-fit h-auto  ">
      <Dialog>
        <DialogTrigger asChild>
          <h1 className="text-primary_color  text-xl font-semibold cursor-pointer">
            Create a Business Profile
          </h1>
        </DialogTrigger>

        <DialogContent className=" h-screen overflow-scroll w-[500px]">
          <div className="border  rounded-lg p-10 space-y-6">
            {/* image uploaded */}
            <div className="flex gap-4 items-center border-b-2 pb-4">
              <div className=" ring-2 ring-primary_color ring-offset-8  dark:ring-offset-slate-700 rounded-full  w-20 md:w-24 shrink-0  overflow-hidden ">
                <ResponsiveImage
                  src={uploadUrl || brifcaseIcon}
                  alt="profile image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="max-w-64 space-y-2 ">
                <form className="grid w-full max-w-sm items-center gap-1.5 ">
                  <Input
                    id="picture"
                    type="file"
                    className="border "
                    required
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                    onClick={(e) => handleFileUpload(e)}
                    disabled={loading}
                  >
                    Upload File
                  </Button>
                </form>
                <Button variant="hover" onClick={deleteUploadedFile}>
                  Remove Photo
                </Button>
              </div>
            </div>

            {/* profile update */}
            <div>
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div className=" w-full flex gap-x-2">
                  <Input
                    type="text"
                    placeholder="Business Name"
                    className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="username"
                    className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>{" "}
                {/* email */}
                <div className=" w-full flex gap-x-2">
                  <Input
                    type="email"
                    placeholder="email"
                    className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder=" password"
                    className="bg-white dark:bg-gray-800 h-10  text-xs md:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* username */}
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Combobox
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    options={categoryData?.data}
                    isLoading={categoryLoading}
                    error={categoryError}
                    className="border-none"
                    placeholder="category"
                  />
                  <Combobox
                    selectedCategory={selectedSubcategory}
                    setSelectedCategory={setSelectedSubcategory}
                    options={subcategoryData?.data}
                    isLoading={subcategoryLoading}
                    error={subcategoryError}
                    placeholder="subcategory"
                  />
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                  <OptionSelect
                    label="Select a country"
                    options={countries}
                    className={`text-gray-600 ${font14} h-10`}
                    onChange={setCountry}
                  />
                  <Input
                    type="text"
                    placeholder="City"
                    className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
                    onChange={(e) => setCity(e.target.value)}
                  />{" "}
                  <Input
                    type="text"
                    placeholder="Total funds"
                    className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
                    onChange={(e) => setFunds(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Total Employees"
                    className="bg-white dark:bg-gray-800  h-10   text-xs md:text-sm"
                    onChange={(e) => setEmployees(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <h1 className={`text-center ${font18}`}>
                    About my Business{" "}
                  </h1>
                  <Textarea
                    className="min-h-32 placeholder:text-sm placeholder:flex placeholder:mt-14"
                    placeholder="Write short description about your business .
(300 words Limit )"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {/* {error && (
                  <h1 className="p-4 bg-red-50 text-red-200">
                    {error || apiError}
                  </h1>
                )} */}
                {message && (
                  <h1 className="p-2 text-green-400 bg-green-200">{message}</h1>
                )}
                <Button
                  variant="fillButton"
                  type="submit"
                  className="h-10   text-xs md:text-sm"
                  disabled={loading}
                >
                  Create Business Profile
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
