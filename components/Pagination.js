import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({
  totalPages = 45,
  initialPage = 1,
  onPageChange = null
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Logic for middle pages
    const showEllipsisBefore = currentPage > 3;
    const showEllipsisAfter = currentPage < totalPages - 2;

    // Calculate range of visible page numbers
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range if at edges
    if (currentPage <= 3) {
      rangeEnd = Math.min(4, totalPages - 1);
    }

    if (currentPage >= totalPages - 2) {
      rangeStart = Math.max(totalPages - 3, 2);
    }

    // Add ellipsis before if needed
    if (showEllipsisBefore) {
      pages.push("...");
    }

    // Add page numbers
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis after if needed
    if (showEllipsisAfter) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Call the onPageChange callback if provided
      if (onPageChange && typeof onPageChange === "function") {
        onPageChange(page);
      }
    }
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-between items-center flex-wrap gap-2">
      <p className="text-gray-500 font-14">Showing 1 to 10 of 120 Entries</p>
      <div className="flex items-center space-x-2 py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center font-16 shrink-0 size-7 2xl:size-9 rounded-lg border border-gray-200 bg-white disabled:opacity-50 focus:ring-offset-2 focus:ring-2 focus:ring-primary-purple/50"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? handlePageChange(page) : null
            }
            disabled={page === "..."}
            className={`flex items-center justify-center font-16 shrink-0 size-7 2xl:size-9 rounded-lg focus:ring-offset-2 focus:ring-2 focus:ring-primary-purple/50 ${
              currentPage === page
                ? "bg-primary-purple text-white"
                : "bg-white border border-gray-200 text-gray-700"
            } ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center font-16 shrink-0 size-7 2xl:size-9 rounded-lg border border-gray-200 bg-white disabled:opacity-50 focus:ring-offset-2 focus:ring-2 focus:ring-primary-purple/50"
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
