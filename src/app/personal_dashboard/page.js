// app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/personal_dashboard/personal_info");
}
