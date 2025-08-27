import CustomPagination from "@/components/shared/custom-pagination";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { ClassifiedWithImages, Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import HomeNavbar from "@/modules/components/home/home-navbar";
import ClassifiedList from "@/modules/components/inventory/classified-list";

interface FavouritesContentProps {
  searchParams: { [x: string]: string | string[] | undefined };
  classifieds: Promise<ClassifiedWithImages[]>;
  count: number;
}

const FavouritesMain = async ({
  classifieds,
  count,
}: FavouritesContentProps) => {
  const sourceId = await getSourceId();
  const favourites: Favourites | null = await redis.get(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="w-full h-full">
      <HomeNavbar />
      <div className="flex min-h-screen pt-[4rem]">
        <main className="flex-1 overflow-auto">
          <h2 className="text-2xl font-semibold text-primary text-center pt-2">
            Your favourite classifieds
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 mb-10 md:mb-4">
            <div>
              {count === 0
                ? "No items found"
                : count === 1
                ? "1 item found"
                : `${count} items found`}
            </div>
            <CustomPagination
              baseURL={routes.favourites}
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

          <ClassifiedList
            classifieds={classifieds}
            favourites={favourites ? favourites.ids : []}
          />
        </main>
      </div>
    </div>
  );
};

export default FavouritesMain;
