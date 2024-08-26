import Notfound from "@/components/Notfound";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import ProfileEditDialog from "./ProfileEditDialog";

export default function ProfileTable({ profiles }) {
  if (profiles.length === 0) return <Notfound />;

  return (
    <div className="w-[450px] lg:w-[800px] overflow-hidden overflow-x-auto space-y-6 border rounded-md">
      <Table>
        <TableHeader className="w-fit h-14 ">
          <TableRow>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Profile Name
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Category
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Country
            </TableHead>

            <TableHead className="text-lg text-gray-700 font-medium  ">
              Status
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Verified
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium flex  items-center mt-2 gap-x-2 ">
              Top Guaranteed
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium ">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.length > 0 &&
            profiles?.map((item) => {
              const {
                businessName,
                category,
                status,
                verified,
                top,
                guaranteed,
              } = item?.businessProfile;
              const { country } = item?.addresses;
              return (
                <TableRow key={item.email}>
                  <TableCell className=" ">{businessName}</TableCell>
                  <TableCell className="font-medium ">{category}</TableCell>
                  <TableCell className=" ">{country}</TableCell>
                  <TableCell className=" ">
                    {status === "pending" && (
                      <Badge className="bg-red-300">{status}</Badge>
                    )}
                    {status === "approved" && <Badge>{status}</Badge>}
                  </TableCell>
                  <TableCell className=" ">
                    <Checkbox className="h-6 w-6" checked={verified} disabled />
                  </TableCell>
                  <TableCell>
                    <div className=" h-14 flex items-center   gap-6 ">
                      <Checkbox className="h-6 w-6" checked={top} disabled />

                      <Checkbox
                        className="h-6 w-6"
                        checked={guaranteed}
                        disabled
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <FaRegEdit className="text-lg cursor-pointer" />
                      </DialogTrigger>
                      <ProfileEditDialog
                        username={item.username}
                        currentStatus={status}
                        currentVerified={verified}
                        currentTop={top}
                        currentGuaranteed={guaranteed}
                      />
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
