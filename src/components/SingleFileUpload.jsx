"use client";

import { brifcaseIcon } from "@/exportImage";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";

export default function SingleFileUpload({uploadUrl, setUploadUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  

  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

  const handleFileUpload = async (file) => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only PNG, JPG, or SVG image files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 3MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file. Please try again.");
      }

      const result = await response.json();
      setUploadUrl(result?.data?.url);
     
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };
const removeFile = async () => {
  if (!uploadUrl) {
    setError("No file to remove.");
    return;
  }

  try {
      // Extract the file name from the URL or file path
    const fileName = uploadUrl.split("/").pop();

    const response = await fetch(`/api/upload/${fileName}`, {
      method: 'DELETE',
    });


    if (response.status === 404) {
      throw new Error('File not found on the server.');
    }

    if (!response.ok) {
      throw new Error('Failed to delete the file from the server.');
    }

    setUploadUrl(null);
    setError("");
    setUploadUrl(null);
  } catch (error) {
    setError(error.message || "An unexpected error occurred while removing the file.");
  }
};


  return (
   <>
    {uploadUrl?( 
      <div className="relative">
         <div className="ring-2 ring-primary_color ring-offset-8 dark:ring-offset-slate-700 rounded-lg w-20 md:w-24 shrink-0 overflow-hidden">
          <ResponsiveImage
            src={uploadUrl || brifcaseIcon}
            alt="profile image"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
          <button
            onClick={()=>removeFile(uploadUrl)}
            className="absolute -top-4 right-0 bg-red-300 text-white rounded-full p-2"
            title="Remove File"
            type="button"
          >
          <FaRegTrashCan className="text-red-700" />
          </button>
        </div>):(<div
      className={` max-w-80 flex flex-col items-center justify-center p-2 border-2 border-dashed rounded-lg ${
        isDragging ? "border-blue-500" : "border-gray-300"
      } ${loading ? "opacity-50 cursor-wait" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
        <div className="w-full flex flex-col items-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 16l-4-4-4 4m4-4v8m4-8a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p className="text-gray-500 mt-2">Drag & drop  image</p>
        </div>
     
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".png,.jpg,.jpeg,.svg" // Restrict file types
        disabled={loading}
      />

      {!uploadUrl && (
        <button
          onClick={() => document.querySelector("input[type='file']").click()}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={loading}
          type="button"
        >
          {loading ? "Uploading..." : "Select File"}
        </button>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>)}</>
  );
}
