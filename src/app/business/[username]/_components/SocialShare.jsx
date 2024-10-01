/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import IconImage from "@/components/IconImage/IconImage";
import { font14 } from "@/constant";
import { facebook, instagram, linkedin, twitter } from "@/exportImage";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiLink } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { LiaSmsSolid } from "react-icons/lia";

export default function SocialShare() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${pathname}`;
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown element

  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close the dropdown when clicking outside
      }
    };

    // Add event listener only when the dropdown is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="-mr-16 w-fit">
      <div className="lg:border-s mt-4 border-primary_color items-center justify-center flex gap-2 lg:gap-4 col-span-2">
        <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
          <LiaSmsSolid className="text-sm md:text-xl" />
          <span className={font14}>Chat</span>
        </div>
        <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
          <FaPlus className="text-sm" />
          <span className={font14}>Follow</span>
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)} // Toggle between open and close
          className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2"
        >
          <HiOutlineShare className="text-sm md:text-xl" />
          <span className={font14}>Share</span>
        </button>
      </div>

      {open && (
        <div
          className="w-full mt-4 border p-2 -mr-5 rounded-md"
          ref={dropdownRef} // Attach the ref to the dropdown
        >
          <h1 className="font-bold text-primary_color  mb-4 text-center">
            Share on
          </h1>
          <div className="flex gap-2 justify-center ">
            {/* Copy Link button */}
            <div
              className="border-2 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
              onClick={copyToClipboard}
            >
              <CiLink className="text-2xl" />
            </div>

            {/* Facebook share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                pageUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={facebook} size={30} />
            </a>

            {/* Twitter share */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                pageUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={twitter} size={30} />
            </a>

            {/* Instagram share */}
            <a
              href="https://www.instagram.com/aidroo_ig/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={instagram} size={30} />
            </a>

            {/* LinkedIn share */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                pageUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={linkedin} size={30} />
            </a>
          </div>
        </div>
      )}
      {copied && <span className="text-green-500">Copied!</span>}
    </div>
  );
}
