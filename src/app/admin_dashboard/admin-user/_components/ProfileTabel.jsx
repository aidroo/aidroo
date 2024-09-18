"use client";
import Notfound from "@/components/Notfound";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function ProfileTable({ profiles }) {
  const [, setDeleteLoading] = useState();
  const [, setError] = useState("");
  const router = useRouter();

  if (profiles.length === 0) return <Notfound />;

  // Function to handle dialog open
  const handleDelete = async (username) => {
    setDeleteLoading(true); // Set loading state to true before operation starts
    try {
      const response = await axiosInstance.delete(`/api/user/${username}`);

      if (response?.status === 200) {
        // Refresh or redirect as needed after successful deletion
        router.refresh("/admin_dashboard/admin-user"); // Redirect after deletion
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred while deleting the user!"); // Set error state if something goes wrong
    } finally {
      setDeleteLoading(false); // Set loading state to false after operation completes
    }
  };

  return (
    <div className="  space-y-6 border rounded-md">
      <Table>
        <TableHeader className="w-fit h-14 ">
          <TableRow>
            <TableHead className="text-lg text-gray-700 font-medium">
              Email
            </TableHead>
            <TableHead className="text-lg text-gray-700 font-medium">
              User Role
            </TableHead>

            <TableHead className="text-lg text-gray-700 font-medium">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.length > 0 &&
            profiles?.map((profile) => (
              <TableRow key={profile.email}>
                <TableCell> {profile.email}</TableCell>
                <TableCell> {profile.role}</TableCell>

                <TableCell>
                  <MdDelete
                    className="text-xl text-red-400"
                    onClick={() => handleDelete(profile.username)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
