import IconImage from "@/components/IconImage/IconImage";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { font14, font16 } from "@/constant";
import { locationIcon, moneyBag, profilePic, schedule } from "@/exportImage";

export default function JobsCard({ job }) {
  const {
    title,
    description,
    images,
    tags,
    price,
    priceType,
    currency,
    startDate,
    location,
    country,
  } = job;

  return (
    <div>
      <div className="w-full rounded-lg border p-6 flex flex-col space-y-2">
        <h1
          className={` ${font16}text-primary_color flex items-center gap-4 text-lg`}
        >
          {title}
        </h1>

        <p className={`  text-gray-400   ${font14}`}>{description}</p>
        {/* price */}
        <div className="flex gap-4 items-start -ml-2">
          <IconImage
            src={moneyBag}
            size={44}
            alt="moneybag"
            className="-mt-1"
          />
          <div className=" font-sans">
            <p>
              <span> {price}</span>
              <span> {currency}</span>
            </p>
            <p className=" ">
              Price is
              <span className="text-primary_color font-semibold">
                {" "}
                {priceType.charAt(0).toUpperCase() +
                  priceType.slice(1).toLowerCase()}
              </span>
            </p>
          </div>
        </div>
        {/* category */}
        {/* <div className="flex gap-4 items-start -ml-2">
          <IconImage
            src={categories}
            size={44}
            alt="moneybag"
            className="-mt-1"
          />

          <p className="font-sans">
             {category}
          </p>
        </div> */}
        {/* image */}
        {/* calender */}

        <div className="flex gap-4 items-start -ml-2">
          <IconImage
            src={schedule}
            size={44}
            alt="moneybag"
            className="-mt-1"
          />

          <p className="font-sans">{startDate}</p>
        </div>
        {/* location */}
        <div className="flex gap-4 items-start -ml-2">
          <IconImage
            src={locationIcon}
            size={44}
            alt="moneybag"
            className="-mt-1"
          />

          <p>
            {location} ,<span>{country}</span>
          </p>
        </div>
        <div className="flex gap-4 ">
          {images.length > 0 &&
            images.map((image) => (
              <div
                className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden"
                key={image}
              >
                <ResponsiveImage
                  src={image || profilePic}
                  alt="profile image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            ))}
        </div>
        {/* tag */}
        <div className="flex gap-2">
          {tags.map((tag) => (
            <h1 key={tag} className="text-primary_color  ">
              #{tag}
            </h1>
          ))}
        </div>

        <Button
          variant="hover"
          size="sm"
          className=" max-w-40 mx-auto rounded-full   hover:ring-1 ring-primary_color ring-offset-2 animate-in duration-100 hover:zoom-in-50"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}
