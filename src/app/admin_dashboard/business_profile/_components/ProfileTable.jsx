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
            profiles?.map((profile) => {
              return (
                <TableRow key={profile.email}>
                  <TableCell className=" ">
                    {profile?.businessProfile?.businessName}
                  </TableCell>
                  <TableCell className="font-medium ">
                    {profile?.businessProfile?.category}
                  </TableCell>
                  <TableCell className=" ">
                    {profile?.addresses?.country}
                  </TableCell>
                  <TableCell className=" ">
                    {profile?.businessProfile?.status === "pending" && (
                      <Badge className="bg-red-300">
                        {profile?.businessProfile?.status}
                      </Badge>
                    )}
                    {profile?.businessProfile?.status === "approved" && (
                      <Badge>{profile?.businessProfile?.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell className=" ">
                    <Checkbox
                      className="h-6 w-6"
                      checked={profile?.businessProfile?.verified}
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <div className=" h-14 flex items-center   gap-6 ">
                      <Checkbox
                        className="h-6 w-6"
                        checked={profile?.businessProfile?.top}
                        disabled
                      />

                      <Checkbox
                        className="h-6 w-6"
                        checked={profile?.businessProfile?.guaranteed}
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
                        username={profile.username}
                        currentStatus={profile?.businessProfile?.status}
                        currentVerified={profile?.businessProfile?.verified}
                        currentTop={profile?.businessProfile?.top}
                        currentGuaranteed={profile?.businessProfile?.guaranteed}
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
