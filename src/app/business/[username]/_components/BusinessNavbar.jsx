import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { VscBriefcase } from "react-icons/vsc";

export default function BusinessNavbar() {
  return (
    <TabsList className="w-full  grid grid-cols-3 gap-1 lg:gap-4 h-16 px-4">
      {/* review */}
      <TabsTrigger value="review" className=" px-1 border h-12 flex gap-x-1 bg-white">
        <FaRegStar className=" text-lg lg:text-[22px]  " />
        <span className=" text-sm mg:text-16">Reviews</span>
      </TabsTrigger>
      {/* jobs */}
      <TabsTrigger value="job" className=" border h-12 bg-white">
        <VscBriefcase className="text-xl lg:text-2xl mr-2 " />
        <span>Jobs</span>
      </TabsTrigger>
      <TabsTrigger value="more" className=" border h-12 bg-white">
        <IoIosArrowDropright className="text-xl lg:text-2xl mr-2" />
        <span>More</span>
      </TabsTrigger>
    </TabsList>
  );
}
