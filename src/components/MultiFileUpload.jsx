"use client";

import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ImageComponent from "./ImageComponent";

export default function MultiFileUpload({uploadUrls, setUploadUrls }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
    // For displaying multiple image previews
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
  const MAX_FILES = 3; // Max number of files allowed
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

   
  const handleFileUpload = async (files) => {
    const currentFileCount = uploadUrls?.length;

    // Prevent uploading more than 3 images
    if (files.length + currentFileCount > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} images.`);
      return;
    }

    const validFiles = [];
    const previewUrls = [];

    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError("Only PNG, JPG, or SVG image files are allowed.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 3MB.");
        return;
      }

      validFiles.push(file);
      previewUrls.push(URL.createObjectURL(file));
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const uploadUrls = [];

      for (const file of validFiles) {
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
        uploadUrls.push(result?.data?.url);
      }

      setUploadUrls((prevUrls) => [...prevUrls, ...uploadUrls]);
       // Set the previews for all files
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    handleFileUpload(files);
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
    const files = Array.from(e.dataTransfer.files); // Convert FileList to an array
    handleFileUpload(files);
  };

  const removeFile = async (index) => {
  const fileToRemove = uploadUrls[index]; 

  try {
      const fileName = fileToRemove.split("/").pop();
    const response = await fetch(`/api/upload/${fileName}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the file from the server.');
    }

    

    setUploadUrls((prevUrls) => {
      const updatedUrls = [...prevUrls];
      updatedUrls.splice(index, 1); // Remove the corresponding upload URL
      return updatedUrls;
    });
  } catch (err) {
    setError(err.message || "An unexpected error occurred.");
  }
};


  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg ${
        isDragging ? "border-blue-500" : "border-gray-300"
      } ${loading ? "opacity-50 cursor-wait" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
     
      {uploadUrls?.length > 0 ? (
        <div className="flex flex-wrap gap-8">
          {uploadUrls?.map((preview, index) => (
            <div key={index} className="relative border p-1 rounded-md ">
              <ImageComponent src={preview} width="100px" height="100px" className="rounded-lg " alt="profile image" />
              <button
                onClick={() => removeFile(index)}
                type="button"
                className="absolute top-0 right-0 bg-red-300 text-white rounded-full p-2"
                title="Remove File"
              >
                <FaRegTrashCan className="text-red-700" />
              </button>
            </div>
          ))}
        </div>
      ) : (
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
          <p className="text-gray-500 mt-2"> Upload images</p>
        </div>
      )}

      <input
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
        accept=".png,.jpg,.jpeg,.svg" // Restrict file types
        disabled={loading || uploadUrls?.length >= MAX_FILES} // Disable if max limit is reached
      />

     
        <button
          onClick={() => document.querySelector("input[type='file']").click()}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={loading || uploadUrls?.length >= MAX_FILES} // Disable button if max limit is reached
          type="button"
        >
          {loading ? "Uploading..." : "Select Files"}
        </button>
     

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}


// "use client";

// import { useRef, useState } from "react";
// import { FaRegTrashCan } from "react-icons/fa6";
// import ImageComponent from "./ImageComponent";

// export default function MultiFileUpload({ uploadUrls, setUploadUrls }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null); // Ref for the file input

//   const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
//   const MAX_FILES = 3; // Max number of files allowed
//   const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

//   const handleFileUpload = async (files) => {
//     const currentFileCount = uploadUrls?.length || 0;

//     if (files.length + currentFileCount > MAX_FILES) {
//       setError(`You can only upload up to ${MAX_FILES} images.`);
//       return;
//     }

//     const validFiles = [];
//     const previewUrls = [];

//     for (const file of files) {
//       if (!ALLOWED_FILE_TYPES.includes(file.type)) {
//         setError("Only PNG, JPG, or SVG image files are allowed.");
//         return;
//       }

//       if (file.size > MAX_FILE_SIZE) {
//         setError("File size exceeds 3MB.");
//         return;
//       }

//       validFiles.push(file);
//       previewUrls.push(URL.createObjectURL(file));
//     }

//     setLoading(true);
//     setError(""); // Clear previous errors

//     try {
//       const newUploadUrls = [];

//       for (const file of validFiles) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await fetch("/api/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to upload file. Please try again.");
//         }

//         const result = await response.json();
//         newUploadUrls.push(result?.data?.url);
//       }

//       setUploadUrls((prevUrls) => [...prevUrls, ...newUploadUrls]);
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const files = Array.from(e.target.files); // Convert FileList to an array
//     handleFileUpload(files);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = Array.from(e.dataTransfer.files); // Convert FileList to an array
//     handleFileUpload(files);
//   };

//   const removeFile = async (index) => {
//     const fileToRemove = uploadUrls[index];

//     try {
//       const fileName = fileToRemove.split("/").pop();
//       const response = await fetch(`/api/upload/${fileName}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete the file from the server.');
//       }

//       setUploadUrls((prevUrls) => {
//         const updatedUrls = [...prevUrls];
//         updatedUrls.splice(index, 1); // Remove the corresponding upload URL
//         return updatedUrls;
//       });
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred.");
//     }
//   };

//   return (
//     <div
//       className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg ${
//         isDragging ? "border-blue-500" : "border-gray-300"
//       } ${loading ? "opacity-50 cursor-wait" : ""}`}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       {uploadUrls?.length > 0 ? (
//         <div className="flex flex-wrap gap-8">
//           {uploadUrls?.map((preview, index) => (
//             <div key={index} className="relative border p-1 rounded-md ">
//               <ImageComponent
//                 src={preview}
//                 width="100px"
//                 height="100px"
//                 className="rounded-lg"
//                 alt="profile image"
//               />
//               <button
//                 onClick={() => removeFile(index)}
//                 type="button"
//                 className="absolute top-0 right-0 bg-red-300 text-white rounded-full p-2"
//                 title="Remove File"
//               >
//                 <FaRegTrashCan className="text-red-700" />
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="w-full flex flex-col items-center">
//           <svg
//             className="w-10 h-10 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M16 16l-4-4-4 4m4-4v8m4-8a4 4 0 11-8 0 4 4 0 018 0z"
//             />
//           </svg>
//           <p className="text-gray-500 mt-2">Upload images</p>
//         </div>
//       )}

//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         className="hidden"
//         onChange={handleChange}
//         accept=".png,.jpg,.jpeg,.svg"
//         disabled={loading || uploadUrls?.length >= MAX_FILES}
//       />

//       <button
//         onClick={() => fileInputRef.current.click()} // Use the ref to open file dialog
//         className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//         disabled={loading || uploadUrls?.length >= MAX_FILES}
//         type="button"
//       >
//         {loading ? "Uploading..." : "Select Files"}
//       </button>

//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }
