"use client";

import SideBarLinks from "@/components/SidebarLinks/SidebarLinks";
import { businessSidebarOptions } from "@/constant";

import useCurrentNavItem from "@/hooks/useCurrentNavItem";

export default function BusinessDashboardLayout({ children }) {
  const updatedPatientSidebarOptions = useCurrentNavItem(
    businessSidebarOptions
  );

  return (
    <div className="max-w-[1240px] mx-auto">
      <div className="  md:grid px-6   md:grid-cols-3  w-full relative space-y-10 gap-8  ">
        <SideBarLinks options={updatedPatientSidebarOptions} />
        <main className="col-span-2   h-screen  ">{children}</main>
      </div>
    </div>
  );
}
