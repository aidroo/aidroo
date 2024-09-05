import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";

export default function Login() {
  return (
    <Layout title="Login">
      <div className=" border shadow dark:bg-dark p-8   space-y-4 max-w-[450px] mx-auto  my-10 rounded-lg">
        <LoginForm />
        <div className=" w-full flex flex-col items-center justify-center ">
          <Link href="/" className="  text-primary_color">
            Forgot Password?
          </Link>
        </div>
        <div className=" w-full flex flex-col items-center justify-center ">
          <h1>
            Not signed up?{" "}
            <Link href="/signup" className="  text-primary_color">
              Signup
            </Link>
          </h1>
        </div>
      </div>
    </Layout>
  );
}
