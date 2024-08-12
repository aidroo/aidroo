"use client";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Subcategory from "@/components/Subcategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import apiService from "@/lib/apiService";
import { useCallback, useEffect, useState } from "react";

export default function Categories() {
  const [categoryText, setCategoryText] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  // Fetch categories with memoization to avoid unnecessary re-fetching
  const fetchCategories = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await apiService.getData(
        `/api/category?page=${page}&limit=${itemsPerPage}`
      );
      if (response?.data.status === 201) {
        setCategoryData(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
        // setSuccess(response?.data?.message);
      } else setError(response?.data?.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle category creation
  const handleCategorySubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (!categoryText) return;

    try {
      const response = await apiService.addData(`/api/category`, {
        name: categoryText,
      });
      if (response?.status === 201) {
        setCategoryData((prev) => [...prev, response?.data]);
        fetchCategories(currentPage);
        setCategoryText("");
      } else setError(response?.message);

      setCategoryText(""); // Clear input after submission
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

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
              {loading ? (
                <TableRow>
                  <TableCell>Loading...</TableCell>
                </TableRow>
              ) : categoryData?.length > 0 ? (
                categoryData.map((item) => (
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
            totalPages={totalPages}
          />
        </div>
      </div>

      {/* Sub Category */}
      <Subcategory categoryData={categoryData} />
    </div>
  );
}
