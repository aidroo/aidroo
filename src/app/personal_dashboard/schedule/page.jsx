"use client";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import ResponsiveImage from "@/components/ResponsiveImage/ResponsiveImage";
import { Switch } from "@/components/ui/switch";
import { businessOur, scheduleOptions } from "@/constant";
import profileImage from "@/public/images/profile.jpg";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function Schedule() {
  const [openStatus, setOpenStatus] = useState(
    businessOur.reduce((acc, our) => {
      acc[our.day] = our.open;
      return acc;
    }, {})
  );

  const handleChange = (day) => {
    setOpenStatus((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  return (
    <div className="border rounded-lg p-4     space-y-6">
      <div className="  rounded-lg">
        <div className="flex gap-4 h-32">
          <div className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden">
            <ResponsiveImage
              src={profileImage}
              alt="profile image"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="w-24 md:w-32  h-24 md:h-32 border-2 border-dashed rounded-lg place-content-center">
            <div className="font-semibold text-base rounded p-1 flex flex-col items-center justify-center cursor-pointer mx-auto font-[sans-serif]">
              <CiCirclePlus className="text-6xl text-primary_color" />
              <input type="file" id="uploadFile1" className="hidden" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:full">
        <div className=" border px-4 rounded-md  overflow-hidden overflow-x-auto  ">
          {businessOur.map((our) => (
            <div
              key={our.day}
              className=" grid grid-cols-2 justify-center    h-14 items-center"
            >
              <div className="  flex  items-center gap-8">
                <h1 className="w-2 text-xs md:text-sm">{our.day}</h1>
                <div className="flex items-center space-x-2 w-10">
                  <Switch
                    id={our.day}
                    checked={openStatus[our.day]}
                    onCheckedChange={() => handleChange(our.day)}
                  />
                </div>
              </div>
              <div>
                {openStatus[our.day] ? (
                  <div className=" flex gap-4    justify-between">
                    <OptionSelect
                      label="Start Time"
                      options={scheduleOptions}
                      className="text-sm   "
                    />
                    <OptionSelect
                      label="End Time"
                      options={scheduleOptions}
                      className="text-sm "
                    />
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          ))}

          {/* <ScrollBar orientation="horizontal" /> */}
        </div>
      </div>
    </div>
  );
}
