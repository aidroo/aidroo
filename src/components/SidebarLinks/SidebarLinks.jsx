/* eslint-disable jsx-a11y/no-redundant-roles */
"use client";
import logo from "@/asserts/aidroo-logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBarLinks({ options }) {
  const pathname = usePathname();

  return (
    <div className="mt-10 md:mb-0 px-6 col-span-1 border rounded-md">
      <div className="lg:inset-y-0 lg:flex lg:w-full lg:flex-col">
        <div className="flex grow flex-col gap-5 py-10">
          <div className="w-44 mx-auto">
            <Link href="/">
              <ResponsiveImage
                src={logo}
                alt="aidroo logo image"
                width={500}
                height={300}
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list">
              <li>
                <ul className="space-y-4">
                  {options.map((option) => {
                    const isActive = pathname === option?.href;

                    return (
                      <li key={option?.name} className="w-full h-8">
                        <Link
                          href={option?.href}
                          className={classNames(
                            isActive
                              ? "bg-primary_color text-white dark:bg-dark dark:text-gray-300"
                              : "text-gray-500 hover:text-white border-b hover:border-0 hover:bg-primary_color dark:hover:bg-dark",
                            "group flex gap-x-3 rounded-sm p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          {option?.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
