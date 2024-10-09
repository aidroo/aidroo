"use client";
import Link from "next/link";
import CountUp from "react-countup";
export default function Consumer() {
  return (
    <div className="max-w-[1360px] flex justify-center mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 my-14 px-8  text-center  h-fit justify-center">
        <div className="body relative">
          <Link className="card human-resources " href="#">
            <div className="overlay"></div>
            <div className="circle text-gray-800">
              <div className="svg">
                <div>
                  <span className="text-2xl md:text-3xl font-bold">
                    +
                    <CountUp duration={5} className="counter" end={473} /> k
                  </span>
                </div>{" "}
              </div>
            </div>
            <p>Total Business Profile</p>
          </Link>
        </div>
        {/* totla post a jobs */}
        <div className="body relative">
          <Link className="card human-resources " href="#">
            <div className="overlay"></div>
            <div className="circle text-gray-800">
              <div className="svg">
                <div>
                  <span className="text-2xl md:text-3xl font-bold">
                    +
                    <CountUp duration={5} className="counter" end={328} /> k
                  </span>
                </div>{" "}
              </div>
            </div>
            <p>Total job post</p>
          </Link>
        </div>
        {/* review we are written */}
        <div className="body relative">
          <Link className="card human-resources " href="#">
            <div className="overlay"></div>
            <div className="circle text-gray-800">
              <div className="svg">
                <div>
                  <span className="text-2xl md:text-3xl font-bold">
                    +
                    <CountUp duration={5} className="counter" end={19} /> m
                  </span>
                </div>{" "}
              </div>
            </div>
            <p className="-mt-2 text-gray-950">Reviews were written</p>
          </Link>
        </div>
        <div className="body relative">
          <Link className="card human-resources " href="#">
            <div className="overlay"></div>
            <div className="circle text-gray-800">
              <div className="svg">
                <div>
                  <span className="text-2xl md:text-3xl font-bold">
                    <CountUp duration={5} className="counter" end={93} /> %
                  </span>
                </div>{" "}
              </div>
            </div>
            <p>Consumers trust Aidroo</p>
          </Link>
        </div>
        {/* <div className="body relative">
            <a className="card human-resources " href="#">
              <div className="overlay"></div>
              <div className="circle text-gray-800">
                <div className="svg">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold">
                      
                      <CountUp duration={5} className="counter  " end={93} /> %
                    </span>
                  </div>{" "}
                </div>
              </div>
              <p className="text-xs">Consumar trust on Aidroo</p>
            </a>
          </div> */}

        {/* 93% */}
      </div>
    </div>
  );
}
