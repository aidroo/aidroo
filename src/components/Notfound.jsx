"use client";
import { notFound } from "@/exportImage";
import Image from "next/image";

export default function Notfound() {
  return (
    <div className="  flex justify-center items-center ">
      <Image src={notFound} alt="fff " priority={true} />
    </div>
  );
}
