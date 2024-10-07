"use client";

import { profilePic } from "@/exportImage";
import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ImageComponent from "./ImageComponent";
import { Button } from "./ui/button";

export default function SingleFileUpload({ uploadUrl, setUploadUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null); // Ref for file input element

  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
  const ALLOWED_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
  ];

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
    const file = e.target.files[0]; // Only process the first file
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
    const file = e.dataTransfer.files[0]; // Only process the first file
    handleFileUpload(file);
  };

  const removeFile = async () => {
    if (!uploadUrl) {
      setError("No file to remove.");
      return;
    }

    try {
      const fileName = uploadUrl.split("/").pop();

      const response = await fetch(`/api/upload/${fileName}`, {
        method: "DELETE",
      });

      if (response.status === 404) {
        throw new Error("File not found on the server.");
      }

      if (!response.ok) {
        throw new Error("Failed to delete the file from the server.");
      }

      setUploadUrl(null);
      setError("");
    } catch (error) {
      setError(
        error.message || "An unexpected error occurred while removing the file."
      );
    }
  };

  return (
    <div className="flex gap-8">
      <div className="relative flex gap-4 items-start">
        <ImageComponent
          src={uploadUrl || profilePic}
          alt="profile image"
          width="100px"
          height="100px"
          className="ring-2 ring-primary_color ring-offset-8 dark:ring-offset-slate-700 rounded-full shrink-0 overflow-hidden"
        />
      </div>
      <div>
        <button
          type="button"
          className={`max-w-80 flex flex-col items-center justify-center p-2 border-2 border-dashed h-fit mb-1   rounded-lg ${
            isDragging ? "border-blue-500" : "border-gray-300"
          } ${loading ? "opacity-50 cursor-wait" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()} // Use ref to trigger input click
        >
          <div className="  flex flex-col items-center justify-center w-28 h-16">
            <FaCloudUploadAlt size={28} className="text-primary_color"  />
          </div>

          <input
            ref={fileInputRef} // Ref for input element
            type="file"
            className="hidden"
            onChange={handleChange}
            accept=".png,.jpg,.jpeg,.svg"
            disabled={loading}
          />

          {loading && "Uploading..."}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </button>
        <Button
          type="button"
          className="max-w-44 bg-red-100 text-red-500 hover:bg-red-200"
          onClick={removeFile}
        >
          Remove Photo
        </Button>
      </div>
    </div>
  );
}
