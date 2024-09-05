// components/Layout/SignupLayout.js

import Layout from "@/components/Layout/Layout";

import LoginNavbar from "./_components/LoginNavbar";

export default function SignupLayout({ children }) {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-8 place-content-center border p-10 my-10 rounded-md">
        <LoginNavbar />
        {children}
      </div>
    </Layout>
  );
}
