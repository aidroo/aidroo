import { font14, font16 } from "@/constant";
import {
  brifcaseIcon,
  categories,
  category,
  locationIcon,
  moneyBag,
  myReview,
  profilePic,
  schedule,
  verifiedIcon,
} from "@/exportImage";
import { shortenString } from "@/lib/utils";

import Link from "next/link";
import { FaRegPaperPlane } from "react-icons/fa6";
import IconImage from "./IconImage/IconImage";
import PaginationComponent from "./Pagination/PaginationComponent";
import Rating from "./Rating/Rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export const works = [1, 2, 3, 4, 5, 6];

let str = ` I had a seamless experience with Panacea.professionals do not understand our process.  Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Amet, explicabo! Lorem
                                      ipsum dolor, sit amet consectetur
                                      adipisicing elit. Distinctio ratione velit
                                      doloribus quasi neque magnam facilis eius,
                                      repellat ipsa veniam, expedita itaque
                                      optio obcaecati nisi a porro dolorum
                                      eveniet provident deleniti mollitia
                                      adipisci quis! Similique asperiores
                                      quisquam deleniti neque cum?`;
export default function BusinessProfileCard() {
  return (
    <>
      <div className="flex gap-4 items-center  p-4  ">
        <IconImage
          src={profilePic}
          alt="profile pic"
          size={90}
          className="rounded-sm"
        />
        <div className="flex flex-col space-y-1 ">
          <div className="flex gap-2 items-center ">
            <Link
              href={`/business_profiles/${1}`}
              className={`text-gray-600  ${font16} font-semibold  `}
            >
              Aidroo
            </Link>

            <IconImage src={verifiedIcon} size={18} />
          </div>
          {/*rating */}
          <div className="md:flex gap-4  items-center  space-y-2 md:space-y-0 ">
            <div className="flex gap-1 ">
              <Rating value={5} size={18} />
            </div>
            <h1 className="text-gray-600 text-sm  ">
              <span>4.5 | 102 Reviews</span>
            </h1>
          </div>
          <div className="flex gap-2 items-center  text-gray-600">
            <FaRegPaperPlane className="text-[12px]" />
            <h1 className="text-sm  ">Newyork , United States</h1>
          </div>
          {/* 
      category
      */}
        </div>
      </div>
      <div className="px-4 py-1 flex justify-between md:hidden">
        <div className="flex gap-1 items-center ">
          <IconImage src={category} size={15} alt="category" />
          <h1 className="text-sm">Digital Agency</h1>
        </div>
        <div className="flex gap-1 items-center ">
          <IconImage src={category} size={15} />
          <h1 className="text-sm">Digital Agency</h1>
        </div>
      </div>
      <div className=" border-t px-4 py-2">
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1" className="border-b-0">
            <div className="flex justify-between  ">
              <div className=" hidden md:grid grid-cols-1 md:grid-cols-3  w-full gap-4">
                <div className="flex gap-2 items-center ">
                  <IconImage src={category} size={20} />
                  <h1 className="text-sm">Digital Agency</h1>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex gap-2 items-center cursor-pointer text-primary_color ">
                      <IconImage src={brifcaseIcon} size={20} />
                      <h1 className="text-sm">Job feed</h1>
                    </div>
                  </DialogTrigger>

                  <DialogContent className=" w-fit   overflow-hidden overflow-y-auto ">
                    <ScrollArea className="w-full whitespace-nowrap rounded-md ">
                      <div className="flex w-max space-x-4 p-4">
                        {works.map((artwork) => (
                          <div
                            className="w-[330px]  overflow-hidden  p-3 border rounded-md "
                            key={artwork}
                          >
                            <div>
                              <h1
                                className={`${font16}text-primary_color text-wrap`}
                              >
                                Looking for Sales Manager
                              </h1>

                              <p className="text-xs text-wrap">
                                {shortenString(str, 250)}
                              </p>
                              <div className=" mt-2">
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={moneyBag} size={32} />
                                    <div>
                                      <h1 className="text-sm">1624 $</h1>
                                      <p
                                        className={`text-gray-600  ${font14} `}
                                      >
                                        Price is{" "}
                                        <span className="text-primary_color">
                                          Negotiable
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={categories} size={32} />
                                    <h1 className="text-sm">
                                      Appliance Service
                                    </h1>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={schedule} size={32} />
                                    <h1 className="text-sm">10--09-2024</h1>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={locationIcon} size={32} />
                                    <h1 className="text-sm">
                                      Az 2031 ,Ariziba ,Usa
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <PaginationComponent className=" text-sm" />
                  </DialogContent>
                </Dialog>
                <AccordionTrigger className=" w-fit flex  -mt-3 ">
                  <IconImage src={myReview} size={20} />
                  <span className="text-sm text-primary_color">
                    Latest reviews
                  </span>
                </AccordionTrigger>
              </div>

              {/* mobile view */}
              <div className="  flex-1 flex justify-between items-center md:hidden  ">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex gap-2 items-center cursor-pointer text-primary_color ">
                      <IconImage src={brifcaseIcon} size={20} />
                      <h1 className="text-sm">Job feed</h1>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="  sm:h-2/3 overflow-hidden overflow-y-auto ">
                    <ScrollArea className="w-full whitespace-nowrap rounded-md ">
                      <div className="flex w-max space-x-4 p-4">
                        {works.map((artwork) => (
                          <div
                            className="w-[330px] md:w-52 overflow-hidden  p-3 border rounded-md "
                            key={artwork}
                          >
                            <div>
                              <h1 className="text-sm text-primary_color text-wrap">
                                Looking for Sales Manager
                              </h1>

                              <p className="text-sm text-wrap">
                                {shortenString(str, 250)}
                              </p>
                              <div className=" mt-2">
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={moneyBag} size={32} />
                                    <div>
                                      <h1 className="text-sm">1624 $</h1>
                                      <p className="text-[10px]">
                                        Price is{" "}
                                        <span className="text-primary_color">
                                          Negotiable
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={categories} size={32} />
                                    <h1 className="text-sm">
                                      Appliance Service
                                    </h1>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={schedule} size={32} />
                                    <h1 className="text-sm">10--09-2024</h1>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center text-sm gap-4">
                                    <IconImage src={locationIcon} size={32} />
                                    <h1 className="text-sm">
                                      Az 2031 ,Ariziba ,Usa
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <PaginationComponent className=" text-sm md:text-sm" />
                  </DialogContent>
                </Dialog>
                <AccordionTrigger className=" w-fit flex    ">
                  <IconImage src={myReview} size={20} />
                  <span className="text-sm text-primary_color">
                    Latest reviews
                  </span>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <ScrollArea className="w-full whitespace-nowrap rounded-md ">
                <div className="flex w-max space-x-4 p-4">
                  {works.map((artwork) => (
                    <div
                      className="w-[230px] md:w-52 max-h-44  overflow-hidden  p-2 border rounded-md "
                      key={artwork}
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-sm text-gray-400">5 day ago</span>
                        <div className="flex gap-4">
                          <IconImage
                            src={profilePic}
                            size={40}
                            className="rounded-full ring-1 ring-offset-2"
                            alt="profile
                                       pic"
                          />
                          <div className="space-y-2">
                            <h1 className={`${font16} font-semibold`}>
                              Jhon Doe
                            </h1>
                            <div className="flex gap-1">
                              <Rating value={4} size={18} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full border my-2   " />

                      <div className="px-1">
                        <p className="text-wrap text-sm text-gray-500 ">
                          Lorem ipsum dolor sit amet conse ctetur adipi sicing
                          elit. Dignissimos, magnam.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
