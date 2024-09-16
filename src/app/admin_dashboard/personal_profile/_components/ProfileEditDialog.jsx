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
}) {
  const [status, setStatus] = useState(currentStatus); // Initial status
  const [verified, setVerified] = useState(currentVerified);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/user/${username}`, {
        username,
        role: "personal",
        status,
        verified,
      });

      if (response?.data?.status === 201) {
        router.refresh("/admin_dashboard/personal_profile");
      }
    } catch (error) {
      setError("some error occurred!");
    } finally {
      setLoading(false);
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

        {error && <div className="text-red-500 ">{error}</div>}
        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? <Spinner /> : "Update Profile"}
        </Button>
      </div>
    </DialogContent>
  );
}
