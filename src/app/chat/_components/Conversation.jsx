import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { BsImageFill } from "react-icons/bs";
import avatar from "./assets/images/avatar-4.jpg";
export default function Conversation() {
  return (
    <div className="w-full ">
      <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>
      <ScrollArea className="h-[75vh] hidden lg:block">
        <div className="h-ful px-2" data-simplebar>
          <ul className="flex gap-4 lg:flex-col  ">
            {[1, 2, 3, 4, 5, 6, 11, 21, 41, 51, 64, 71, 81, 91, 41, 51, 61].map(
              (item) => (
                <li className="w-full flex items-center gap-2 " key={item}>
                  <div className="relative  w-fit    ">
                    <Image
                      src={avatar}
                      className="rounded-full w-9 h-9"
                      alt=""
                      width={40}
                      height={40}
                    />
                    <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 right-0  "></span>
                  </div>
                  <div className=" w-full flex justify-between items-center ">
                    <div>
                      <h1 className="mb-1 text-base truncate">Mark messar</h1>
                      <p className="mb-0 text-gray-800 truncate flex items-center gap-2 dark:text-gray-300 text-14">
                        <BsImageFill />
                        Images
                      </p>
                    </div>
                    <div className=" flex  flex-col justify-center  ">
                      <span className="text-gray-500 text-11  ">12 min</span>
                      <span className="bg-primary_color  h-5 flex items-center justify-center  text-white text-11 rounded-full">
                        02
                      </span>
                    </div>
                  </div>

                  
                </li>
              )
            )}
          </ul>
        </div>
      </ScrollArea>
      <ScrollArea className="w-full border-b-0   lg:hidden  p-4 ">
        <ul className="w-full flex gap-4 lg:flex-col ">
          {[1, 2, 3, 4, 5, 6, 11, 21, 41, 51, 64, 71, 81, 91, 41, 51, 61].map(
            (item) => (
              <li
                className="flex-shrink-0 w-fit flex items-center gap-2"
                key={item}
              >
                <div className="relative w-fit">
                  <Image
                    src={avatar}
                    className="rounded-full  "
                    alt=""
                    width={60}
                    height={60}
                  />
                  <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 right-0"></span>
                </div>
              </li>
            )
          )}
        </ul>
        <ScrollBar orientation="horizontal" /> 
      </ScrollArea>
    </div>
  );
}

{
  /* <li   className="unread px-5 py-[15px]  ">
      <a href="#">
        <div className="relative flex">
          <div className="relative self-center  ">
            <Image
              src={avatar}
              className="rounded-full w-9 h-9"
              alt=""
              width={40}
              height={40}
            />
            <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
          </div>
          <div className="flex-grow overflow-hidden hidden lg:block">
            <h5 className="mb-1 text-base truncate dark:text-gray-50">
              Mark Messer
            </h5>
            <p className="mb-0 text-gray-800 truncate dark:text-gray-300 text-14">
              <i className="align-middle ri-image-fill me-1 ms-0"></i>
              Images
            </p>
          </div>
          <div className="text-gray-500 text-11 dark:text-gray-300 hidden lg:block">
            12 min
          </div>
          <div className="absolute bottom-0 ltr:right-0 rtl:left-0 hidden lg:block">
            <span className="px-2 py-1 text-red-500 rounded-full bg-red-500/20 text-11">
              02
            </span>
          </div>
        </div>
      </a>
    </li> */
}
