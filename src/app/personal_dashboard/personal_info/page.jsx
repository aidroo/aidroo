import { fetchSinglePersonalProfile } from "@/queries/admin-dashboard-getProfiles";
import PersonalProfileEditForm from "./_components/PersonalProfileEditForm";

export default async function Personal_info({ searchParams }) {
  const username = searchParams.username;
  const { profiles } = fetchSinglePersonalProfile({ username });

  console.log(profiles);

  return <PersonalProfileEditForm />;
}
