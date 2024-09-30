import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { VscBriefcase } from "react-icons/vsc";

export default function BusinessNavbar() {
  return (
    <TabsList className="w-full  grid grid-cols-3 gap-4 h-16 px-4">
      {/* review */}
      <TabsTrigger value="review" className=" border h-12">
        <FaRegStar className=" lg:text-[22px] mr-2" />
        <span className=" text-sm mg:text-16">Reviews</span>
      </TabsTrigger>
      {/* jobs */}
      <TabsTrigger value="job" className=" border h-12">
        <VscBriefcase className="text-xl lg:text-2xl mr-2" />
        <span>Jobs</span>
      </TabsTrigger>
      <TabsTrigger value="more" className=" border h-12">
        <IoIosArrowDropright className="text-xl lg:text-2xl mr-2" />
        <span>More</span>
      </TabsTrigger>
    </TabsList>
  );
}
