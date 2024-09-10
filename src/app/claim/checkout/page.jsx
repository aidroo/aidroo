import Layout from "@/components/Layout/Layout";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import CheckoutForm from "../_components/CheckoutForm";

export default async function page() {
  const { profile } = await fetchSingleProfile({ username: "google" });
  return (
    <Layout>
      <CheckoutForm profile={profile} />
    </Layout>
  );
}
