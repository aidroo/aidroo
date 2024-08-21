import Layout from "@/components/Layout/Layout"; // Server Component
import Loading from "@/components/Loading";
import axiosInstance from "@/lib/axios";
import { Suspense } from "react";
import BusinessNavbar from "../_components/BusinessNavbar";
import BusinessProfileHeader from "../_components/BusinessProfileHeader";
import BusinessProfileSidebar from "../_components/BusinessProfileSidebar";

export default async function BusinessProfileLayout({ children, params }) {
  const { id } = params;

  // Fetch business profile data on the server side
  const businessProfile = await axiosInstance.get(`/api/user/${id}`);

  // Handle not found or error state
  if (!businessProfile.data || businessProfile.data?.status !== 201) {
    return <div>Profile not found or an error occurred</div>;
  }

  return (
    <Layout>
      <div className="w-full space-y-6 pb-14">
        {/* Business profile header section */}
        <div className="w-full  rounded-md dark:bg-dark">
          <div className="max-w-[1280px] mx-auto pb-10">
            {/* Render the client components */}
            {businessProfile?.data?.data?.businessProfile && (
              <BusinessProfileHeader
                data={businessProfile?.data?.data?.businessProfile}
              />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-10 bg-slate-50 p-10 rounded-md mb-4">
              <div className="col-span-5">
                <BusinessNavbar />
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>

              {businessProfile?.data?.data && (
                <BusinessProfileSidebar data={businessProfile.data.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
