import Image from "next/image";

import Link from "next/link";
import avatar from "../_components/assets/images/avatar-6.jpg";
import ChatAction from "./ChatAction";

export default function ReciverImage() {
  return (
    <li className="clear-both py-4">
      <div className="flex items-end gap-3">
        <div>
          <Image
            src={avatar}
            className="rounded-full h-9 w-9"
            alt=""
            width={40}
            height={40}
          />
        </div>

        <div>
          <div className="flex gap-2 mb-2">
            <div className="relative px-5 py-3 text-white rounded-lg bg-[#7269ef] ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
              <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
              <ul className="relative mb-0">
                {[1, 2].map((item) => (
                  <li className="relative inline-block mr-2" key={item}>
                    <div>
                      <a
                        className="inline-block m-1 popup-img"
                        href="assets/images/small/img-1.jpg"
                        title="Project 1"
                      >
                        <Image src={avatar} alt="" width={100} height={100} />
                      </a>
                    </div>
                    <div className="absolute right-[10px] left-auto bottom-[10px]">
                      <ul>
                        <li className="inline-block p-2">
                          <a
                            download="img-1.jpg"
                            href="assets/images/small/img-1.jpg"
                            className="font-medium"
                          >
                            <i className="text-lg ri-download-2-line"></i>
                          </a>
                        </li>
                        <li className="relative self-start inline-block p-2 dropdown">
                          <Link
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButton17"
                          ></Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-1 mb-0 text-xs text-right text-white/50">
                <i className="align-middle ri-time-line"></i>
                <span className="align-middle">10:09</span>
              </p>
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
