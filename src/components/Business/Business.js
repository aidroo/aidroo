import heroImage from "@/asserts/business-image.svg";

import Image from "next/image";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { font14, font16, font18bold } from "@/constant";

const Business = () => {
  return (
    <div className="background-gradient bannerBackgroundImage   px-4  py-20  ">
      <div className="max-w-[1280px]  mx-auto  ">
        <div className="  mx-auto text-center    rounded-lg">
          <h1 className={`  mb-1 ${font18bold}`}>
            Why <span className="text-primary_color">Aidroo</span> for your
            Business?
          </h1>
          <p className={`${font14} mb-8`}>
            Explore the popular listings around the world
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 ">
          <Image
            src={heroImage}
            width={500}
            height={300}
            alt="Hero image"
            className="mt-[-50px]"
          />

          <div className=" max-w-[325px] md:w-[400px] space-y-6">
            <div>
              <h1 className={`font-semibold text-primary_color ${font16}`}>
                Enhanced Branding
              </h1>
              <p className={`text-sm text-wrap ${font14}  `}>
                Elevate your brand with Claimed, Verified, and Guaranteed
                badges, along with verified badge reviews.
              </p>
            </div>

            <div className="flex flex-col  ">
              <h1 className={`font-semibold text-primary_color ${font16}`}>
                Targeted Leads
              </h1>
              <p className={`text-sm text-wrap ${font14}  `}>
                Engage with a highly relevant audience tailored to your niche,
                driving qualified leads to your business.
              </p>
            </div>
            <div className="flex flex-col  ">
              <h1 className={`font-semibold text-primary_color ${font16}`}>
                Seamless Management
              </h1>
              <p className={`text-sm text-wrap ${font14}  `}>
                Aidroo simplifies directory management, offering tools to
                update, monitor, and analyze listings efficiently.
              </p>
            </div>
            <div className="mt-8 flex  justify-between space-x-4">
              <Button variant="fillButton" size="lg" className="h-9 md:h-10  ">
                See Our Pricing
              </Button>
              <Button variant="hover" size="lg" className="h-9 md:h-10">
                Add business
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
