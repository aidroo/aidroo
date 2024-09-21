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
import ReviewEditDialog from "./ReviewEdidtModal";

export default function ReviewTable({ reviews }) {
  const { currentUser } = useAuth();
  return (
    <div className=" w-full lg:w-[750px] overflow-hidden overflow-x-auto space-y-6 border rounded-md px-2">
      <Table className="px-8">
        <TableHeader className="w-fit h-14   ">
          <TableRow>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Profile Name
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Title
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium  ">
              Comment
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
        {reviews && (
          <TableBody>
            {reviews?.length > 0 &&
              reviews?.map((review) => {
                return (
                  <TableRow key={review.reviewId}>
                    <TableCell className=" ">
                      {review?.profileDetails?.businessName ||
                        review?.profileDetails?.firstName +
                          review?.profileDetails?.lastName}
                    </TableCell>
                    <TableCell className=" ">{review?.title}</TableCell>
                    <TableCell className=" ">{review?.comment}</TableCell>

                    <TableCell className=" ">
                      {review?.status === "pending" && (
                        <Badge className="bg-red-300">{review?.status}</Badge>
                      )}
                      {review?.status === "approved" && (
                        <Badge>{review?.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className=" ">
                      <Checkbox
                        className="h-6 w-6"
                        disabled
                        checked={review?.verified}
                      />
                    </TableCell>
                    {(currentUser?.role === "admin" ||
                      currentUser?.role === "reviewer") && (
                      <TableCell className="flex gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <FaRegEdit className="text-lg cursor-pointer" />
                          </DialogTrigger>

                          <ReviewEditDialog
                            id={review.reviewId}
                            currentVerified={review.verified}
                            currentStatus={review.status}
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
