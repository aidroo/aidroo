import { aboutAidroo } from "@/app/terms-service/_components/constants";
import profile from "@/asserts/jsonfile/ceophoto.jpg";
import ImageComponent from "@/components/ImageComponent";
import { facebook, linkedin } from "@/exportImage";
import { Mail } from "lucide-react";
import Link from "next/link";
import { LuDot } from "react-icons/lu";
 
const AboutTermsContent = () => {
  return (
    <div>
      <div>
        <p className="text-gray-700 font-light tracking-tight">
          Welcome to Aidroo, a listing and directory website agency dedicated to
          connecting businesses and customers seamlessly. By using our website
          and services, you agree to comply with and be bound by the following
          terms and conditions. Please read these terms carefully before
          accessing or using our website.
        </p>
      </div>
      {aboutAidroo.map((term, index) => (
        <div key={index} className="border-l-2 border-dashed">
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-6">
              <h4 className="font-bold text-blue-500">{term.section}</h4>
              <p className="mt-2   text-sm text-gray-500">{term.content}</p>
            </div>
          </div>
          {term.subsections &&
            term.subsections.map((subsection, subIndex) => (
              <div className="mb-6 ml-8 mt-2" key={subIndex}>
                <div className="flex items-center ">
                  <LuDot className="-mt-2 text-2xl" />
                  <h3 className="text font-semibold text-gray-700  mb-1">
                    {subsection.title}
                  </h3>
                </div>
                <p className="text-gray-700 font-light ml-6">
                  {subsection.content}
                </p>
              </div>
            ))}
        </div>
      ))}
      <div className="w-full flex flex-col items-center">
        <div className="card2  ">
          <button className="mail">
            <a href="mailto:ceo@aidroo.com" title="Email the CEO">

           <Mail strokeWidth={.5}/>
            </a>
          </button>
          <div className="profile-pic">
            <ImageComponent
              src={profile}
              alt="profile"
              width="100%"
              height="100%"
              className="svg img"
            />
          </div>
          <div className="bottom">
            <div className="content">
              <span className="name"> Solimul Hasan Khan</span>
              <span className="about-me">
                is the founder and CEO of Aidroo, a Europe-based jobs and
                directory company
              </span>
            </div>
            <div className="bottom-bottom ">
              <div className="social-links-container">
                <Link
                  href="https://www.facebook.com/SolimulHasanKhan"
                  target="_blank"
                >
                  <ImageComponent
                    src={facebook}
                    alt="facebook"
                    width="20px"
                    height="20px"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/solimulhasankhan/"
                  target="_blank"
                >
                  <ImageComponent
                    src={linkedin}
                    alt="facebook"
                    width="20px"
                    height="20px"
                  />
                </Link>
              </div>
              <button className="button">Contact Me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTermsContent;
