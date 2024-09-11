import PricingPlan from "@/app/business_dashboard/business_plan/_components/PricingPlan";
import Layout from "@/components/Layout/Layout";

export default function page({ searchParams }) {
  const username = searchParams.username;
  return (
    <Layout>
      <PricingPlan username={username} />
    </Layout>
  );
}
