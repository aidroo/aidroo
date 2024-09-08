"use client";
import Notfound from "@/components/Notfound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ProfileEditDialog from "./ProfileEditDialog";
import ReviewAndProfileCreateDialog from "./ReviewAndProfileCreateDialog";

export default function ProfileTable({ profiles, isExit }) {
  const [currentProfileId, setCurrentProfileId] = useState(null);

  if (profiles.length === 0) return <Notfound />;

  // Function to handle dialog open
  const handleOpen = (profileId) => {
    setCurrentProfileId(profileId);
  };

  return (
    <div className="w-[450px] lg:w-[800px] overflow-hidden overflow-x-auto space-y-6 border rounded-md">
      <Table className="w-[1000px]">
        <TableHeader className="w-fit h-14 ">
          <TableRow>
            <TableHead className="text-lg text-gray-700 font-medium">
              Profile Name
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              Category
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              Country
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              Status
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              Verified
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium flex items-center mt-2 gap-x-2">
              Top Guaranteed
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              Action
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              Write Review
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.length > 0 &&
            profiles?.map((profile) => (
              <TableRow key={profile.email}>
                <TableCell>{profile?.businessProfile?.businessName}</TableCell>
                <TableCell className="font-medium">
                  {profile?.businessProfile?.category}
                </TableCell>
                <TableCell>{profile?.addresses?.country}</TableCell>
                <TableCell>
                  {profile?.businessProfile?.status === "pending" && (
                    <Badge className="bg-red-300">
                      {profile?.businessProfile?.status}
                    </Badge>
                  )}
                  {profile?.businessProfile?.status === "approved" && (
                    <Badge>{profile?.businessProfile?.status}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    className="h-6 w-6"
                    checked={profile?.businessProfile?.verified}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <div className="h-14 flex items-center gap-6">
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
                {/* Profile edit dialog */}
                <TableCell>
                  <Dialog
                    onOpenChange={(open) =>
                      open && handleOpen(profile.username)
                    }
                  >
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
                {/* Profile and review create dialog */}
                <TableCell>
                  <Dialog
                    onOpenChange={(open) =>
                      open && handleOpen(profile.username)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">Write</Button>
                    </DialogTrigger>
                    <ReviewAndProfileCreateDialog
                      profileId={currentProfileId}
                      isExit={isExit}
                    />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
