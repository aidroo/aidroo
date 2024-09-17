"use client";

import { useState } from "react";

const Humber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `w-6 h-[2px] my-[2px]   rounded-full bg-primary_color transition ease transform duration-300`;

  return (
    <button
      className="flex flex-col h-8 w-8 border-2 border-black rounded justify-center items-center group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};
export default Humber;
