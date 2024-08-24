import Notfound from "@/components/Notfound";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProfileEditDialog from "./ProfileEditDialog";

export default function ProfileTable({ profiles }) {
  if (profiles.length === 0) return <Notfound />;

  const { businessName, category, status, verified, top, guaranteed } =
    profiles[0]?.businessProfile;
  const { country } = profiles[0]?.addresses;
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
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Top Guaranteed
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.length > 0 &&
            profiles?.map((item) => {
              return (
                <TableRow key={item}>
                  <TableCell className=" ">{businessName}</TableCell>
                  <TableCell className="font-medium ">{category}</TableCell>
                  <TableCell className=" ">{country}</TableCell>
                  <TableCell className=" ">
                    <Badge>{status}</Badge>
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
                    <ProfileEditDialog />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
