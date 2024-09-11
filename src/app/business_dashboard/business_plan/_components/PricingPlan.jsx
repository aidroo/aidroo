import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import topbachimage from "@/public/icons/topplacement_price.svg";

import { font16 } from "@/constant";
import {
  brifcaseIcon,
  clientsmanagement,
  guaranteedbadge,
  plaimedbadge,
  tikmark,
  verifiedIcon,
} from "@/exportImage";
import Link from "next/link";

const pricingPlan = [
  {
    src: plaimedbadge,
    title: "Claimed Badge",
  },
  {
    src: topbachimage,
    title: "Top Placement",
  },
  {
    src: verifiedIcon,
    title: "Verified Badge",
    subtitle: "1 year",
  },
  {
    src: guaranteedbadge,
    title: "Guaranteed Profile",
    subtitle: "1 Month",
  },
  {
    src: brifcaseIcon,
    title: "Job post",
  },

  {
    src: tikmark,
    title: "Job Apply",
  },
  {
    src: clientsmanagement,
    title: "Clients Management ",
    subtitle: "Lifetime",
  },
  {
    src: tikmark,
    title: "50 reviews invitations",
  },
  {
    src: tikmark,
    title: "Highlighted Business Profile",
  },
  {
    src: tikmark,
    title: "3 user login",
  },
  {
    src: guaranteedbadge,
    title: "Negative reviews removal ",
    subtitle: "(3) ",
  },
  {
    src: tikmark,
    title: "Priority of Support ",
  },
];

const standerPlan = [
  {
    src: plaimedbadge,
    title: "Top Placement",
    subtitle: "(6 Months)",
  },
  {
    src: topbachimage,
    title: "Verified badge",
    subtitle: "(Lifetime)",
  },
  {
    src: verifiedIcon,
    title: "Guaranteed Profile ",
    subtitle: "(Lifetime)",
  },
  {
    src: guaranteedbadge,
    title: "Job Apply priority and Suggestions",
  },
  {
    src: brifcaseIcon,
    title: "Featured Business",
  },

  {
    src: tikmark,
    title: "700 reviews invitations",
  },
  {
    src: clientsmanagement,
    title: "Highlighted listings ",
    subtitle: "(1 year)",
  },
  {
    src: tikmark,
    title: "Negative reviews removal",
    subtitle: "(1 year all)",
  },
  {
    src: tikmark,
    title: "Business Promotions ",
  },
  {
    src: tikmark,
    title: "100 valid Clients leads",
  },
  {
    src: guaranteedbadge,
    title: "25 user login",
  },
];

export default function PricingPlan({ username }) {
  return (
    <div className="max-w-7xl mx-auto  ">
      <div className="max-w-6xl mx-auto   space-y-4 border px-4 md:px-24 py-10 rounded-md">
        <div className="border max-w-44 mx-auto p-2 rounded-md text-center ">
          <h1 size="lg" className="text-primary_color">
            Pricing Plan
          </h1>
        </div>
        <Tabs defaultValue="monthly" className="w-full space-y-14 ">
          <TabsList className="grid w-full md:w-1/2  grid-cols-2   mx-auto ">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="w-full md:w-2/3 mx-auto">
            <div className="border     p-6 rounded-md  space-y-4  ">
              <h1 size="xl" className="text-primary_color  text-center">
                Standard
              </h1>
              <div className="border rounded-md p-4 ">
                <h1>
                  <sup className="text-sm md:text-lg ">$</sup>{" "}
                  <span className="text-4xl font-bold">250</span>{" "}
                  <sub className="text-sm md:text-sm ">/Per Month</sub>{" "}
                </h1>
                <h1 className={`${font16} text-center`}>Per Package</h1>
              </div>
              <ul className="flex flex-col justify-start space-y-3">
                {pricingPlan.map((plan) => (
                  <li
                    key={plan.title}
                    className="flex items-center gap-4   justify-between "
                  >
                    <div className="flex gap-4 items-center ">
                      <div className="w-6    ">
                        <ResponsiveImage src={plan.src} />
                      </div>
                      <h1 className={`${font16}`}>{plan.title}</h1>
                    </div>

                    {plan.subtitle && (
                      <span className="   bg-primary_color/20 text-primary_color  px-2 rounded-sm text-sm py-[2px]">
                        {plan.subtitle}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex justify-center">
                <Link
                  href={`/claim/checkout?username=${username}&price=250 `}
                  className="relative inline-flex items-center rounded-md justify-center h-10 px-4 py-3 mt-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-primary_color shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary_color  group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-primary_color transition-all duration-300 transform group-hover:translate-x-full ease">
                    Continue
                  </span>
                  <span className="relative invisible text-sm">Continue</span>
                </Link>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="w-full md:w-2/3 mx-auto">
            <div className="border     p-6 rounded-md  space-y-4  ">
              <h1 size="xl" className="text-primary_color text-center">
                Business
              </h1>
              <div className="border rounded-md p-4 ">
                <h1>
                  <sup className="text-sm md:text-lg ">$</sup>{" "}
                  <span className="text-4xl font-bold">750</span>{" "}
                  <sub className="text-sm md:text-sm ">/Per Year</sub>{" "}
                </h1>
                <h1 className={`${font16} text-center`}>Per Package</h1>
              </div>
              <ul className="flex flex-col justify-start space-y-3">
                <li className="text-xl font-normal text-primary_color">
                  Standard +
                </li>
                {standerPlan.map((plan) => (
                  <li
                    key={plan.title}
                    className="flex items-center gap-4   justify-between "
                  >
                    <div className="flex gap-4 items-center ">
                      <div className="w-6    ">
                        <ResponsiveImage src={plan.src} />
                      </div>
                      <h1 className={`${font16}`}>{plan.title}</h1>
                    </div>

                    {plan.subtitle && (
                      <span className="   bg-primary_color/20 text-primary_color  px-2 rounded-sm text-sm py-[2px]">
                        {plan.subtitle}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex justify-center">
                <Link
                  href={`/claim/checkout?username=${username}&price=750 `}
                  className="relative inline-flex items-center rounded-md justify-center h-10 px-4 py-3 mt-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-primary_color shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary_color  group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-primary_color transition-all duration-300 transform group-hover:translate-x-full ease">
                    Continue
                  </span>
                  <span className="relative invisible text-sm">Continue</span>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
