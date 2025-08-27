import CustomPagination from "@/components/shared/custom-pagination";
import SkeletonList from "@/components/shared/skeleton-list";
import { routes } from "@/config/routes";
import HomeNavbar from "@/modules/components/home/home-navbar";

const FavouritesLoading = () => {
  const totalPages = 0;
  const count = 0;

  return (
    <div className="w-full h-full">
      <HomeNavbar />
      <div className="flex min-h-screen pt-[4rem]">
        <main className="flex-1 overflow-auto">
          <h2 className="text-2xl font-semibold text-primary text-center pt-2">
            Your favourite classifieds
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 mb-10 md:mb-4">
            <div>&nbsp;</div>
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4 min-w-fit">
            {Array.from({ length: 6 }, (_, index) => {
              return index;
            }).map((id) => {
              return <SkeletonList key={id} />;
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FavouritesLoading;
