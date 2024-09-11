import Layout from "@/components/Layout/Layout";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import CheckoutForm from "../_components/CheckoutForm";

export default async function page({ searchParams }) {
  const username = searchParams.username;
  const price = searchParams.price;

  const { profile } = await fetchSingleProfile({ username: username });

  return (
    <Layout>
      <CheckoutForm profile={profile} price={price} />
    </Layout>
  );
}
