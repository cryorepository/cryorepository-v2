"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define TypeScript interfaces
interface IndexResponse {
  total: number;
  page: number;
  totalPages: number;
}

interface DatabaseClientProps {
  initialData: IndexResponse;
  limit: number;
}

//const PaginationComponent: React.FC<DatabaseClientProps> = ({ initialData, page, limit }) => {
const PaginationComponent: React.FC<DatabaseClientProps> = ({ initialData, limit }) => {
  const router = useRouter();
  // const { chemClassFilters, cellTypeFilters, total, totalPages, page: currentPage } = initialData;
  const { total, totalPages, page: currentPage } = initialData;

  const handlePageChange = (newPage: number) => {
    router.push(`/database?page=${newPage}&limit=${limit}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    // let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNum)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <span className="px-3.5 py-2">...</span>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-center text-sm mt-2">
        Page {currentPage} of {totalPages} ({total} entries)
      </div>
    </>
  );
};

export default PaginationComponent;