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

export default function ReviewTable({ reviews }) {
  return (
    <Table>
      <TableHeader className="w-fit h-14 ">
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
            Verified
          </TableHead>

          <TableHead className="text-lg text-gray-700 font-medium ">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews?.length > 0 &&
          reviews?.map((review) => {
            // console.log(review);

            return (
              <TableRow key={review.reviewId}>
                <TableCell className=" ">
                  {review?.profileDetails?.businessName ||
                    review?.profileDetails?.firstName +
                      review?.profileDetails?.lastName}
                </TableCell>
                <TableCell className=" ">{review?.title}</TableCell>
                <TableCell className=" ">{review?.comment}</TableCell>

                {/* <TableCell className=" ">
                  {status === "pending" && (
                    <Badge className="bg-red-300">{status}</Badge>
                  )}
                  {status === "approved" && <Badge>{status}</Badge>}
                </TableCell> */}
                <TableCell className=" ">
                  <Checkbox
                    className="h-6 w-6"
                    disabled
                    checked={review?.verified}
                  />
                </TableCell>

                <TableCell className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <FaRegEdit className="text-lg cursor-pointer" />
                    </DialogTrigger>

                    {/* <ReviewEditDialog
                      id={review.reviewId}
                      currentVerified={verified}
                    /> */}
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}