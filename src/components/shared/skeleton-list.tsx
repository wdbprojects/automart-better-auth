import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonList = () => {
  return (
    <Card className="w-full pt-0 pb-4 gap-2 rounded-md overflow-hidden flex flex-col justify-between space-y-0">
      <CardContent className="px-0 relative">
        <Skeleton className="w-full aspect-3/2 object-cover rounded-b-none" />
        <div className="space-y-2 p-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </CardContent>
      <CardFooter className="px-2 mt-0 flex flex-col sm:flex-row justify-between items-center gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonList;
