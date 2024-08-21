"use client";
import apiService from "@/lib/apiService";
import { useState } from "react";
import useSWR from "swr";
import { Combobox } from "./Combobox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export default function Subcategory() {
  const [subcategoryText, setSubcategoryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Revalidate subcategories

  const {
    data,
    error: apiError,
    mutate,
    isLoading,
  } = useSWR(
    ["/api/subcategory", { categoryId: selectedCategory?.id }],
    (url) => apiService.getData(url)
  );

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryerror,
  } = useSWR("/api/category", apiService.getData);

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryText) return;

    try {
      const response = await apiService.addData("/api/subcategory", {
        name: subcategoryText,
        categoryId: selectedCategory?.id,
      });

      if (response?.status === 201) {
        setSelectedCategory(null);
        setSubcategoryText("");
        mutate();
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
          options={categoryData?.data}
          isLoading={categoryLoading}
          error={categoryerror}
          placeholder=" Selected Category"
        />
        {error && <h1 className="p-2 text-red-200">{error | apiError}</h1>}
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
            {isLoading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : data?.data?.length > 0 ? (
              data?.data?.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {item?.Category?.name}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No category selected</TableCell>
              </TableRow>
            )}
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
