import { ScrollArea } from "@/components/ui/scroll-area";
import ReciverImage from "./ReciverImage";
import ReciverText from "./ReciverText";
import SenderImage from "./SenderImage";
import SenderText from "./SenderText";
import Separator from "./Separator";

export default function Chats() {
  return (
    <ScrollArea className="h-[80vh] p-4 lg:p-6">
      <ul className="mb-0">
        <ReciverText />
        <SenderText />
        <ReciverText />
        <SenderText />
        <ReciverText />
        <SenderText />
        <ReciverText />
        <SenderText />

        <Separator />

        <ReciverImage />
        <SenderImage />

        {/* <li className="clear-both py-4">
          <div className="flex items-end gap-3">
            <div className="w-8 h-8">
              <Image src={image} alt="" />
            </div>

            <div>
              <div className="flex gap-2 mb-2">
                <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                  <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
                  <div className="flex items-end gap-2 mb-0 text-white text-14">
                    <p className="mb-0">typing</p>

                    <div className="animate-typing flex gap-0.5">
                      <p className="w-1 h-1 mb-1 bg-white rounded-full dot animate-bounce"></p>
                      <p className="w-1 h-1 mb-1 bg-white rounded-full dot-2"></p>
                      <p className="w-1 h-1 mb-1 bg-white rounded-full dot-3 animate-bounce"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-medium text-gray-700 text-14 dark:text-gray-300">
                Doris Brown
              </div>
            </div>
          </div>
        </li> */}
      </ul>
    </ScrollArea>
  );
}
