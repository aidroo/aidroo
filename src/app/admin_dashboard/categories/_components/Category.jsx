"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Category({ categories, selectedCategoryId }) {
  const [categoryText, setCategoryText] = useState(selectedCategoryId || "");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!categoryText) return;

    try {
      const response = await axiosInstance.post("/api/category", {
        name: categoryText,
      });

      if (response?.status === 200) {
        router.refresh();
        setCategoryText("");
      } else {
        setError("Failed to create category");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/category/${id}`);

      if (response?.status === 200) {
        router.refresh(); // Refresh the page to reflect the deleted category
      } else {
        setError("Failed to delete category");
      }
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  return (
    <>
      <form className="space-y-6 w-64" onSubmit={handleCategorySubmit}>
        <Input
          type="text"
          placeholder="Type category name"
          className="h-12"
          required
          value={categoryText}
          onChange={(e) => setCategoryText(e.target.value)}
        />
        {error && <h1 className="p-2 text-red-200">{error}</h1>}
        <Button variant="hover" size="lg" type="submit">
          Create
        </Button>
      </form>
      <div className="space-y-4 w-full">
        <div className="border p-4 rounded-md">
          <h1 className="text-primary_color text-xl font-semibold">
            Category List
          </h1>
        </div>
        <Table className="ms-2 space-y-4 overflow-x-hidden border">
          <TableBody>
            {categories?.length > 0 &&
              categories.map((category) => (
                <TableRow key={category?.id}>
                  <TableCell className="font-medium flex justify-between">
                    <span>{category?.name}</span>
                    <div>
                      <MdDelete
                        className="text-red-400 text-xl cursor-pointer"
                        onClick={() => handleDelete(category.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
