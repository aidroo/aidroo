"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaginationComponent({
  currentPage,
  totalPages,
  baseUrl,
  initialLimit = 10, // default limit if not provided
  pagename = "page",
  limitname = "limit",
  lastShow = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [limit] = useState(initialLimit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      // Create a new URLSearchParams object from existing query parameters
      const queryParams = new URLSearchParams(searchParams.toString());

      // Set the pagination-related query parameters
      queryParams.set(pagename, page);
      queryParams.set(limitname, limit);

      // Construct the new URL and push it to the router
      router.push(`${baseUrl}${queryParams.toString()}`);
    }
  };

  return (
    <Pagination className="py-10">
      <PaginationContent>
        {/* Previous Button */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {/* First Page and Ellipsis */}
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Previous Page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {/* Next Page */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Last Page and Ellipsis */}
        {currentPage < totalPages - 1 && !lastShow && (
          <>
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
