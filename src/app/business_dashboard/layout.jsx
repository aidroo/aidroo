"use client";
import SideBarLinks from "@/components/SidebarLinks/SidebarLinks";
import { businessSidebarOptions } from "@/constant";
import { useAuth } from "@/hooks/useAuth";

export default function BusinessDashboardLayout({ children }) {
  const { currentUser } = useAuth();
  return (
    <div className="max-w-[1240px] mx-auto">
      <div className="  md:grid px-6   md:grid-cols-3  w-full relative space-y-10 gap-8  ">
        <SideBarLinks
          options={businessSidebarOptions}
          userRole={currentUser?.role}
        />
        <main className="col-span-2   h-screen  ">{children}</main>
      </div>
    </div>
  );
}
