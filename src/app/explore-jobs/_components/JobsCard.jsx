import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { font14, font16 } from "@/constant";
import { profilePic } from "@/exportImage";

export default function JobsCard({ job }) {
  const { title, description, images, tags } = job;

  return (
    <div>
      <div className="w-full rounded-lg border-2 p-6 flex flex-col space-y-4">
        <h1 className={` ${font16}text-primary_color flex items-center gap-4`}>
          {title}
        </h1>

        <p className={`  text-gray-400 tracking-tight ${font14}`}>
          {description}
        </p>

        {/* image */}
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
        <div className="flex gap-2">
          {tags.map((tag) => (
            <h1 key={tag} className="text-primary_color text-xs">
              {tag}
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
