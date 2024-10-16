import Heading from "@/components/Heading";
import ThumbSlider from "@/components/ThumbSlider/ThumbSlider";
import { Switch } from "@/components/ui/switch";
import { businessOur } from "@/constant";

export default function page() {
  const gallery = [];
  return (
    <div>
      {gallery?.length > 0 && (
        <div className=" border-2 rounded-md p-10 mx-auto  ">
          <ThumbSlider gallery={gallery} />
        </div>
      )}
      {/* business Our */}
      <Heading className="text-primary_color text-xl text-center pt-10 pb-2">
        Business Our
      </Heading>
      <div className="border-2 rounded-md ">
        {businessOur.map((our) => (
          <div
            key={our.day}
            className={`flex    place-content-center  justify-evenly p-4 font-light   `}
          >
            <h1 className="w-12">{our.day}</h1>
            <div className="flex items-center space-x-2 w-24">
              <Switch id={our.day} disabled={!our.open} />
            </div>

            <span className="">9.00 AM - 10.00 PM</span>
          </div>
        ))}
      </div>
      {/* map */}
      {/* <div className="   h-[440px] w-full p-4 border-2 rounded-md">
        <GoogleMap showMarker={false} className="h-[400px] w-full rounded-md" />
      </div> */}
    </div>
  );
}
