import { applePlay, font16, footerLinks, googlePlay } from "@/constant";

import {
  facebook,
  instagram,
  linkedin,
  logo,
  twitter,
  youtube,
} from "@/exportImage";
import Image from "next/image";
import Link from "next/link";
import Heading from "../Heading";
import IconImage from "../IconImage/IconImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function Footer() {
  return (
    <div className="patenBackgroundImage h-fit pt-14 bg-[#f3fcff] dark:bg-dark">
      <div className="max-w-[1280px] mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {footerLinks.length > 0 &&
            footerLinks.map((footerLink, index) => (
              <div key={index} className="hidden md:block">
                <div className="flex flex-col">
                  <h1
                    className={` text-primary_color   font-semibold pb-1 ${font16} `}
                  >
                    {footerLink.title}
                  </h1>
                  {footerLink.links.length > 0 && (
                    <ul className=" ">
                      {footerLink.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {link.title ? (
                            <Link
                              href={link.link}
                              className="hover:text-blue-500 text-sm text-gray-600"
                            >
                              {link.title}
                            </Link>
                          ) : link.image ? (
                            <>
                              <div className="flex gap-4 mt-8">
                                <Link
                                  href="#_"
                                  className="relative inline-flex items-center  px-2 py-3 border w-64 h-12 overflow-hidden font-medium transition-all bg-[#002A64] rounded-xl group"
                                >
                                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#002A64]rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary_color"></span>
                                  </span>
                                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary_color/20 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center justify-center gap-4">
                                    <IconImage
                                      src={googlePlay}
                                      alt=""
                                      size={24}
                                    />
                                    <h1>Play Store</h1>
                                  </span>
                                </Link>
                                <Link
                                  href="#_"
                                  className="relative inline-flex items-center  px-2 py-3 border w-64 h-12 overflow-hidden font-medium transition-all bg-[#002A64] rounded-xl group"
                                >
                                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#002A64]rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary_color"></span>
                                  </span>
                                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary_color/20 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center justify-center gap-4">
                                    <IconImage
                                      src={applePlay}
                                      alt=""
                                      size={24}
                                    />
                                    <h1>Apple App</h1>
                                  </span>
                                </Link>
                              </div>
                            </>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          {footerLinks.length > 0 &&
            footerLinks.slice(0, -1).map((footerLink, index) => (
              <div key={index}>
                <div className="flex flex-col md:hidden ">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full  space-y-2 mt-4"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div
                          className={` text-primary_color font-semibold pb-1 ${font16} `}
                        >
                          {footerLink.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        {footerLink.links.length > 0 && (
                          <ul className=" space-y-2">
                            {footerLink.links
                              .slice(0, -1)
                              .map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link
                                    href={link.link}
                                    className="hover:text-blue-500 text-sm text-gray-600"
                                  >
                                    {link.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8 space-y-5 md:hidden">
          <div>
            <p className="text-primary_color font-semibold  ">About aidroo</p>
            <p className=" font-normal text-sm">
              Aidroo, a Europe-based job and directory company
            </p>
          </div>
          <div className="flex gap-4 w-72    mx-auto md:hidden">
            <Link
              href="#_"
              className="relative inline-flex items-center  px-2 py-3 border w-fit h-10   overflow-hidden font-medium transition-all bg-[#002A64] rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#002A64]rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary_color"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary_color/20 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center justify-center gap-x-2 px-1">
                <Image src={googlePlay} alt="" className="w-6" />
                <h1 className="text-sm">Play Store</h1>
              </span>
            </Link>
            <Link
              href="#_"
              className="relative inline-flex items-center  md:px-2 py-3 border w-fit h-10  md:w-64 md:h-12 overflow-hidden font-medium transition-all bg-[#002A64] rounded-xl group"
            >
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#002A64]rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-primary_color"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary_color/20 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center justify-center gap-x-1 px-2">
                <IconImage src={applePlay} alt="" size={20} />
                <h1>Apple App</h1>
              </span>
            </Link>
          </div>
        </div>
        {/* social link */}
        <div className="flex flex-col justify-center items-center space-y-2 py-10">
          <Heading className="  font-bold text-gray-600">Follow us on</Heading>
          <div className="flex gap-2">
            <Link
              href="https://www.facebook.com/Fb.Aidroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={facebook} size={30} />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <IconImage src={twitter} size={30} />
            </Link>
            <Link
              href="https://www.instagram.com/aidroo_ig/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={instagram} size={30} />
            </Link>
            <Link
              href="https://youtube.com/@aidroo."
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={youtube} size={30} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/aidroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconImage src={linkedin} size={30} />
            </Link>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center space-y-4  ">
          <div className="w-24  ">
            <Image src={logo} alt="image" />
          </div>
          <Heading className="font-semibold  text-sm text-center pb-4">
            Copyrights © Aidroo All rights reserved 2024
          </Heading>
        </div>
      </div>
    </div>
  );
}
