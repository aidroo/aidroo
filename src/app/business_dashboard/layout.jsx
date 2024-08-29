import SideBarLinks from "@/components/SidebarLinks/SidebarLinks";
import { businessSidebarOptions } from "@/constant";

export default function BusinessDashboardLayout({ children }) {
  return (
    <div className="max-w-[1240px] mx-auto">
      <div className="  md:grid px-6   md:grid-cols-3  w-full relative space-y-10 gap-8  ">
        <SideBarLinks options={businessSidebarOptions} />
        <main className="col-span-2   h-screen  ">{children}</main>
      </div>
    </div>
  );
}
