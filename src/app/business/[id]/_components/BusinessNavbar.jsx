"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaRegStar } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { VscBriefcase } from "react-icons/vsc";

export default function BusinessNavbar() {
  const pathname = usePathname();
  const { id } = useParams();
  return (
    <div className="grid grid-cols-3 gap-4 border items-center mb-10 rounded-md p-2">
      <Link
        href={`/business/${id}/reviews`}
        className={`flex gap-2 justify-center h-10 items-center rounded-md ${
          pathname === `/business/${id}/reviews`
            ? "bg-primary_color text-white"
            : ""
        }`}
      >
        <FaRegStar className=" lg:text-[22px]" />
        <span className=" text-sm mg:text-16">Reviews</span>
      </Link>
      <Link
        href={`/business/${id}/jobs`}
        className={`flex gap-2 justify-center h-10 items-center rounded-md ${
          pathname === `/business/${id}/jobs`
            ? "bg-primary_color text-white"
            : ""
        }`}
      >
        <VscBriefcase className="text-xl lg:text-2xl" />
        <span>Jobs</span>
      </Link>
      <Link
        href={`/business/${id}/more`}
        className={`flex gap-2 justify-center h-10 items-center rounded-md ${
          pathname === `/business/${id}/more`
            ? "bg-primary_color text-white"
            : ""
        }`}
      >
        <IoIosArrowDropright className="text-xl lg:text-2xl" />
        <span>More</span>
      </Link>
    </div>
  );
}
