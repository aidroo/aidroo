"use client";
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
import { useAuth } from "@/hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import JobsEditDialog from "./JobsEditTabale";

export default function JobsTable({ jobs }) {
  console.log(jobs);
  const { currentUser } = useAuth();
  return (
    <div className=" w-full lg:w-[750px] overflow-hidden overflow-x-auto space-y-6 border rounded-md px-2">
      <Table className="px-8">
        <TableHeader className="w-fit h-14   ">
          <TableRow>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Title
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Price
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

            {(currentUser?.role === "admin" ||
              currentUser?.role === "reviewer") && (
              <TableHead className="text-lg text-gray-700 font-medium ">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        {jobs && (
          <TableBody>
            {jobs?.length > 0 &&
              jobs?.map((job) => {
                return (
                  <TableRow key={job.id}>
                    <TableCell className=" ">{job?.title}</TableCell>
                    <TableCell className=" ">{job?.price}</TableCell>
                    <TableCell className=" ">{job?.country}</TableCell>

                    <TableCell className=" ">
                      {job?.status === "pending" && (
                        <Badge className="bg-red-300">{job?.status}</Badge>
                      )}
                      {job?.status === "approved" && (
                        <Badge>{job?.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className=" ">
                      <Checkbox
                        className="h-6 w-6"
                        disabled
                        checked={job?.verified}
                      />
                    </TableCell>
                    {(currentUser?.role === "admin" ||
                      currentUser?.role === "reviewer") && (
                      <TableCell className="flex gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <FaRegEdit className="text-lg cursor-pointer" />
                          </DialogTrigger>

                          <JobsEditDialog
                            id={job.id}
                            currentVerified={job.verified}
                            currentStatus={job.status}
                          />
                        </Dialog>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
