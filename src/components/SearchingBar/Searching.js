// "use client";
// import { filter, whitesearch } from "@/exportImage";
// import Image from "next/image";
// import { Input } from "../ui/input";

// export default function SearchingBar() {
//   return (
//     <form className="flex gap-x-4 justify-center  h-10">
//       <Input
//         type="text"
//         name="search"
//         placeholder="Search"
//         className="bg-white dark:bg-dark  max-w-80  "
//         onChange={(e) => handleInputChange(e)}
//       />

//       <div className="relative flex gap-4">
//         <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-10 md:w-[42px]    ">
//           <Image src={filter} alt="Icon 1" className="w-5" />
//         </div>
//         <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-10 md:w-[42px] ">
//           <Image src={whitesearch} alt="Icon 1" className="w-5" />
//         </div>
//       </div>
//     </form>
//   );
// }
