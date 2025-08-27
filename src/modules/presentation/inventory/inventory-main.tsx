import ClassifiedList from "../../components/inventory/classified-list";
import CustomPagination from "../../../components/shared/custom-pagination";
import { routes } from "@/config/routes";
import SidebarFilters from "@/modules/components/inventory-sidebar/sidebar-main";
import InventoryNavbar from "@/modules/components/inventory/inventory-navbar";
import { ClassifiedWithImages, MinMaxResultType } from "@/config/types";
import InventoryFooter from "@/modules/components/inventory/inventory-footer";

const InventoryMain = ({
  count,
  classifieds,
  favourites,
  totalPages,
  searchParams,
  minMaxResult,
}: {
  count: number;
  classifieds: Promise<ClassifiedWithImages[]>;
  favourites: number[];
  totalPages: number;
  searchParams: { [x: string]: string | string[] | undefined };
  minMaxResult: MinMaxResultType;
}) => {
  return (
    <div className="w-full h-full">
      <InventoryNavbar />
      <div className="flex overflow-y-auto">
        <SidebarFilters
          minMaxResult={minMaxResult}
          searchParams={searchParams ?? {}}
        />
        <div className="flex flex-col justify-between pb-[0rem] pt-[4rem] w-full">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 py-1 mb-10 md:mb-0">
              <h2 className="text-sm font-semibold text-foreground flex-1 min-w-[250px]">
                Items found: {count}
              </h2>
              <CustomPagination
                baseURL={routes.inventory}
                totalPages={totalPages}
                maxVisiblePages={10}
                styles={{
                  paginationRoot: "justify-end",
                  paginationPrevious: "",
                  paginationNext: "",
                  paginationLink: "border-none active:border",
                  paginationLinkActive:
                    "bg-secondary text-foreground shadow-none ",
                }}
              />
            </div>
            <div className="">
              <ClassifiedList
                classifieds={classifieds}
                favourites={favourites}
              />
            </div>
          </div>
          <div>
            <InventoryFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMain;
