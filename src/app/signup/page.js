// app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/signup/personal");
  return null;
}