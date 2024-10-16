import { redirect } from "next/navigation";

export default function page({ params }) {
  return redirect(`/business/${params.username}/reviews`);
}
