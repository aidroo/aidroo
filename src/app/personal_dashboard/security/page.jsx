import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Security() {
  return (
    <div className="border-2 p-8 ">
      <div className="flex justify-center items-center    ">
        <Heading size="sm" className=" border p-3  rounded-md ">
          Update Your Password
        </Heading>
      </div>
      <form className=" flex flex-col items-center justify-center">
        <div className="w-full md:w-96 space-y-4  mt-4 ">
          <Input type="password" placeholder="  old password " />
          <Input type="password" placeholder="  new password " />
          <Input type="password" placeholder=" confirm password " />
        </div>
        <Button variant="hover" className=" w-24 mt-4">
          Update
        </Button>
      </form>
    </div>
  );
}
