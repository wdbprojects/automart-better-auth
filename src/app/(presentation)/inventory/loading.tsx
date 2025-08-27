import CustomPagination from "@/components/shared/custom-pagination";
import SkeletonList from "@/components/shared/skeleton-list";
import { Skeleton } from "@/components/ui/skeleton";
import { MinMaxResultType, PageProps } from "@/config/types";
import prisma from "@/lib/prisma";
import SidebarFilters from "@/modules/components/inventory-sidebar/sidebar-filters";
import InventoryNavbar from "@/modules/components/inventory/inventory-navbar";
import { ClassifiedStatus } from "@prisma/client";

const FavouritesLoading = async () => {
  const totalPages = 0;
  const count = 0;
  return (
    <div className="w-full h-screen">
      <InventoryNavbar />

      <div className="flex flex-row justify-between pb-[0rem] pt-[4rem] h-screen">
        <div className="p-2">
          <Skeleton className="h-full w-[324px] rounded-lg" />
        </div>
        <div className="flex-1 pt-2">
          <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 mb-10 md:mb-4">
            <h2 className="text-sm font-semibold text-foreground flex-1 mt-1">
              Items found ...
            </h2>
            <CustomPagination
              baseURL="/"
              totalPages={totalPages}
              styles={{
                paginationRoot: "justify-end",
                paginationPrevious: "",
                paginationNext: "",
                paginationLink: "border-none active:border",
                paginationLinkActive:
                  "bg-secondary text-foreground shadow-none",
              }}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4 min-w-fit">
            {Array.from({ length: 12 }, (_, index) => {
              return index;
            }).map((id) => {
              return <SkeletonList key={id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouritesLoading;
