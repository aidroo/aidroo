"use client";
import { useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
// Make sure to import your icon

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative self-start">
      <button
        onClick={toggleDropdown}
        className="p-0 text-gray-400 border-0 btn dark:text-gray-100"
        type="button"
      >
        <RiMore2Fill />
      </button>

      {/* Dropdown content with smooth animation */}
      <div
        className={`absolute z-50 w-fit py-2 mt-2 text-left bg-white rounded shadow-lg transition-transform transform-gpu duration-300 ease-in-out origin-top ${
          isOpen ? "scale-y-100" : "scale-y-0"
        } ltr:right-0 rtl:left-0 dark:bg-zinc-700 dark:border-gray-600/50`}
        style={{ transformOrigin: "top" }}
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          Copy
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          Save
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          Forward
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-zinc-600"
        >
          Delete
        </a>
      </div>
    </div>
  );
}
