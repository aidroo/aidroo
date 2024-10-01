"use client";

import { Input } from "@/components/ui/input";
import { whitesearch } from "@/exportImage";
import Image from "next/image";
import { useState } from "react";

export default function page() {
  const [setSearchText] = useState("");

  return (
    <div>
      <form className="flex gap-4  p-1 rounded justify-center my-8  w-full">
        <div className="max-w-2xl mx-auto flex border p-1 min-w-96 rounded-md ">
          <Input
            type="text"
            name="search"
            placeholder=" Search"
            className="bg-white dark:bg-dark h-10      border-none focus-visible:ring-0 pr-2"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className=" flex items-center justify-center  bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10 ">
            <Image
              src={whitesearch}
              alt="Icon 1"
              className="w-6 "
              priority={true}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
