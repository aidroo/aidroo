"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JobsNavbar() {
  const pathname = usePathname();

  const getLinkClassName = (path) => {
    if (pathname === path) {
      return "px-1 border h-12 flex gap-x-1 w-full justify-center items-center rounded-md bg-primary_color text-white";
    }
    return "px-1 border h-12 flex gap-x-1 w-full justify-center items-center rounded-md";
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <Link
        href={`/latest-jobs `}
        className={`  ${getLinkClassName(`/latest-jobs`)}`}
      >
        {/* <FaRegStar className="text-lg lg:text-[22px]" /> */}
        <span className="text-sm mg:text-16">Latest </span>
      </Link>
      <Link href={`/top-jobs `} className={getLinkClassName(`/top-jobs`)}>
        <span className="text-sm mg:text-16">Top </span>
      </Link>
      <Link
        href={`/business-profile`}
        className={getLinkClassName(`/business-profile`)}
      >
        <span className="text-sm mg:text-16">Business Profile </span>
      </Link>

      {/* <FaRegStar className="text-lg lg:text-[22px]" /> */}
    </div>
  );
}
