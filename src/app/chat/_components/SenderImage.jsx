import Avatar from "@/components/Avatar";
import Link from "next/link";
import avatar from "../_components/assets/images/avatar-6.jpg";
import ChatAction from "./ChatAction";
export default function SenderImage() {
  return (
    <li className="clear-both py-4">
      <div className="relative inline-flex items-end mb-6 text-right ltr:rtl:float-left ltr:float-right rtl:float-left">
       
          <div className="order-3 mr-0 ltr:ml-4 rtl:mr-4">
            <Avatar src={avatar} className="rounded-full h-9 w-9" alt="" />
          </div>

          <div>
            <div className="flex justify-end gap-2 mb-2">
              <div className="relative order-2 px-5 py-3 text-gray-700 rounded-lg rounded-br-none bg-gray-50 dark:bg-zinc-700">
                <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent ltr:before:border-r-gray-50 ltr:before:border-t-gray-50 rtl:before:border-l-gray-50 rtl:before:border-t-gray-50 ltr:before:right-0 rtl:before:left-0 before:-bottom-2 ltr:dark:before:border-t-zinc-700 ltr:dark:before:border-r-zinc-700 rtl:dark:before:border-t-zinc-700 rtl:dark:before:border-l-zinc-700"></div>
                <div className="p-2 mb-2 bg-white rounded dark:bg-zinc-800">
                  <div className="flex flex-wrap items-center gap-2 attached-file">
                    <div className="flex items-center justify-center w-12 h-12 rounded group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                      <i className="ri-file-text-fill"></i>
                    </div>
                    <div className="overflow-hidden flex-grow-1">
                      <div className="text-start">
                        <h5 className="mb-1 truncate text-14 dark:text-gray-50">
                          admin_v1.0.zip
                        </h5>
                        <p className="mb-0 text-gray-500 truncate text-13 dark:text-gray-500">
                          12.5 MB
                        </p>
                      </div>
                    </div>
                    <div className="rtl:mr-4 ltr:ml-4">
                      <div className="flex items-start gap-2">
                        <div>
                          <Link
                            download="admin_v1.0.zip"
                            href="assets/images/small/admin_v1.0.zip"
                            className="font-medium"
                          >
                            <i className="text-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 ri-download-2-line"></i>
                          </Link>
                        </div>
                        <div className="relative self-start order-1 dropstart">
                          <a
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButton20"
                          >
                            <i className="text-lg text-gray-500 ri-more-2-fill dark:text-gray-300"></i>
                          </a>
                          <div
                            className="absolute left-0 right-auto z-50 hidden py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg lg:ltr:right-0 lg:ltr:left-auto rtl:left-0 rtl:right-auto dropdown-menu w-36 bg-clip-padding dark:bg-zinc-700"
                            aria-labelledby="dropdownMenuButton20"
                          >
                            <a
                              className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                              href="#"
                            >
                              Forward
                              <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-chat-forward-line"></i>
                            </a>
                            <a
                              className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                              href="#"
                            >
                              Delete
                              <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-delete-bin-line"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-1 mb-0 text-xs text-left text-gray-500">
                  <i className="align-middle ri-time-line"></i>
                  <span className="align-middle">10:16</span>
                </p>
              </div>

              <ChatAction />
            </div>

            <div className="font-medium text-gray-700 rtl:text-left text-14 dark:text-gray-300">
              Patricia Smith
            </div>
          </div>
        </div>
       
    </li>
  );
}
