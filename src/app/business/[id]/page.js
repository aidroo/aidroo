// app/page.js

"use client";
import { redirect, useParams, usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const { id } = useParams();
  const dynamicId = id || pathname.split("/").filter(Boolean)[1];
  redirect(`/business/${dynamicId}/reviews`);
}
