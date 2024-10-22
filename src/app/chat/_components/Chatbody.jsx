import Image from "next/image";

import { FaCircle, FaPhoneAlt, FaSearch } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { RiMore2Fill } from "react-icons/ri";
import avatar from "./assets/images/avatar-4.jpg";
import Chats from "./Chats";
/* eslint-disable @next/next/no-img-element */
export default function Chatbody() {
  return (
    //  <!-- Start User chat -->
    <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
      <div className="lg:flex">
        {/* <!-- start chat conversation section --> */}

        <div className="relative w-full overflow-hidden">
          {/* header */}
          <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
            <div className="grid items-center grid-cols-12">
              <div className="col-span-8 sm:col-span-4">
                <div className="flex items-center">
                  <div className="block ltr:mr-2 rtl:ml-2 lg:hidden">
                    <a
                      href="javascript: void(0);"
                      className="p-2 text-gray-500   text-16"
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </a>
                  </div>
                  <div className="rtl:ml-3 ltr:mr-3">
                    <Image
                      src={avatar}
                      className="rounded-full h-9 w-9"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h5 className="mb-0 flex items-center gap-2 truncate text-16 ltr:block rtl:hidden">
                      <a href="#" className="text-gray-800 dark:text-gray-50">
                        Doris Brown
                      </a>
                      <FaCircle  className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10"/> 
                    </h5>
                    <h5 className="mb-0 truncate text-16 rtl:block ltr:hidden flex  items-center gap-4">
                      {/* <FaCircle className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10"/> */}
                      <a href="#" className="text-gray-800 dark:text-gray-50">
                        Doris Brown
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-8">
                <ul className="flex items-center justify-end lg:gap-4">
                  <li className="px-3">
                    <div className="relative dropstart">
                      <button
                        className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButton10"
                        data-tw-auto-close="outside"
                      >
                        <FaSearch />
                      </button>
                      <ul
                        className="absolute z-50 hidden mt-2 text-left list-none bg-white border rounded-lg shadow-lg w-fit border-gray-50 dropdown-menu top-8 dark:bg-zinc-700 bg-clip-padding dark:border-gray-700"
                        aria-labelledby="dropdownMenuButton10"
                      >
                        <li className="p-2">
                          <input
                            type="text"
                            className="text-gray-500 border-0 rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-600 dark:text-gray-300 placeholder:dark:text-gray-300 focus:ring-0"
                            placeholder="Search.."
                          />
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="hidden text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block"
                      data-tw-toggle="modal"
                      data-tw-target="#audiCallModal"
                    >
                      <FaPhoneAlt />
                    </button>
                  </li>

                  {/* <!-- Modal start --> */}
                  <li className="relative z-50 hidden modal" id="audiCallModal">
                    <div className="fixed inset-0 z-50 overflow-hidden">
                      <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
                      <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                        <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                          <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                            <div className="p-4">
                              <div className="p-6">
                                <div className="p-4 text-center">
                                  <div className="mb-6">
                                    <Image
                                      src={avatar}
                                      className="rounded-full h-9 w-9"
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>

                                  <h5 className="mb-1 text-gray-800 truncate dark:text-gray-50">
                                    Doris Brown
                                  </h5>
                                  <p className="text-gray-500 dark:text-gray-300">
                                    Start Audio Call
                                  </p>

                                  <div className="mt-10">
                                    <ul className="flex justify-center mb-1">
                                      <li className="px-2 ml-0 mr-2">
                                        <button
                                          type="button"
                                          className="w-12 h-12 text-white bg-red-500 border-transparent rounded-full btn hover:bg-red-600"
                                          data-tw-dismiss="modal"
                                        >
                                          <span className="text-xl bg-transparent">
                                            <i className="ri-close-fill"></i>
                                          </span>
                                        </button>
                                      </li>
                                      <li className="px-2">
                                        <button
                                          type="button"
                                          className="w-12 h-12 text-white bg-green-500 border-transparent rounded-full btn hover:bg-green-600"
                                        >
                                          <span className="text-xl bg-transparent">
                                            <i className="ri-phone-fill"></i>
                                          </span>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <!-- Modal end --> */}

                  <li>
                    <button
                      type="button"
                      className="hidden text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block"
                      data-tw-toggle="modal"
                      data-tw-target="#videoCallModal"
                    >
                      <IoVideocam />
                    </button>
                  </li>

                  {/* <!-- Modal start --> */}
                  <li
                    className="relative z-50 hidden modal dark:text-gray-300"
                    id="videoCallModal"
                  >
                    <div className="fixed inset-0 z-50 overflow-hidden">
                      <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
                      <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                        <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                          <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                            <div className="p-4">
                              <div className="p-6">
                                <div className="p-4 text-center">
                                  <div className="mb-6">
                                    <Image
                                      src={avatar}
                                      className="rounded-full h-9 w-9"
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>

                                  <h5 className="mb-1 truncate dark:text-gray-50">
                                    Doris Brown
                                  </h5>
                                  <p className="text-gray-500 dark:text-gray-300">
                                    Start Video Call
                                  </p>

                                  <div className="mt-10">
                                    <ul className="flex justify-center mb-1">
                                      <li className="px-2 ml-0 mr-2">
                                        <button
                                          type="button"
                                          className="w-12 h-12 text-white bg-red-500 border-transparent rounded-full btn hover:bg-red-600"
                                          data-tw-dismiss="modal"
                                        >
                                          <span className="text-xl bg-transparent">
                                            <i className="ri-close-fill"></i>
                                          </span>
                                        </button>
                                      </li>
                                      <li className="px-2">
                                        <button
                                          type="button"
                                          className="w-12 h-12 text-white bg-green-500 border-transparent rounded-full btn hover:bg-green-600"
                                        >
                                          <span className="text-xl bg-transparent">
                                            <i className="ri-vidicon-fill"></i>
                                          </span>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <!-- Modal end --> */}

                  <li className="px-3">
                    <a
                      href="#"
                      className="hidden text-gray-500 dark:text-gray-300 lg:block profileTab"
                    >
                      <FaUserGroup />
                    </a>
                  </li>

                  <li className="px-3">
                    <div className="relative dropdown">
                      <button
                        className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButton11"
                      >
                        <RiMore2Fill />
                      </button>
                      <ul
                        className="absolute z-50 hidden w-40 py-2 mx-4 mt-2 text-left list-none bg-white border rounded shadow-lg ltr:-right-4 border-gray-50 dropdown-menu top-8 dark:bg-zinc-600 bg-clip-padding dark:border-gray-600/50 rtl:-left-5"
                        aria-labelledby="dropdownMenuButton11"
                      >
                        <li className="block lg:hidden">
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent profileTab dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                            href="#"
                          >
                            View profile
                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-user-2-line text-16"></i>
                          </a>
                        </li>
                        <li className="block lg:hidden">
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                            href="#"
                            data-tw-toggle="modal"
                            data-tw-target="#audiCallModal"
                          >
                            Audio
                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-phone-line text-16"></i>
                          </a>
                        </li>
                        <li className="block lg:hidden">
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                            href="#"
                            data-tw-toggle="modal"
                            data-tw-target="#videoCallModal"
                          >
                            Video
                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-vidicon-line text-16"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                            href="#"
                          >
                            Archive
                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-archive-line text-16"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                            href="#"
                          >
                            Muted
                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-volume-mute-line text-16"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right"
                            href="#"
                          >
                            Delete
                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-delete-bin-line text-16"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- end chat user head --> */}

          {/* <!-- start chat conversation --> */}
          <Chats />

          {/* <!-- end chat conversation end --> */}

          {/* <!-- start chat input section --> */}
          {/* <div className="z-40 w-full p-6 mb-0 bg-white border-t lg:mb-1 border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
            <div className="flex gap-2">
              <div className="flex-grow">
                <input
                  type="text"
                  className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-700 dark:placeholder:text-gray-300 dark:text-gray-300"
                  placeholder="Enter Message..."
                />
              </div>
              <div>
                <div>
                  <ul className="mb-0">
                    <li className="inline-block" title="Emoji">
                      <button
                        type="button"
                        className="border-transparent group/tooltip btn relative group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16"
                      >
                        <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                          <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                            Emoji
                          </span>
                        </div>
                        <i className="ri-emotion-happy-line"></i>
                      </button>
                    </li>
                    <li className="inline-block" title="Attached File">
                      <button
                        type="button"
                        className="border-transparent btn group/tooltip group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16"
                      >
                        <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                          <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                            Attached File
                          </span>
                        </div>
                        <i className="ri-attachment-line"></i>
                      </button>
                    </li>
                    <li className="inline-block">
                      <button
                        type="submit"
                        className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600"
                      >
                        <i className="ri-send-plane-2-fill"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* <!-- end chat input section --> */}
        </div>
        {/* <!-- end chat conversation section --> */}

        {/* <!-- start User profile detail sidebar --> */}
        {/* <!-- Start profile content --> */}
        <div
          className="user-profile-sidebar h-[100vh] bg-white shadow overflow-y-hidden mb-[85px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-800 border-l-4 border-gray-50 dark:border-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 absolute xl:relative top-0 bottom-0"
          style={{ display: "none" }}
        >
          <div className="px-6 pt-6">
            <div className="text-end">
              <button
                type="button"
                className="text-2xl text-gray-500 border-0 btn dark:text-gray-200"
                id="user-profile-hide"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>

          <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
            <div className="mb-4">
              <img
                src="assets/images/avatar-1.jpg"
                className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                alt=""
              />
            </div>

            <h5 className="mb-1 text-16 dark:text-gray-50">Doris Brown</h5>
            <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
              <a href="#" className="text-gray-500 dark:text-gray-50">
                <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10"></i>
                Active
              </a>
            </h5>
            <h5 className="mb-0 truncate text-14 ltr:hidden rtl:block">
              <a href="#" className="text-gray-500 dark:text-gray-50">
                Active
                <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10"></i>
              </a>
            </h5>
          </div>
          {/* <!-- End profile user --> */}

          {/* <!-- Start user-profile-desc --> */}
          {/* <div className="p-6 h-[550px]" data-simplebar>
            <div>
              <p className="mb-6 text-gray-500 dark:text-gray-300">
                If several languages coalesce, the grammar of the resulting
                language is more simple and regular than that of the individual.
              </p>
            </div>

            <div data-tw-accordion="collapse">
              <div className="text-gray-700 accordion-item">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
                  >
                    <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                      <i className="mr-2 align-middle ri-user-2-line d-inline-block"></i>
                      About
                    </span>
                    <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                      About
                      <i className="ml-2 align-middle ri-user-2-line d-inline-block"></i>
                    </span>
                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180 dark:text-gray-50"></i>
                  </button>
                </h2>

                <div className="block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                  <div className="p-5">
                    <div>
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Name
                      </p>
                      <h5 className="text-sm dark:text-gray-50">Doris Brown</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Email
                      </p>
                      <h5 className="text-sm dark:text-gray-50">adc@123.com</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Time
                      </p>
                      <h5 className="text-sm dark:text-gray-50">11:40 AM</h5>
                    </div>
                    <div className="mt-5">
                      <p className="mb-1 text-gray-500 dark:text-gray-300">
                        Location
                      </p>
                      <h5 className="text-sm dark:text-gray-50">
                        California, USA
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-gray-700 accordion-item">
                <h2>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
                  >
                    <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                      <i className="mr-2 align-middle ri-attachment-line d-inline-block"></i>
                      Attached Files
                    </span>
                    <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                      Attached Files
                      <i className="ml-2 align-middle ri-attachment-line d-inline-block"></i>
                    </span>
                    <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180 dark:text-gray-50"></i>
                  </button>
                </h2>
                <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                  <div className="p-5">
                    <div className="p-2 mb-2 border rounded border-gray-100/80 dark:bg-zinc-800 dark:border-transparent">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded ltr:mr-3 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 rtl:ml-3">
                          <div className="text-xl rounded-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 avatar-title">
                            <i className="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="text-start">
                            <h5 className="mb-1 text-sm dark:text-gray-50">
                              Admin-A.zip
                            </h5>
                            <p className="mb-0 text-gray-500 text-13 dark:text-gray-300">
                              12.5 MB
                            </p>
                          </div>
                        </div>

                        <div className="ltr:ml-4 rtl:mr-4">
                          <ul className="flex items-center gap-3 mb-0 text-lg">
                            <li>
                              <a
                                href="#"
                                className="px-1 text-gray-500 dark:text-gray-300"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li className="relative flex-shrink-0 dropstart">
                              <a
                                href="#!"
                                className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                                data-bs-toggle="dropdown"
                                id="dropdownMenuButton23"
                              >
                                <i className="text-lg ri-more-fill"></i>
                              </a>
                              <ul
                                className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                aria-labelledby="dropdownMenuButton23"
                              >
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Another action
                                  </a>
                                </li>
                                <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 mb-2 border rounded border-gray-100/80 dark:bg-zinc-800 dark:border-transparent">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded ltr:mr-3 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 rtl:ml-3">
                          <div className="text-xl rounded-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 avatar-title">
                            <i className="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="text-start">
                            <h5 className="mb-1 text-sm dark:text-gray-50">
                              Image-1.jpg
                            </h5>
                            <p className="mb-0 text-gray-500 text-13 dark:text-gray-300">
                              4.2 MB
                            </p>
                          </div>
                        </div>

                        <div className="ltr:ml-4 rtl:mr-4">
                          <ul className="flex items-center gap-3 mb-0 text-lg">
                            <li>
                              <a
                                href="#"
                                className="px-1 text-gray-500 dark:text-gray-300"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li className="relative flex-shrink-0 dropstart">
                              <a
                                href="#!"
                                className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                                data-bs-toggle="dropdown"
                                id="dropdownMenuButton2"
                              >
                                <i className="text-lg ri-more-fill"></i>
                              </a>
                              <ul
                                className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                aria-labelledby="dropdownMenuButton2"
                              >
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Another action
                                  </a>
                                </li>
                                <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 mb-2 border rounded border-gray-100/80 dark:bg-zinc-800 dark:border-transparent">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded ltr:mr-3 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 rtl:ml-3">
                          <div className="text-xl rounded-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 avatar-title">
                            <i className="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="text-start">
                            <h5 className="mb-1 text-sm dark:text-gray-50">
                              Image-2.jpg
                            </h5>
                            <p className="mb-0 text-gray-500 text-13 dark:text-gray-300">
                              3.1 MB
                            </p>
                          </div>
                        </div>

                        <div className="ltr:ml-4 rtl:mr-4">
                          <ul className="flex items-center gap-3 mb-0 text-lg">
                            <li>
                              <a
                                href="#"
                                className="px-1 text-gray-500 dark:text-gray-300"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li className="relative flex-shrink-0 dropstart">
                              <a
                                href="#!"
                                className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                                data-bs-toggle="dropdown"
                                id="dropdownMenuButton3"
                              >
                                <i className="text-lg ri-more-fill"></i>
                              </a>
                              <ul
                                className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                aria-labelledby="dropdownMenuButton3"
                              >
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Another action
                                  </a>
                                </li>
                                <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 mb-2 border rounded border-gray-100/80 dark:bg-zinc-800 dark:border-transparent">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded ltr:mr-3 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 rtl:ml-3">
                          <div className="text-xl rounded-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 avatar-title">
                            <i className="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="text-start">
                            <h5 className="mb-1 text-sm dark:text-gray-50">
                              Landing-A.zip
                            </h5>
                            <p className="mb-0 text-gray-500 text-13 dark:text-gray-300">
                              6.7 MB
                            </p>
                          </div>
                        </div>

                        <div className="ltr:ml-4 rtl:mr-4">
                          <ul className="flex items-center gap-3 mb-0 text-lg">
                            <li>
                              <a
                                href="#"
                                className="px-1 text-gray-500 dark:text-gray-300"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li className="relative flex-shrink-0 dropstart">
                              <a
                                href="#!"
                                className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                                data-bs-toggle="dropdown"
                                id="dropdownMenuButton4"
                              >
                                <i className="text-lg ri-more-fill"></i>
                              </a>
                              <ul
                                className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                                aria-labelledby="dropdownMenuButton4"
                              >
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Another action
                                  </a>
                                </li>
                                <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                <li>
                                  <a
                                    className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                    href="#"
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* <!-- end User profile detail sidebar --> */}
      </div>
    </div>
  );
}
