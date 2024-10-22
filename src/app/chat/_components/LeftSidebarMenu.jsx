/* eslint-disable @next/next/no-img-element */
 
import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FcContacts } from "react-icons/fc";
import { IoLogOut } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";
import { MdGroup } from "react-icons/md";
import avatar from "./assets/images/avatar-1.jpg";
import logo from "./assets/images/logo.svg";
export default function LeftSidebarMenu() {
  return (
    <div className="sidebar-menu w-full lg:w-[75px] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative   bottom-0 bg-white dark:bg-zinc-600  ">
      <div className="hidden lg:my-5 lg:block">
        <a href="index.html" className="block dark:hidden">
          <span>
            <Image src={logo} alt="" className="h-[30px]" />
          </span>
        </a>

        <a href="index.html" className="hidden dark:block">
          <span>
            <Image src={logo} alt="" className="h-[30px]" />
          </span>
        </a>
      </div>
      {/* <!-- end navbar-brand-box --> */}

      {/* <!-- Start side-menu nav --> */}
      {/* <!-- Tabs --> */}
      <div className="w-full mx-auto lg:my-auto">
        <ul
          id="tabs"
          className="flex flex-row justify-center w-full lg:flex-col lg:flex nav-tabs"
        >
          <li className="flex-grow lg:flex-grow-0">
            <a
              id="default-tab"
              href="#first"
              className="tab-button flex relative items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
            >
              <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                  Profile
                </span>
              </div>
              <FaRegUser />
            </a>
          </li>
          <li className="flex-grow lg:flex-grow-0">
            <a
              href="#second"
              className="tab-button active relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
            >
              <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                  Chats
                </span>
              </div>
              <LuMessageCircle />
            </a>
          </li>
          <li className="flex-grow lg:flex-grow-0">
            <a
              href="#third"
              className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
            >
              <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                  Groups
                </span>
              </div>
              <MdGroup />
            </a>
          </li>
          <li className="flex-grow lg:flex-grow-0">
            <a
              href="#fourth"
              className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
            >
              <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                  Contacts
                </span>
              </div>
              <FcContacts />
            </a>
          </li>
          <li className="flex-grow lg:flex-grow-0">
            <a
              href="#fifth"
              className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg"
            >
              <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                  Settings
                </span>
              </div>
              <CiSettings />
            </a>
          </li>
        </ul>
      </div>

      <div className="w-20  lg:w-auto">
        <ul className="lg:block">
          <li className="relative   dropdown lg:dropup">
            <a
              href="#"
              className="dropdown-toggle"
              id="dropdownButton2"
              data-bs-toggle="dropdown"
            >
              <Image
                src={avatar}
                alt=""
                className="w-10 h-10 p-1 mx-auto rounded-full bg-gray-50 dark:bg-zinc-700"
                width={40}
                height={40}
              />
            </a>

            <ul
              className="absolute z-40 hidden float-left w-40 py-2 mx-4 mb-12 text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu bg-clip-padding dark:bg-zinc-700"
              aria-labelledby="dropdownButton2"
            >
              <li>
                <a
                  className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                  href="#"
                >
                  Profile
                  <i className="text-gray-500 rtl:float-left ltr:float-right ri-profile-line text-16"></i>
                </a>
              </li>
              <li>
                <a
                  className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                  href="#"
                >
                  Setting
                  <p className="text-gray-500 rtl:float-left ltr:float-right ri-settings-3-line text-16"></p>
                </a>
              </li>
              <li>
                <a
                  className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                  href="auth-lock-screen.html"
                >
                  Lock Screen
                  <p className="text-gray-500 rtl:float-left ltr:float-right ri-git-repository-private-line text-16"></p>
                </a>
              </li>
              <li className="my-2 border-b border-gray-100/20"></li>
              <li>
                <a
                  className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right"
                  href="auth-login.html"
                >
                  Log out
                  <IoLogOut className="text-gray-500 rtl:float-left ltr:float-right ri-logout-circle-r-line text-16" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
