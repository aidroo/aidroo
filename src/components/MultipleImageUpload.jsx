"use client";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import FileUploadComponent from "./FileUploadComponent";

export default function MultipleImageUpload({ setUploadUrl, uploadUrl }) {
  const { currentUser } = useAuth();
  const handleUploadUrl = (url) => {
    setUploadUrl((prevUrls) => [...prevUrls, url]); // Append the new URL to the array
  };
  const handledelete = async (url) => {
    const avatarId = url?.substring(url.lastIndexOf("/") + 1)?.split(".")?.[0];

    try {
      await axiosInstance.post(`/api/upload/${avatarId}`, {
        username: currentUser?.username,
        avatarId,
        role: "business",
      });
      setUploadUrl((prevUrls) =>
        prevUrls.filter((currentUrl) => currentUrl !== url)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  return (
    <div className="flex gap-2  flex-wrap h-18   w-fit  border p-2 rounded-md ">
      <FileUploadComponent setUploadUrl={handleUploadUrl} />
      <div className="   rounded-md flex gap-2   ">
        {uploadUrl &&
          uploadUrl?.map((url) => (
            <div
              key={url}
              className="relative group border gap-2 p-2 rounded-md   overflow-hidden"
            >
              <Image
                src={url}
                className=" rounded-md  "
                alt="review image"
                width={100}
                height={20}
              />

              <MdDelete
                className="absolute top-1 right-0 text-xl text-red-500 hidden group-hover:block"
                onClick={() => handledelete(url)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
