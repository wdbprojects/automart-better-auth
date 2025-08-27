import { Skeleton } from "@/components/ui/skeleton";

const CarouselSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <Skeleton className="aspect-3/2 w-full" />
      <div className="grid grid-cols-4 mt-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => {
          return <Skeleton className="aspect-3/2" key={index} />;
        })}
      </div>
    </div>
  );
};

export default CarouselSkeleton;
