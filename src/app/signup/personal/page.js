import { checkUserExistsWithUsername } from "@/queries/user-query";
import PersonalSingupForm from "./_components/PeronalSignupForm";

export default async function PersonalSignup({ searchParams }) {
  const username = searchParams.username;
  const isExit = await checkUserExistsWithUsername(username);
  return <PersonalSingupForm isExit={isExit} />;
}
