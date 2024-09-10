import FileUploadComponent from "@/components/FileUploadComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ClaimPageForm() {
  return (
    <div className="max-w-3xl mx-auto border p-8">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            className="mb-4"
            placeholder="Full Name"
            name="city"

            //   onChange={handleChange}
          />
          <Input
            type="number"
            className="mb-4"
            placeholder="Phone Number"
            name="phone"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            className="mb-4"
            placeholder="Business Role"
            name="city"

            //   onChange={handleChange}
          />
          <Input
            type="email"
            className="mb-4"
            placeholder="Enter Your email"
            name="email"
          />
        </div>
        <Input
          type="text"
          className="mb-4"
          placeholder="full address"
          name="address"
        />

        <div className="flex flex-col gap-y-4 w-2/3 my-4">
          <div className=" w-fit ">
            <h1 className="text-gray-700 py-2">
              Your prof or Identity (Upload image)
            </h1>
            <FileUploadComponent />
          </div>
          <div className=" w-fit">
            <h1 className="text-gray-700 py-2">
              {" "}
              Business Documents (Upload image)
            </h1>
            <FileUploadComponent />
          </div>
        </div>

        <div className=" w-full ">
          <h1 className="text-gray-700 py-2">
            Write about your business prof!
          </h1>
          <Textarea />
        </div>

        <div className="flex items-center my-4 gap-4">
          <Checkbox id="terms" className="w-4 h-4  " />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and write to the terms and conditions
          </label>
        </div>

        <div className="h-10  bg-primary_color flex justify-center items-center text-white rounded-md md:text-xl">
          <Link href="/claim/pricing_plan">Continue</Link>
        </div>
      </div>
    </div>
  );
}
