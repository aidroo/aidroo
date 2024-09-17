"use client";
import Notfound from "@/components/Notfound";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ProfileEditDialog from "./ProfileEditDialog";

export default function ProfileTable({ profiles = [] }) {
  const [currentProfileId, setCurrentProfileId] = useState(null);

  const { currentUser } = useAuth();
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
            <TableHead className="w-fit text-sm"> Profile Name </TableHead>
            <TableHead className="text-sm">Country</TableHead>

            <TableHead className="text-sm">Status</TableHead>
            <TableHead className="text-sm">Hiring</TableHead>
            <TableHead className="text-sm">Verified</TableHead>
            {currentUser?.role === "editor" ||
              (currentUser?.role === "admin" && (
                <TableHead className="text-sm">Actions</TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.length > 0 &&
            profiles?.map((profile) => {
              const fullName =
                profile.personalProfile?.firstName +
                " " +
                profile.personalProfile?.lastName;

              return (
                <TableRow key={profile.email}>
                  <TableCell>{fullName}</TableCell>

                  <TableCell>{profile?.addresses?.country}</TableCell>
                  <TableCell>
                    {profile?.personalProfile?.status === "pending" && (
                      <Badge className="bg-red-300">
                        {profile?.personalProfile?.status}
                      </Badge>
                    )}

                    {profile?.personalProfile?.status === "approved" && (
                      <Badge>{profile?.personalProfile?.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{profile.personalProfile.hireTimeCount}</TableCell>
                  <TableCell>
                    <div className="h-14 flex items-center gap-6">
                      <Checkbox
                        className="h-6 w-6"
                        checked={profile?.personalProfile?.verified}
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
                        username={currentProfileId}
                        currentStatus={profile?.personalProfile?.status}
                        currentVerified={profile?.personalProfile?.verified}
                      />
                    </Dialog>
                  </TableCell>
                  {/* Profile and review create dialog */}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
