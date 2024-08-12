"use client";
import apiService from "@/lib/apiService";
import { useCallback, useEffect, useState } from "react";
import { Combobox } from "./Combobox";
import PaginationComponent from "./Pagination/PaginationComponent";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export default function Subcategory({ categoryData }) {
  const [subcategoryText, setSubcategoryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [exitSubCategory, setExitSubCategory] = useState(false);

  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  const fetchSubcategories = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const response = await apiService.getData("/api/subcategory", {
          page,
          limit: itemsPerPage,
        });
        if (response?.data.status === 201) {
          setSubcategoryData(response?.data?.data || []);
          setTotalPages(response?.data?.totalPages || 1);
          // setSuccess(response?.data?.message);
        } else setError(response?.data?.message);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage]
  );

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryText || !selectedCategory) return;

    try {
      const response = await apiService.addData("/api/subcategory", {
        name: subcategoryText,
        categoryId: selectedCategory?.id,
      });
      if (response?.status === 201) {
        setSubcategoryData((prev) => [...prev, response?.data]);
        fetchSubcategories(currentPage);
        setSubcategoryText("");
        setSelectedCategory(null);
      } else setError(response?.message);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSubcategories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const existingSubCategory = subcategoryData.find(
      (sbc) => sbc?.name === subcategoryText
    );
    setExitSubCategory(!!existingSubCategory);
  }, [subcategoryText, subcategoryData]);

  return (
    <>
      {error ? (
        <h1 className="p-2 text-red-300 bg-red-100">{error}</h1>
      ) : (
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
            {exitSubCategory && (
              <h1 className="p-2 bg-red-100 text-red-300 rounded-md">
                Subcategory already exists, try a different name.
              </h1>
            )}
            <Combobox
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryData={categoryData}
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
                {loading ? (
                  <TableRow>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                ) : subcategoryData?.length > 0 ? (
                  subcategoryData.map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell className="font-medium">
                        {item?.name}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {item?.Category?.name}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No subcategories available</TableCell>
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
      )}
    </>
  );
}
