import { redirect } from "next/navigation";

export default function Home({ params: { username } }) {
  redirect(`/business/${username}/reviews`);
}
