 
import Image from "next/image";
import avater from "../_components/assets/images/avatar-5.jpg";
import ChatAction from "./ChatAction";

export default function ReciverText() {
  return (
    <li className="clear-both py-4">
      <div className="flex items-end gap-3">
        <div>
          <Image src={avater}   alt="images" width={40} height={40} className="rounded-full" />
        </div>

        <div>
          <div className="flex gap-2 mb-2">
            <div className="relative px-5 py-3 text-white bg-[#7269ef]  rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
              <p className="mb-0">Good morning</p>
              <p className="mt-1 mb-0 text-xs text-right text-white/50">
                <i className="align-middle ri-time-line"></i>
                <span className="align-middle">10:00</span>
              </p>
              <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
            </div>
            <ChatAction />
          </div>
          <div className="font-medium text-gray-700 text-14 dark:text-gray-300">
            Doris Brown
          </div>
        </div>
      </div>
    </li>
  );
}

//  <li className="clear-both py-4">
//    <div className="flex items-end gap-3">
//      <div>
//        <Image
//          src={avatar}
//          className="rounded-full h-9 w-9"
//          alt=""
//          width={40}
//          height={40}
//        />
//      </div>

//      <div>
//        <div className="flex gap-2 mb-2">
//          <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
//            <p className="mb-0">Yeah everything is fine</p>
//            <p className="mt-1 mb-0 text-xs text-right text-white/50">
//              <i className="align-middle ri-time-line"></i>
//              <span className="align-middle">10:05</span>
//            </p>
//            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
//          </div>
//          <ChatAction />
//        </div>

//        <div className="flex gap-2 mb-2">
//          <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
//            <p className="mb-0">& Next meeting tomorrow 10.00AM</p>
//            <p className="mt-1 mb-0 text-xs text-right text-white/50">
//              <i className="align-middle ri-time-line"></i>
//              <span className="align-middle">10:05</span>
//            </p>
//            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
//          </div>
//          <ChatAction />
//        </div>

//        <div className="font-medium text-gray-700 text-14 dark:text-gray-300">
//          Doris Brown
//        </div>
//      </div>
//    </div>
//  </li>;
