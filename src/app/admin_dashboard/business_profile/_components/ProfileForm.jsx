import IconImage from "@/components/IconImage/IconImage";
import OptionSelect from "@/components/OptionSelect/OptionSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { options } from "@/constant";
import { profilePic } from "@/exportImage";

export default function ProfileForm() {
  return (
    <div className="border  p-4 rounded-md  w-fit  ">
      <Dialog>
        <DialogTrigger asChild>
          <h1 className="text-primary_color  text-xl font-semibold cursor-pointer">
            Create a Business Profile
          </h1>
        </DialogTrigger>

        <DialogContent className="  sm:h-2/3 overflow-hidden overflow-y-auto ">
          <DialogHeader>
            <div className="flex items-center justify-star gap-4    mt-4">
              <IconImage src={profilePic} size={100} className="rounded-full" />

              <div className="space-y-4">
                <Label
                  for="uploadFile1"
                  className="flex bg-primary_color hover:bg-gray-700 text-white text-base  outline-none rounded w- px-2 py-3  cursor-pointer mx-auto font-[sans-serif] justify-center"
                >
                  Change Photo
                  <Input
                    type="file"
                    id="uploadFile1"
                    className="w-24  hidden"
                  />
                </Label>
                <Button variant="hover" className="w-fit" size="lg">
                  Remove Photo
                </Button>
              </div>
            </div>
          </DialogHeader>
          <form className="space-y-6">
            <Input
              type="text"
              placeholder="Business Name"
              className="bg-white dark:bg-gray-800  h-10"
            />
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="username"
                className="bg-white dark:bg-gray-800  h-10"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-white dark:bg-gray-800  h-10"
              />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <OptionSelect
                label="country"
                className="border-none"
                options={options}
              />
              <OptionSelect label="country" options={options} />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="password"
                placeholder="Create Password"
                className="bg-white dark:bg-gray-800  h-10"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="bg-white dark:bg-gray-800  h-10"
              />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <OptionSelect label="country" options={options} />
              <OptionSelect label="country" options={options} />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="City"
                className="bg-white dark:bg-gray-800  h-10"
              />
              <Input
                type="text"
                placeholder="Address"
                className="bg-white dark:bg-gray-800  h-10"
              />
            </div>
          </form>

          <div className="flex items-center justify-center pt-2">
            <Button variant="hover" className="h-10 w-full    duration-300 ">
              Create Job
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
