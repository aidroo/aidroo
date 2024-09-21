"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinks() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col   gap-4 p-2 h-fit">
      <Link
        href={"/terms-service/business-profile"}
        className={classNames(
          pathname === "/terms-service/business-profile"
            ? "bg-primary_color text-white dark:bg-dark dark:text-gray-300"
            : "text-gray-500 hover:text-white   hover:border-0 hover:bg-primary_color dark:hover:bg-dark",
          "group flex gap-x-3 rounded-sm p-2 text-sm leading-6 font-semibold border"
        )}
      >
        Business
      </Link>

      <Link
        href={"/terms-service/jobs-term-service"}
        className={classNames(
          pathname === "/terms-service/jobs-term-service"
            ? "bg-primary_color text-white dark:bg-dark dark:text-gray-300"
            : "text-gray-500 hover:text-white  hover:border-0 hover:bg-primary_color dark:hover:bg-dark",
          "group flex gap-x-3 rounded-sm p-2 text-sm border leading-6 font-semibold"
        )}
      >
        Jobs
      </Link>
      <Link
        href={"/terms-service/privacy-policy"}
        className={classNames(
          pathname === "/terms-service/privacy-policy"
            ? "bg-primary_color text-white dark:bg-dark dark:text-gray-300"
            : "text-gray-500 hover:text-white  hover:border-0 hover:bg-primary_color dark:hover:bg-dark",
          "group flex gap-x-3 rounded-sm p-2 text-sm border leading-6 font-semibold"
        )}
      >
        Review Privacy Policy
      </Link>
    </nav>
  );
}
