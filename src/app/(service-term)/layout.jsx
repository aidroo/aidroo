import Layout from "@/components/Layout/Layout";
import PrivacyPolicyNavbar from "./_components/privacy-policy-navbar";

export default function PrivacyPolicyLayout({ children }) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-7 my-8 gap-8">
        <div className="col-span-2  ">
          <PrivacyPolicyNavbar />
        </div>

        <div className="col-span-5">{children}</div>
      </div>
    </Layout>
  );
}
