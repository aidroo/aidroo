"use client";

import { useState } from "react";
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";
import { Button } from "./ui/button";

export default function FileUploaded({ uploadUrl, setUploadUrl }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      setUploadUrl(result?.data?.url); // Save the Cloudinary URL
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex gap-10 items-center h-fit">
      <div className=" ring-2 ring-primary_color ring-offset-8  dark:ring-offset-slate-700 rounded-full  w-20 md:w-24 shrink-0  overflow-hidden ">
        <ResponsiveImage
          src={uploadUrl}
          alt="profile image"
          className="rounded-lg"
        />
      </div>
      <div className="max-w-64 space-y-2">
        <form className="grid w-full max-w-sm items-center gap-1.5">
          <input
            id="picture"
            type="file"
            className="border"
            required
            onChange={handleChange}
          />
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={(e) => handleFileUpload(e)}
          >
            Upload File
          </button>
        </form>
        <Button variant="hover">Remove Photo</Button>
      </div>
    </div>
  );
}
