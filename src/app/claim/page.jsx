import Layout from "@/components/Layout/Layout";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
 
import BusinessProfileHeader from "../business/_components/BusinessProfileHeader";
import ClaimPageForm from "./_components/Claimform";

export default async function ClaimPage({ searchParams }) {
  const username = searchParams.username;

  const { profile } = await fetchSingleProfile({ username: username });
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

      <ClaimPageForm username={username} />
    </Layout>
  );
}
