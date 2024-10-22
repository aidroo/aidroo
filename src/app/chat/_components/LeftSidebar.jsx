/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */
 
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Conversation from "./Conversation";
 

export default function LeftSidebar() {
  return (
    <div className="chat-leftsidebar w-full lg:w-[380px] z-20 group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
      <div>
        {/* <!-- Start Profile tab-pane --> */}
        <div className="tab-content">
          {/* <!-- Start profile content --> */}
          <div>
            <div className="px-6 pt-6">
              <div className="ltr:float-right rtl:float-left">
                <div className="relative flex-shrink-0 dropdown">
                  <button
                    className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                    data-bs-toggle="dropdown"
                    id="dropdownMenuButtonA"
                  >
                    <i className="text-lg ri-more-2-fill"></i>
                  </button>
                  <ul
                    className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:right-auto rtl:left-0 ltr:left-auto ltr:right-0 my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                    aria-labelledby="dropdownMenuButtonA"
                  >
                    <li>
                      <a
                        className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                        href="#"
                      >
                        Another action
                      </a>
                    </li>
                    <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                    <li>
                      <a
                        className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                        href="#"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <h4 className="mb-0 text-gray-700 dark:text-gray-50">
                My Profile
              </h4>
            </div>

            <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
              <div className="mb-4">
                {/* <Image
                  src="../_components/assets/avatar-1.jpg"
                  className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                  alt=""
                  width={80}
                  height={80}
                /> */}
              </div>

              <h5 className="mb-1 text-16 dark:text-gray-50">Patricia Smith</h5>

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
            <div className="p-6 h-[550px]" data-simplebar>
              <div>
                <p className="mb-6 text-gray-500 dark:text-gray-300">
                  If several languages coalesce, the grammar of the resulting
                  language is more simple and regular than that of the
                  individual.
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
                        <h5 className="text-sm dark:text-gray-50">
                          Patricia Smith
                        </h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                          Email
                        </p>
                        <h5 className="text-sm dark:text-gray-50">
                          adc@123.com
                        </h5>
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
                          CalihtmlFornia, USA
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
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Action
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Another action
                                    </a>
                                  </li>
                                  <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
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
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Action
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Another action
                                    </a>
                                  </li>
                                  <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
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
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Action
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Another action
                                    </a>
                                  </li>
                                  <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
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
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Action
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                                      href="#"
                                    >
                                      Another action
                                    </a>
                                  </li>
                                  <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600"></li>
                                  <li>
                                    <a
                                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
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
            </div>
          </div>
        </div>

        <div className="tab-content active">
          {/* <!-- Start chat content --> */}
          <div>
            <div className="px-6 pt-6">
              <h4 className="mb-0 text-gray-700 dark:text-gray-50">Chats</h4>

              <div className="py-1 flex gap-4 justify-start mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 mt-3">
                <span
                  className="group-data-[theme-color=violet]:bg-slate-100 flex items-center group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1  group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  id="basic-addon1"
                >
                  {/* <i className="text-lg text-gray-400 ri-search-line search-icon dark:text-gray-200"></i> */}
                  <IoSearch />
                </span>
                <input
                  type="text"
                  className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-gray-400"
                  placeholder="Search messages or users"
                  aria-label="Search messages or users"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            {/* <!-- Start user status --> */}
            <div className="px-6 pb-6" dir="ltr">
              <div className="owl-carousel owl-theme" id="user-status-carousel">
                <div className="text-center">
                  <a
                    href="#"
                    className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  >
                    <div className="absolute inset-0 text-center">
                      <img
                        src="assets/images/avatar-2.jpg"
                        alt="user-img"
                        className="mx-auto rounded-full w-9 h-9"
                      />
                      <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                    </div>

                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">
                      Patrick
                    </h5>
                  </a>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  >
                    <div className="absolute inset-0 block text-center">
                      <img
                        src="assets/images/avatar-4.jpg"
                        alt="user-img"
                        className="mx-auto rounded-full w-9 h-9"
                      />
                      <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                    </div>

                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">
                      Doris
                    </h5>
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="#"
                    className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  >
                    <div className="absolute inset-0 block text-center">
                      <img
                        src="assets/images/avatar-5.jpg"
                        alt="user-img"
                        className="mx-auto rounded-full w-9 h-9"
                      />
                      <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                    </div>

                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">
                      Emily
                    </h5>
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="#"
                    className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  >
                    <div className="absolute inset-0 block text-center">
                      <img
                        src="assets/images/avatar-6.jpg"
                        alt="user-img"
                        className="mx-auto rounded-full w-9 h-9"
                      />
                      <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                    </div>

                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">
                      Steve
                    </h5>
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="#"
                    className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  >
                    <div className="absolute inset-0 block mx-auto rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                      <span className="font-medium leading-9 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                        T
                      </span>
                      <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-1 dark:border-zinc-600"></span>
                    </div>
                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">
                      Teresa
                    </h5>
                  </a>
                </div>
              </div>
              {/* <!-- end user status carousel --> */}
            </div>
            {/* <!-- end user status --> */}

            {/* <!-- Start chat-message-list --> */}
           <Conversation/>
            {/* <!-- End chat-message-list --> */}
          </div>
        </div>

        <div className="tab-content">
          {/* <!-- Start chat content --> */}

          <div className="h-screen lg:h-auto">
            <div className="p-6">
              <div className="ltr:float-right rtl:float-left">
                <div className="relative">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="px-4 text-lg text-gray-500 group/tag dark:text-gray-300"
                    data-tw-toggle="modal"
                    data-tw-target="#modal-id"
                  >
                    <i className="ri-group-line me-1 ms-0"></i>
                    <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-8 rtl:-right-8">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                        Create groups
                      </span>
                      <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12"></span>
                    </span>
                  </button>
                </div>
              </div>
              <h4 className="mb-6 dark:text-gray-50">Groups</h4>

              {/* <!-- Start add group Modal --> */}
              <div className="relative z-50 hidden modal" id="modal-id">
                <div className="fixed inset-0 z-50 overflow-hidden">
                  <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
                  <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                    <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transhtmlForm bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                      <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-800/10 group-data-[theme-color=red]:bg-red-800/10 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-500">
                          <h5
                            className="mb-0 text-gray-800 text-16 dark:text-gray-50"
                            id="addgroup-exampleModalLabel"
                          >
                            Create New Group
                          </h5>
                          <button
                            type="button"
                            className="absolute top-3 ltr:right-2.5 rtl:left-2.5 text-gray-400 border-transparent hover:bg-gray-50/50/50 hover:text-gray-900 rounded-lg text-sm px-2 py-1 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:text-gray-100"
                            data-tw-dismiss="modal"
                          >
                            <i className="text-xl text-gray-500 mdi mdi-close dark:text-zinc-100/60"></i>
                          </button>
                        </div>
                        <div className="p-4">
                          <div>
                            <div className="mb-8">
                              <label className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">
                                Group Name
                              </label>
                              <input
                                type="text"
                                className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 placeholder:dark:text-gray-200 dark:border-zinc-500"
                                id="addgroupname-input"
                                placeholder="Enter Group Name"
                              />
                            </div>
                            <div className="mb-8 ltr:text-left rtl:text-right">
                              <label className="dark:text-gray-300">
                                Group Members{" "}
                              </label>
                              <div className="mt-2 mb-3">
                                <button
                                  className="group-data-[theme-color=violet]:bg-slate-200 group-data-[theme-color=green]:bg-white group-data-[theme-color=red]:bg-white border-0 btn group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 dark:text-gray-50"
                                  type="button"
                                  id="toggleButton"
                                >
                                  Select Members
                                </button>
                              </div>

                              <div className="hidden" id="collapseElement">
                                <div className="border border-gray-100 rounded dark:border-zinc-500">
                                  <div className="px-3 py-2 rounded bg-gray-100/50 dark:bg-zinc-600">
                                    <h5 className="mb-0 text-base text-gray-800 dark:text-gray-50">
                                      Contacts
                                    </h5>
                                  </div>
                                  <div className="p-2 bg-white dark:bg-zinc-800">
                                    <div data-simplebar className="h-[150px]">
                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          A
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck1"
                                                checked
                                              />
                                              <label
                                                //   htmlFor="memberCheck1"
                                                className="dark:text-gray-300"
                                              >
                                                Albert Rodarte
                                              </label>
                                            </div>
                                          </li>

                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck2"
                                              />
                                              <label
                                                htmlFor="memberCheck2"
                                                className="dark:text-gray-300"
                                              >
                                                Allison Etter
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          C
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck3"
                                              />
                                              <label
                                                htmlFor="memberCheck3"
                                                className="dark:text-gray-300"
                                              >
                                                Craig Smiley
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          D
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck4"
                                              />
                                              <label
                                                htmlFor="memberCheck4"
                                                className="dark:text-gray-300"
                                              >
                                                Daniel Clay
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          I
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck5"
                                              />
                                              <label
                                                htmlFor="memberCheck5"
                                                className="dark:text-gray-300"
                                              >
                                                Iris Wells
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          J
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck6"
                                              />
                                              <label
                                                htmlFor="memberCheck6"
                                                className="dark:text-gray-300"
                                              >
                                                Juan Flakes
                                              </label>
                                            </div>
                                          </li>

                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck7"
                                              />
                                              <label
                                                htmlFor="memberCheck7"
                                                className="dark:text-gray-300"
                                              >
                                                John Hall
                                              </label>
                                            </div>
                                          </li>

                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck8"
                                              />
                                              <label
                                                htmlFor="memberCheck8"
                                                className="dark:text-gray-300"
                                              >
                                                Joy Southern
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          M
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck9"
                                              />
                                              <label
                                                htmlFor="memberCheck9"
                                                className="dark:text-gray-300"
                                              >
                                                Michael Hinton
                                              </label>
                                            </div>
                                          </li>

                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck10"
                                              />
                                              <label
                                                htmlFor="memberCheck10"
                                                className="dark:text-gray-300"
                                              >
                                                Mary Farmer
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          P
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck11"
                                              />
                                              <label
                                                htmlFor="memberCheck11"
                                                className="dark:text-gray-300"
                                              >
                                                Phillis Griffin
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          R
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck12"
                                              />
                                              <label
                                                htmlFor="memberCheck12"
                                                className="dark:text-gray-300"
                                              >
                                                Rocky Jackson
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>

                                      <div>
                                        <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                          S
                                        </div>

                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input
                                                type="checkbox"
                                                className="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500"
                                                id="memberCheck13"
                                              />
                                              <label
                                                htmlFor="memberCheck13"
                                                className="dark:text-gray-300"
                                              >
                                                Simon Velez
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mb-5 ltr:text-left rtl:text-right">
                              <label
                                htmlFor="addgroupdescription-input"
                                className="block mb-2 dark:text-gray-50"
                              >
                                Description{" "}
                              </label>
                              <textarea
                                className="w-full bg-transparent border-gray-100 rounded placeholder:text-13 focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:text-gray-200 dark:placeholder:text-gray-200"
                                id="addgroupdescription-input"
                                rows={5}
                                placeholder="Enter Description"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="flex p-4 border-t border-gray-100 ltr:justify-end dark:border-zinc-500 rtl:justify-start">
                          <div>
                            <button
                              type="button"
                              className="border-0 btn hover:underline group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500"
                              data-tw-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=green]:hover:bg-green-600 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=red]:hover:bg-red-600"
                            >
                              Create Groups
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                <span
                  className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 pe-1 ps-3"
                  id="basic-addon2"
                >
                  <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
                </span>
                <input
                  type="text"
                  className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400"
                  placeholder="Search messages or users"
                  aria-label="Search messages or users"
                  aria-describedby="basic-addon2"
                />
              </div>

              {/* <!-- Start chat-group-list --> */}
              <div className="chat-message-list chat-group-list" data-simplebar>
                <ul>
                  <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                              G
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #General
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                              R
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #Reporting
                            <span className="rtl:float-left ltr:float-right px-1.5 py-0.5 text-red-500 rounded-full bg-red-500/20 text-11">
                              +23
                            </span>
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                              D
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #Designers
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                              D
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #Developers
                            <span className="rtl:float-left ltr:float-right px-1.5 py-0.5 text-red-500 rounded-full bg-red-500/20 text-11">
                              New
                            </span>
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                              P
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #Project-alpha
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                    <a href="#">
                      <div className="flex items-center">
                        <div className="ltr:mr-5 rtl:ml-5">
                          <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                            <span className="font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                              B
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <h5 className="mb-0 text-gray-700 truncate text-14 dark:text-gray-50">
                            #Snacks
                          </h5>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- End chat-group-list --> */}
            </div>
          </div>
        </div>

        <div className="tab-content">
          {/* <!-- Start chat content --> */}
          <div>
            <div className="p-6 pb-0">
              <div className="ltr:float-right rtl:float-left">
                <div className="relative">
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="px-4 text-lg text-gray-500 group/tag"
                    data-tw-toggle="modal"
                    data-tw-target="#modal-id2"
                  >
                    <i className="mr-1 ri-user-add-line ms-0 dark:text-violet-200"></i>
                    <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-8 rtl:-right-8">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                        Add Contact
                      </span>
                      <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12"></span>
                    </span>
                  </button>
                </div>
              </div>
              <h4 className="mb-6 dark:text-gray-50">Contacts</h4>

              <form
                className="relative z-50 hidden modal"
                id="modal-id2"
                aria-modal="true"
                role="modalFifth"
              >
                <div className="fixed inset-0 z-50 overflow-hidden">
                  <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
                  <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                    <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transhtmlForm bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                      <div className="bg-violet-800/10 dark:bg-zinc-700">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-500">
                          <h5
                            className="mb-0 text-gray-800 text-16 dark:text-gray-50"
                            id="addgroup-exampleModaL"
                          >
                            Add Contact
                          </h5>
                          <button
                            type="button"
                            className="absolute top-3 ltr:right-2.5 rtl:left-2.5 text-gray-400 border-transparent hover:bg-gray-50/50/50 hover:text-gray-900 rounded-lg text-sm px-2 py-1 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:text-gray-100"
                            data-tw-dismiss="modal"
                          >
                            <i className="text-xl text-gray-500 mdi mdi-close dark:text-zinc-100/60"></i>
                          </button>
                        </div>
                        <div className="p-4">
                          <form>
                            <div className="mb-5 ltr:text-left rtl:text-right">
                              <label className="block mb-2 dark:text-gray-300">
                                Email{" "}
                              </label>
                              <input
                                type="text"
                                className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:placeholder:text-gray-300"
                                id="addgroupname-input1"
                                placeholder="Enter Email"
                              />
                            </div>

                            <div className="mb-5 ltr:text-left rtl:text-right">
                              <label className="block mb-2 dark:text-gray-300">
                                Invatation Message{" "}
                              </label>
                              <textarea
                                className="w-full bg-transparent border-gray-100 rounded placeholder:text-13 focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:placeholder:text-gray-300"
                                id="addgroupdescription-input1"
                                rows={3}
                                placeholder="Enter Message"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-100 dark:border-zinc-500">
                          <div>
                            <button
                              type="button"
                              className="border-0 btn hover:underline group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500"
                              data-tw-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=green]:hover:bg-green-600 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=red]:hover:bg-red-600"
                            >
                              Invite Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="py-1 mt-5 mb-5 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 rounded group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                <span
                  className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1 ps-3 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600"
                  id="basic-addon"
                >
                  <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
                </span>
                <input
                  type="text"
                  className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:dark:text-gray-300"
                  placeholder="Search users.."
                  aria-describedby="basic-addon"
                />
              </div>
            </div>

            {/* <!-- Start contact lists --> */}
            <div className="h-[80vh]" data-simplebar>
              <div className="p-6">
                <div>
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    A
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Albert Rodarte
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonB"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonB"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Allison Etter
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonC"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonC"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list A --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    C
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Craig Smiley
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonD"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonD"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list C --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    D
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Daniel Clay
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonEM"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonEM"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Doris Brown
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonES"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonES"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list D --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    I
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Iris Wells
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonF"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonF"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list I --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    J
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Juan Flakes
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonG"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonG"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            John Hall
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonH"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonH"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Joy Southern
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonI"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonI"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list J --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    M
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Mary Farmer
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonJ"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonJ"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Mark Messer
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonK"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonK"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>

                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Michael Hinton
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonL"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonL"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list M --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    O
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Ossie Wilson
                          </h5>
                        </div>
                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonM"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonM"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list O --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    P
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Phillis Griffin
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonN"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonN"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Paul Haynes
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonO"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonO"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <MdDelete />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list P --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    R
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Rocky Jackson
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonP"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonP"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list R --> */}

                <div className="mt-3">
                  <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                    S
                  </div>

                  <ul className="list-unstyled contact-list">
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Sara Muller
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonQ"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonQ"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Simon Velez
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonR"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonR"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="px-5 py-[15px]">
                      <div className="flex items-center">
                        <div className="flex-grow">
                          <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                            Steve Walker
                          </h5>
                        </div>

                        <div className="relative flex-shrink-0 dropdown">
                          <button
                            className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                            type="button"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButtonS"
                          >
                            <i className="text-lg ri-more-2-fill"></i>
                          </button>
                          <ul
                            className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                            aria-labelledby="dropdownMenuButtonS"
                          >
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Share
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Block
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-htmlForbid-line"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                                href="#"
                              >
                                Remove
                                <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- end contact list S --> */}
              </div>
            </div>
            {/* <!-- end contact lists --> */}
          </div>
        </div>

        <div className="tab-content">
          {/* <!-- Start profile content --> */}
          <div>
            <div className="px-6 pt-6">
              <h4 className="mb-0 text-gray-700 dark:text-gray-50">Settings</h4>
            </div>

            <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-500">
              <div className="relative mb-4">
                <img
                  src="assets/images/avatar-1.jpg"
                  className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
                  alt=""
                />
                <a
                  href="#!"
                  className="absolute bottom-0 w-10 h-10 bg-gray-100 rounded-full ltr:right-28 rtl:left-28dark:bg-zinc-800 dark:text-gray-100"
                >
                  <i className="leading-10 ri-pencil-fill text-16"></i>
                </a>
              </div>

              <h5 className="mb-1 text-16 dark:text-gray-50">Patricia Smith</h5>

              <div className="relative mb-1 dropdown">
                <a
                  className="pb-1 text-gray-500 dropdown-toggle d-block dark:text-gray-300"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  id="dropdownMenuButtonX"
                >
                  Available <i className="mdi mdi-chevron-down"></i>
                </a>

                <ul
                  className="absolute z-50 hidden py-2 mt-2 text-left list-none bg-white border rounded shadow-lg left-20 dropdown-menu w-36 top-6 dark:bg-zinc-700 bg-clip-padding border-gray-50 dark:border-zinc-500"
                  aria-labelledby="dropdownMenuButtonX"
                >
                  <li>
                    <a
                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600/80 ltr:text-left rtl:text-right"
                      href="#"
                    >
                      Available
                    </a>
                  </li>
                  <li>
                    <a
                      className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600/80 ltr:text-left rtl:text-right"
                      href="#"
                    >
                      Busy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End profile user --> */}

            {/* <!-- Start user-profile-desc --> */}
            <div className="p-6 h-[550px]" data-simplebar>
              <div data-tw-accordion="collapse">
                <div className="text-gray-700 accordion-item">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                    >
                      <span className="m-0 text-[14px] font-medium">
                        Personal Info
                      </span>
                      <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                    </button>
                  </h2>

                  <div className="block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                    <div className="p-5">
                      <div>
                        <div className="ltr:float-right rtl:float-left">
                          <button
                            type="button"
                            className="py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50"
                          >
                            <i className="mr-1 align-middle ri-edit-fill"></i>
                            Edit
                          </button>
                        </div>
                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                          Name
                        </p>
                        <h5 className="text-sm dark:text-gray-50">
                          Patricia Smith
                        </h5>
                      </div>
                      <div className="mt-5">
                        <p className="mb-1 text-gray-500 dark:text-gray-300">
                          Email
                        </p>
                        <h5 className="text-sm dark:text-gray-50">
                          adc@123.com
                        </h5>
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
                          CalihtmlFornia, USA
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-gray-700 accordion-item">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:bg-zinc-600 dark:text-gray-50 dark:border-zinc-600"
                    >
                      <span className="m-0 text-[14px] font-semibold">
                        Privacy
                      </span>
                      <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                    </button>
                  </h2>
                  <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                    <div className="p-5">
                      <div className="py-4">
                        <div className="flex items-center">
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                              Profile photo
                            </h5>
                          </div>
                          <div className="relative flex-shrink-0 dropdown">
                            <button
                              className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50"
                              type="button"
                              data-bs-toggle="dropdown"
                              id="dropdownMenuButtonY"
                            >
                              Everyone <i className="mdi mdi-chevron-down"></i>
                            </button>
                            <ul
                              className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                              aria-labelledby="dropdownMenuButtonY"
                            >
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  Everyone
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  selected
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  Nobody
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                        <div className="flex items-center">
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                              Last seen
                            </h5>
                          </div>
                          <div className="flex items-center">
                            <label
                              // htmlFor="toggleSwitch"
                              className="flex items-center cursor-pointer"
                            >
                              <span className="relative">
                                <input
                                  type="checkbox"
                                  id="toggleSwitch"
                                  className="sr-only"
                                  checked
                                />
                                <span className="block w-8 h-5 rounded-full checked-bg"></span>
                                <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1"></span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                        <div className="flex items-center">
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                              Status
                            </h5>
                          </div>
                          <div className="relative flex-shrink-0 dropdown">
                            <button
                              className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50"
                              type="button"
                              data-bs-toggle="dropdown"
                              id="dropdownMenuButtonT"
                            >
                              Everyone <i className="mdi mdi-chevron-down"></i>
                            </button>
                            <ul
                              className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                              aria-labelledby="dropdownMenuButtonT"
                            >
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  Everyone
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  selected
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  Nobody
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                        <div className="flex items-center">
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                              Read receipts
                            </h5>
                          </div>
                          <div className="flex items-center">
                            <label
                              htmlFor="toggleSwitch2"
                              className="flex items-center cursor-pointer"
                            >
                              <span className="relative">
                                <input
                                  type="checkbox"
                                  id="toggleSwitch2"
                                  className="sr-only"
                                  checked
                                />
                                <span className="block w-8 h-5 rounded-full checked-bg"></span>
                                <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1"></span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="py-4 border-t border-gray-100/80 dark:border-zinc-600">
                        <div className="flex items-center">
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                              Profile photo
                            </h5>
                          </div>
                          <div className="relative flex-shrink-0 dropdown">
                            <button
                              className="border-transparent rounded btn dropdown-toggle bg-slate-100 px-1.5 py-1 dark:bg-zinc-500 dark:text-gray-50"
                              type="button"
                              data-bs-toggle="dropdown"
                              id="dropdownMenuButtonZM"
                            >
                              Everyone <i className="mdi mdi-chevron-down"></i>
                            </button>
                            <ul
                              className="absolute z-50 block w-40 py-2 my-8 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600"
                              aria-labelledby="dropdownMenuButtonZM"
                            >
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  Everyone
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  selected
                                </a>
                              </li>
                              <li>
                                <a
                                  className="block w-full px-5 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600"
                                  href="#"
                                >
                                  Nobody
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-gray-700 accordion-item">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                    >
                      <span className="m-0 text-[14px] font-medium">
                        Security
                      </span>
                      <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                    </button>
                  </h2>
                  <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                    <div className="p-5">
                      <div>
                        <div className="flex items-center">
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate text-13 dark:text-gray-50">
                              Show security notification
                            </h5>
                          </div>
                          <div className="flex items-center">
                            <label
                              htmlFor="toggleSwitch3"
                              className="flex items-center cursor-pointer"
                            >
                              <span className="relative">
                                <input
                                  type="checkbox"
                                  id="toggleSwitch3"
                                  className="sr-only"
                                />
                                <span className="block w-8 h-5 rounded-full checked-bg"></span>
                                <span className="absolute w-3 h-3 transition rounded-full dot left-1 top-1"></span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-gray-700 accordion-item">
                  <h2>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-zinc-600 dark:bg-zinc-600 dark:text-gray-50"
                    >
                      <span className="m-0 text-[14px] font-medium">Help</span>
                      <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180"></i>
                    </button>
                  </h2>
                  <div className="hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                    <div className="p-5">
                      <div className="py-3">
                        <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                          <a href="#" className="block text-body">
                            FAQs
                          </a>
                        </h5>
                      </div>
                      <div className="py-3 border-t border-gray-100 dark:border-zinc-600">
                        <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                          <a href="#" className="text-body d-block">
                            Contact
                          </a>
                        </h5>
                      </div>
                      <div className="py-3 border-t border-gray-100 dark:border-zinc-600">
                        <h5 className="mb-0 text-gray-700 text-13 dark:text-gray-300">
                          <a href="#" className="text-body d-block">
                            Terms & Privacy policy
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
