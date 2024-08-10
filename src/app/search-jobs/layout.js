"use client";
import IconImage from "@/components/IconImage/IconImage";
import Layout from "@/components/Layout/Layout";
import { brifcaseIcon } from "@/exportImage";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JobsLayout({ children }) {
  const pathname = usePathname();
  return (
    <Layout>
      <div className="my-12 max-w-7xl mx-auto">
        <div>
          <div className=" flex items-center   justify-center gap-4">
            <IconImage src={brifcaseIcon} alt="jobs" size={34} />
            <h1 className="text-primary_color text-[28px] text-center">
              Explore jobs
            </h1>
          </div>
          <div className=" grid grid-cols-2 gap-4   border items-center  mb-10 rounded-md p-2 max-w-2xl mx-auto my-12">
            <Link
              href="/search-jobs/jobs"
              className={`flex gap-2  justify-center h-10 items-center rounded-md ${
                pathname === "/search-jobs/jobs"
                  ? "bg-primary_color text-white"
                  : ""
              }`}
            >
              <span>Jobs</span>
            </Link>
            <Link
              href="/search-jobs/business"
              className={`flex gap-2  justify-center h-10 items-center rounded-md ${
                pathname === "/search-jobs/business"
                  ? "bg-primary_color text-white"
                  : ""
              }`}
            >
              <span>Business Profiles</span>
            </Link>
          </div>
        </div>
        <div></div>

        <div>{children}</div>
      </div>
    </Layout>
  );
}
