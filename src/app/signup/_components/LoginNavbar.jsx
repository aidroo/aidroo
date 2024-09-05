"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuUser2 } from "react-icons/lu";
import { VscBriefcase } from "react-icons/vsc";

export default function LoginNavbar() {
  const pathname = usePathname();

  return (
    <div className=" grid grid-cols-2 gap-4   border items-center  mb-10 rounded-md p-2">
      <Link
        href="/signup/personal"
        className={`flex gap-2  justify-center h-10 items-center rounded-md ${
          pathname === "/signup/personal" ? "bg-primary_color text-white" : ""
        }`}
      >
        <LuUser2 className="text-[22px]" />
        <span>Personal</span>
      </Link>
      <Link
        href="/signup/business"
        className={`flex gap-2  justify-center h-10 items-center rounded-md ${
          pathname === "/signup/business" ? "bg-primary_color text-white" : ""
        }`}
      >
        <VscBriefcase className="text-2xl" />
        <span>Business</span>
      </Link>
    </div>
  );
}
