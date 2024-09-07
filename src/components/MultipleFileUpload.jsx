import { useState } from "react";

export default function MultipleFileUpload({ setUploadUrl }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentFile, setCurrentFile] = useState(null); // Track the current file being uploaded

  const handleChange = async (e) => {
    const files = Array.from(e.target.files); // Get all selected files

    if (!files.length) {
      setError("Please select at least one file.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        setCurrentFile(file.name); // Set the name of the current file being uploaded

        if (!file.type.startsWith("image/")) {
          setError("Only image files are allowed.");
          continue; // Skip non-image files
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file. Please try again.");
        }

        const result = await response.json();

        // Set URL after each successful upload
        setUploadUrl((prevUrls) => [...prevUrls, result?.data?.url]);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setCurrentFile(null); // Reset the current file
    }
  };

  return (
    <div
      className={`flex w-full items-start justify-center bg-grey-lighter ${
        loading ? "cursor-wait" : ""
      }`}
    >
      <label
        className={`w-full flex flex-col items-center px-2 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:border-primary_color ${
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
          {loading
            ? `Uploading ${currentFile ? currentFile : ""}...`
            : "Select files"}
        </span>
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
          disabled={loading}
          multiple // Enable multiple file selection
        />
      </label>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
