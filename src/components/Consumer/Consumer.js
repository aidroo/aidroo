"use client";
import CountUp from "react-countup";
import Heading from "../Heading";
export default function Consumer() {
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-14 px-8  text-center  h-fit justify-center">
          <div>
            <span className=" text-2xl md:text-3xl font-bold">
              +
              <CountUp duration={10} className="counter" end={473} /> k{" "}
            </span>
            <Heading className="text-sm ">Total Business Profile</Heading>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold">
              +
              <CountUp duration={10} className="counter" end={328} /> k
            </span>
            <Heading className="text-sm ">Total job post</Heading>
          </div>{" "}
          <div>
            <span className="text-2xl md:text-3xl font-bold">
              +<CountUp duration={10} className="counter" end={19} />m
            </span>
            <Heading className="text-sm ">Reviews were written</Heading>
          </div>{" "}
          <div>
            <span className="text-2xl md:text-3xl font-bold">
              <CountUp duration={10} className="counter" end={93} />%
            </span>
            <Heading className=" text-sm">
              93% of consumers trust Aidroo
            </Heading>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
