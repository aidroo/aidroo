import Avatar from "@/components/Avatar";
import Link from "next/link";
import avatar from "../_components/assets/images/avatar-5.jpg";
import ChatAction from "./ChatAction";
export default function SenderText() {
  return (
    <li className="clear-both py-4">
      <div className="relative inline-flex items-end mb-6 text-right ltr:rtl:float-left ltr:float-right rtl:float-left">
        <div className="order-3 mr-0 ltr:ml-4 rtl:mr-4">
          <Avatar src={avatar} className="rounded-full h-9 w-9" alt="" />
        </div>

        <div>
          <div className="flex gap-2 mb-2 ltr:justify-end rtl:justify-start">
            <div className="relative order-2 px-5 py-3 text-gray-700 rounded-lg ltr:rounded-br-none rtl:rounded-bl-none bg-gray-50 dark:bg-zinc-700 dark:text-gray-50">
              <p className="mb-0 max-w-64 w-fullflex justify-start">
                Good morning, How are you? What about our next meeting?
              </p>
              <p className="mt-1 mb-0 text-xs text-left text-gray-500 dark:text-gray-300">
                <span className="align-middle">10:02</span>
              </p>
              <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent ltr:before:border-r-gray-50 ltr:before:border-t-gray-50 rtl:before:border-l-gray-50 rtl:before:border-t-gray-50 ltr:before:right-0 rtl:before:left-0 before:-bottom-2 ltr:dark:before:border-t-zinc-700 ltr:dark:before:border-r-zinc-700 rtl:dark:before:border-t-zinc-700 rtl:dark:before:border-l-zinc-700"></div>
            </div>

            <div className="relative self-start order-1 dropstart">
              <Link
                className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                id="dropdownMenuButton13"
              >
                {/* <i className="ri-more-2-fill"></i> */}
              </Link>
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
