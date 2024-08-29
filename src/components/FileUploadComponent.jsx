"use client";

import { useState } from "react";

export default function FileUploadComponent({ setUploadUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
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

  return (
    <div
      className={`flex w-full  items-start    justify-center bg-grey-lighter ${
        loading ? "cursor-wait" : ""
      }`}
    >
      <label
        className={`w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white ${
          loading && "opacity-50 pointer-events-none"
        }`}
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">
          {loading ? "Uploading..." : "Select a file"}
        </span>
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
          disabled={loading}
        />
      </label>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
