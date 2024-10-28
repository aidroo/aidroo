import Layout from "@/components/Layout/Layout";
import PrivacyPolicyNavbar from "./_components/privacy-policy-navbar";

export default function PrivacyPolicyLayout({ children }) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-7 my-8 gap-8 px-2">
        <div className="  w-full lg:col-span-2  ">
          <PrivacyPolicyNavbar />
        </div>

        <div className="lg:col-span-5">{children}</div>
      </div>
    </Layout>
  );
}
