"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabsTriggerComponent() {
  const [active, setActive] = useState("latest"); // State to track active button
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams();
    if (active) query.set("filter", active);

    router.push(`/explore-jobs?${query.toString()}`, {
      shallow: true,
    });
  }, [active, router]);
  return (
    <TabsList className="grid grid-cols-3 gap-x-4 h-fit py-1">
      <TabsTrigger value="latest" className="w-full">
        <button onClick={() => setActive("latest")} className="text-xl">
          Latest
        </button>
      </TabsTrigger>
      <TabsTrigger value="top">
        <button onClick={() => setActive("top")} className="text-xl">
          Top
        </button>
      </TabsTrigger>
      <TabsTrigger value="business">
        <button onClick={() => setActive("business")} className="text-xl">
          Business
        </button>
      </TabsTrigger>
    </TabsList>
  );
}
