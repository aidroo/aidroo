import Layout from "@/components/Layout/Layout";
import SideBarLinks from "@/components/SidebarLinks/SidebarLinks";
import { personalSidebarOptions } from "@/constant";

export default function PersonalDashboardLayout({ children }) {
  return (
    <Layout>
      <div className="max-w-[1240px] mx-auto lg:h-screen mt-8">
        <div className="  lg:grid px-6   md:grid-cols-4  w-full relative   gap-4   ">
          <SideBarLinks options={personalSidebarOptions} />
          <main className="col-span-3   lg:h-screen my-4 lg:my-0  ">
            {children}
          </main>
        </div>
      </div>
    </Layout>
  );
}
