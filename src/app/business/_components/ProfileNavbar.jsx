"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { VscBriefcase } from "react-icons/vsc";

export default function ProfileNavbar({ username }) {
  const pathname = usePathname();
  

  const isActive = (path) => {
    
    return pathname === `/business${path}/${username}`;
  };

  const getLinkClassName = (path) => {
    return `px-1 border h-12 flex gap-x-1 w-full justify-center items-center rounded-md  ${
      isActive(path) ? "bg-primary_color text-white" : "bg-white"
    }`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <Link
        href={`/business/reviews/${username}`}
        className={getLinkClassName(`/reviews`)}
      >
        <FaRegStar className="text-lg lg:text-[22px]" />
        <span className="text-sm mg:text-16">Reviews</span>
      </Link>
      <Link
        href={`/business/jobs/${username}`}
        className={getLinkClassName(`/jobs`)}
      >
        <VscBriefcase className="text-xl lg:text-2xl mr-2" />
        <span>Jobs</span>
      </Link>
      <Link
        href={`/business/more/${username}`}
        className={getLinkClassName(`/more`)}
      >
        <IoIosArrowDropright className="text-xl lg:text-2xl mr-2" />
        <span>More</span>
      </Link>
    </div>
  );
}
