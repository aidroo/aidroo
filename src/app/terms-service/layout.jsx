/* eslint-disable jsx-a11y/no-redundant-roles */

import Layout from "@/components/Layout/Layout";

import SidebarLinks from "./_components/SidebarLinks";
export default function TermAndConditionsLayout({ children }) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto my-14  ">
        <div className=" grid grid-cols-5   w-full relative space-y-10 gap-8  ">
          <SidebarLinks />
          <div className="col-span-4">
            <div className="w-full"></div>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
