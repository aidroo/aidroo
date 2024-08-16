"use client";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Subcategory from "@/components/Subcategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import apiService from "@/lib/apiService";
import { useState } from "react";
import useSWR from "swr";

export default function Categories() {
  const [categoryText, setCategoryText] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetcher = (url) => apiService.getData(url);
  const {
    data,
    error: apiError,
    mutate,
    isLoading,
  } = useSWR(
    ["/api/category", { page: currentPage, limit: itemsPerPage }],
    fetcher
  );

  const handleCategorySubmit = async (e) => {
    setError(null);
    e.preventDefault();
    if (!categoryText) return;

    try {
      const response = await apiService.addData("/api/category", {
        name: categoryText,
      });

      if (response?.status === 201) {
        setCategoryText("");
        mutate();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-10">
      {/* Category */}
      <div className="grid grid-cols-2 gap-10 border rounded-lg p-10">
        <form className="space-y-6 w-64" onSubmit={handleCategorySubmit}>
          <Input
            type="text"
            placeholder="Type category name"
            className="h-12"
            required
            value={categoryText}
            onChange={(e) => setCategoryText(e.target.value)}
          />
          {error && <h1 className="p-2 text-red-200">{error || apiError}</h1>}
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
              {isLoading ? (
                <TableRow>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              ) : data?.data?.length > 0 ? (
                data?.data?.map((item) => (
                  <TableRow key={item?.id}>
                    <TableCell className="font-medium">{item?.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No categories available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.totalPages}
          />
        </div>
      </div>

      {/* Sub Category */}
      <Subcategory mutateCategories={mutate} />
    </div>
  );
}
