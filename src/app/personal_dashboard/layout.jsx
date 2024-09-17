"use client";

import SideBarLinks from "@/components/SidebarLinks/SidebarLinks";
import { personalSidebarOptions } from "@/constant";
import { useAuth } from "@/hooks/useAuth";

import useCurrentNavItem from "@/hooks/useCurrentNavItem";

export default function BusinessDashboardLayout({ children }) {
  const { currentUser } = useAuth();
  const updatedPatientSidebarOptions = useCurrentNavItem(
    personalSidebarOptions
  );

  return (
    <div className="max-w-[1240px] mx-auto">
      <div className="  md:grid px-6   md:grid-cols-3  w-full relative space-y-10 gap-8  ">
        <SideBarLinks
          options={updatedPatientSidebarOptions}
          userRole={currentUser?.role}
        />
        <main className="col-span-2   h-screen  ">{children}</main>
      </div>
    </div>
  );
}
