"use client";
import CountUp from "react-countup";

export default function ConsumerCard() {
  return (
    <div className="body relative">
      <a className="card human-resources " href="#">
        <div className="overlay"></div>
        <div className="circle text-gray-800">
          <div className="svg">
            <div>
              <span className="text-2xl md:text-3xl font-bold">
                +
                <CountUp duration={10} className="counter" end={328} /> k
              </span>
            </div>{" "}
          </div>
        </div>
        <p>Total job post</p>
      </a>

      <h1 className="absolute top-1/2 left-1/2 text-b">kdfjkd</h1>
    </div>
  );
}
