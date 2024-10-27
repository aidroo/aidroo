"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivacyPolicyNavbar() {
 const pathname = usePathname();







 const getLinkClassName = (path) => {
   if (pathname === path) {
     return "px-1 border h-12 bg-primary_color flex gap-x-1 w-full justify-center items-center rounded-md bg-primary_color text-white";
   }
   return "px-1 border h-12 flex  bg-white gap-x-1 w-full justify-center items-center rounded-md";
 };
    
  return (
    <nav className="flex flex-col gap-4 bg-slate-100 p-2 ">
      <Link
        href={`/terms-conditions`}
        className={`  ${getLinkClassName(`/terms-conditions`)}`}
      >
        {/* <FaRegStar className="text-lg lg:text-[22px]" /> */}
        <span className="text-sm mg:text-16">Terms and conditons </span>
      </Link>
      <Link
        href={`/review-privacy-policy`}
        className={getLinkClassName(`/review-privacy-policy`)}
      >
        <span className="text-sm mg:text-16">Review Privacy policy </span>
      </Link>
      <Link
        href={`/jobs-privacy-policy`}
        className={getLinkClassName(`/jobs-privacy-policy`)}
      >
        <span className="text-sm mg:text-16">Jobs Privacy policy </span>
      </Link>
      <Link
        href={`/about-aidroo`}
        className={getLinkClassName(`/about-aidroo`)}
      >
        <span className="text-sm mg:text-16">About aidroo </span>
      </Link>
    </nav>
  );
}
