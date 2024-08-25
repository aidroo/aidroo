"use client";
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
        router.push("/admin_dashboard/business_profile");
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
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </DialogContent>
  );
}
