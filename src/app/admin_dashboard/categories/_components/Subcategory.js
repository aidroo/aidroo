"use client";

import { Combobox } from "@/components/Combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Subcategory({ categories, subcategories }) {
  const [subcategoryText, setSubcategoryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [error, setError] = useState(null);
  const router = useRouter();
  // Revalidate subcategories
  useEffect(() => {
    if (selectedCategory) {
      const query = new URLSearchParams();
      if (selectedCategory?.name)
        query.set("category_id", selectedCategory?.id);
      router.push(`/admin_dashboard/categories?${query.toString()}`, {
        shallow: true,
      });
    }
  }, [selectedCategory, router]);
  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryText) return;

    try {
      const response = await axiosInstance.post("/api/subcategory", {
        name: subcategoryText,
        categoryId: selectedCategory?.id,
      });

      if (response?.statusText === "OK") {
        setSelectedCategory(null);
        setSubcategoryText("");
        router.refresh("/admin_dashboard/categories");
      } else {
        setError(response?.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-10 border rounded-lg p-10">
      <form className="space-y-6 w-64" onSubmit={handleSubcategorySubmit}>
        <Input
          type="text"
          placeholder="Type subcategory name"
          className="h-10"
          required
          value={subcategoryText}
          onChange={(e) => setSubcategoryText(e.target.value)}
        />

        <Combobox
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          options={categories}
          placeholder=" Selected Category"
        />
        {error && <h1 className="p-2 text-red-200">{error}</h1>}
        <Button variant="hover" size="lg" type="submit">
          Create
        </Button>
      </form>
      <div className="space-y-4 w-full">
        <div className="border p-4 rounded-md">
          <h1 className="text-primary_color text-xl font-semibold">
            Subcategory List
          </h1>
        </div>

        <Table className="ms-2 space-y-4 overflow-x-hidden">
          <TableBody>
            {subcategories.length > 0 &&
              subcategories.map((subcategory) => (
                <TableRow key={subcategory?.id}>
                  <TableCell className="font-medium">
                    {subcategory?.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {subcategory?.Category?.name}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages}
        /> */}
      </div>
    </div>
  );
}
