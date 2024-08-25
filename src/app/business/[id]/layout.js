import Layout from "@/components/Layout/Layout"; // Server Component
import Loading from "@/components/Loading";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import { Suspense } from "react";
import BusinessNavbar from "./_components/BusinessNavbar";
import BusinessProfileHeader from "./_components/BusinessProfileHeader";
import BusinessProfileSidebar from "./_components/BusinessProfileSidebar";

export default async function BusinessProfileLayout({ children, params }) {
  const { id } = params;

  // Fetch business profile data on the server side

  const { businessProfile } = await fetchSingleProfile({ username: id });

  return (
    <Layout>
      <div className="w-full   pb-14">
        {/* Business profile header section */}
        <div className="w-full  rounded-md dark:bg-dark">
          <div className="max-w-[1280px] mx-auto pb-10">
            {/* Render the client components */}
            {businessProfile?.businessProfile && (
              <BusinessProfileHeader data={businessProfile?.businessProfile} />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-10 bg-slate-50  px-2 lg:p-10 rounded-md mb-4">
              <div className="col-span-5">
                <BusinessNavbar />
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>

              {businessProfile && (
                <BusinessProfileSidebar data={businessProfile} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
