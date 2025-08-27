"use client";

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";

interface PaginationProps {
  baseURL: string;
  totalPages: number;
  maxVisiblePages?: number | undefined;
  styles: {
    paginationRoot: string;
    paginationPrevious: string;
    paginationNext: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
}

const CustomPagination = (props: PaginationProps) => {
  const { baseURL, totalPages, maxVisiblePages = 5, styles } = props;
  const [currentPage, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => {
      return value.toString();
    },
    shallow: false, // re-fetches data when URL changes
  });
  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(maxVisiblePages, totalPages),
  });

  useEffect(() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const newStart = Math.max(
      1,
      Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1),
    );
    const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [currentPage, totalPages, maxVisiblePages]);

  const createPageUrl = (pageNumber: number) => {
    const url = new URL(baseURL, env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set("page", pageNumber.toString());
    return url.toString();
  };

  const handleEllipsisClick = (direction: "left" | "right") => {
    const newPage =
      direction === "left"
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);
    setPage(newPage);
  };

  return (
    <div className="flex-1 md:flex-2 flex md:justify-start md:items-center text-sm">
      <PaginationRoot className={styles.paginationRoot}>
        <PaginationContent className="lg:gap-2">
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              className={cn(
                currentPage <= 1 && "hidden",
                cn(styles?.paginationPrevious),
                "text-xs",
              )}
              href={createPageUrl(currentPage - 1)}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage > 1) {
                  setPage(currentPage - 1);
                }
              }}
            />
          </PaginationItem>

          {visibleRange.start > 1 && (
            <PaginationItem>
              <PaginationLink
                size="sm"
                className={styles.paginationLink}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleEllipsisClick("left");
                }}
              >
                <Ellipsis />
              </PaginationLink>
            </PaginationItem>
          )}

          {Array.from(
            { length: visibleRange.end - visibleRange.start + 1 },
            (_, index) => {
              return visibleRange.start + index;
            },
          ).map((pageNumber) => {
            const isActive = pageNumber === currentPage;
            let rel = "";
            if (pageNumber === currentPage - 1) {
              rel = "prev";
            }
            if (pageNumber === currentPage + 1) {
              rel = "next";
            }
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  {...(rel ? { rel } : {})}
                  isActive={isActive}
                  href={createPageUrl(pageNumber)}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(pageNumber);
                  }}
                  className={cn(
                    styles.paginationLink,
                    isActive && styles.paginationLinkActive,
                  )}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {visibleRange.end < totalPages && (
            <PaginationItem>
              <PaginationLink
                size="sm"
                className={styles.paginationLink}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleEllipsisClick("right");
                }}
              >
                <Ellipsis />
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              size="sm"
              className={cn(
                currentPage >= totalPages && "hidden",
                styles?.paginationNext,
                "text-xs",
              )}
              href={createPageUrl(currentPage + 1)}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage < totalPages) {
                  setPage(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
};

export default CustomPagination;
