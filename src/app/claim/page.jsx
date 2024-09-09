import Layout from "@/components/Layout/Layout";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import BusinessProfileHeader from "../business/[username]/_components/BusinessProfileHeader";
import ClaimPageForm from "./_components/page";

export default async function ClaimPage() {
  const { profile } = await fetchSingleProfile({ username: "google" });
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="my-10 border px-32 py-4 rounded-md w-fit ">
          {profile && (
            <BusinessProfileHeader
              profile={profile}
              totalReviews={profile.totalReviews}
              averageRating={profile.averageRating}
            />
          )}
        </div>
      </div>

      <div>
        <ClaimPageForm />
      </div>
    </Layout>
  );
}
