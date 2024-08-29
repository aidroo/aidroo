/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function ReviewEditDialog({ id, currentVerified }) {
  const [verified, setVerified] = useState(currentVerified);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/review/${id}`, {
        id,
        verified,
      });

      if (response?.data?.status === 201) {
        setSuccess(response.data.message);
        router.push("/admin_dashboard/reviews");
      }
    } catch (error) {
      //   console.log(error?.response?.data?.message);

      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    setSuccess("");
    setError("");
    try {
      const response = await axiosInstance.delete(`/api/review/${id}`);

      if (response?.data?.status === 200) {
        setSuccess(response.data.message);
        router.push("/admin_dashboard/reviews");
        // Redirect after deletion
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogTitle></DialogTitle>
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <Checkbox
            checked={verified}
            onCheckedChange={(e) => setVerified(e)}
          />
          <label>Verified</label>
        </div>

        {error && <div className="text-red-500 ">{error}</div>}
        {success && <div className="text-green-300 ">{success}</div>}
        <div className="flex gap-4 items-center">
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Review"}
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleteLoading}
            variant="destructive"
          >
            <MdDelete
              className="text-xl cursor-pointer  "
              onClick={handleDelete} // Attach delete function to icon
            />
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
