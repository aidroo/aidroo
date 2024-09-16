/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileEditDialog({
  username,
  currentStatus,
  currentVerified,
  currentTop,
  currentGuaranteed,
}) {
  const [status, setStatus] = useState(currentStatus); // Initial status
  const [verified, setVerified] = useState(currentVerified);
  const [top, setTop] = useState(currentTop);
  const [guaranteed, setGuaranteed] = useState(currentGuaranteed);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/user/${username}`, {
        username,
        role: "business",
        status,
        verified,
        top,
        guaranteed,
      });

      if (response?.data?.status === 201) {
        router.refresh("/admin_dashboard/business_profile");
      }
    } catch (error) {
      setError("some error occurred!");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setDeleteLoading(true); // Set loading state to true while the operation is in progress
    try {
      const response = await axiosInstance.delete(`/api/user/${username}`);

      if (response?.status === 200) {
        // Refresh or redirect as needed after successful deletion
        router.push("/admin_dashboard/business_profile"); // Redirect after deletion
      }
    } catch (error) {
      console.error(error);
      setError("Error occurred while deleting the user!"); // Set error state if something goes wrong
    } finally {
      setDeleteLoading(false); // Set loading state to false after operation completes
    }
  };

  return (
    <DialogContent>
      <DialogTitle></DialogTitle>
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <label>Status</label>
          <select
            value={status} // The initial value of status
            onChange={(e) => setStatus(e.target.value)}
            className="input"
          >
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <Checkbox
            checked={verified}
            onCheckedChange={(e) => setVerified(e)}
          />
          <label>Verified</label>
        </div>
        <div className="flex gap-4 items-center">
          <Checkbox checked={top} onCheckedChange={(e) => setTop(e)} />
          <label>Top</label>
        </div>
        <div className="flex gap-4 items-center">
          <Checkbox
            checked={guaranteed}
            onCheckedChange={(e) => setGuaranteed(e)}
          />
          <label>Guaranteed</label>
        </div>
        {error && <div className="text-red-500 ">{error}</div>}
        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? <Spinner /> : "Update Profile"}
        </Button>
        <Button onClick={handleDelete} disabled={loading}>
          {deleteLoading ? <Spinner /> : "Delete Profile"}
        </Button>
      </div>
    </DialogContent>
  );
}
