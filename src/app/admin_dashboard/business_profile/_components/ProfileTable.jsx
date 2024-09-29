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
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import ForwardedFaRegEdit from "./ForwardRef";
import ProfileEditDialog from "./ProfileEditDialog";
import ReviewAndProfileCreateDialog from "./ReviewAndProfileCreateDialog";

export default function ProfileTable({ profiles, isExit }) {
  const [currentProfile, setCurrentProfile] = useState(null);

  const { currentUser } = useAuth();
  // const currentUser = {
  //   role: "editor",
  // };

  if (profiles.length === 0) return <Notfound />;

  // Function to handle dialog open
  const handleOpen = (profile) => {
    setCurrentProfile(profile);
  };

  return (
    <div className=" w-full lg:w-[800px] overflow-hidden overflow-x-auto space-y-6 border rounded-md px-2">
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
            {(currentUser?.role == "admin" ||
              currentUser?.role == "editor") && (
              <TableHead className="text-lg text-gray-700 font-medium">
                Action
              </TableHead>
            )}
            {(currentUser?.role == "admin" ||
              currentUser?.role == "reviewer") && (
              <TableHead className="text-lg text-gray-700 font-medium">
                Write Review
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.length > 0 &&
            profiles?.map((profile) => (
              <TableRow key={profile.email}>
                {currentUser.role === "admin" ? (
                  <TableCell>
                    <Link
                      href={`/business_dashboard/business_info?username=${profile.username}`}
                    >
                      {profile?.businessProfile?.businessName}
                    </Link>
                  </TableCell>
                ) : (
                  <TableCell>
                    {profile?.businessProfile?.businessName}
                  </TableCell>
                )}

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
                {(currentUser?.role == "admin" ||
                  currentUser?.role == "editor") && (
                  <TableCell>
                    <Dialog
                      onOpenChange={(open) =>
                        open && handleOpen(profile.username)
                      }
                    >
                      <DialogTrigger asChild>
                        <div>
                          <ForwardedFaRegEdit className="text-lg cursor-pointer" />
                        </div>
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
                )}
                {/* Profile and review create dialog */}
                {(currentUser?.role == "admin" ||
                  currentUser?.role == "reviewer") && (
                  <TableCell>
                    <Dialog
                      onOpenChange={(open) => open && handleOpen(profile)}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">Write</Button>
                      </DialogTrigger>
                      {currentProfile && (
                        <ReviewAndProfileCreateDialog
                          profile={currentProfile}
                          isExit={isExit}
                        />
                      )}
                    </Dialog>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
