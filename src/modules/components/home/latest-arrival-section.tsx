import prisma from "@/lib/prisma";
import LatestArrivalCarousel from "./latest-arrival-carrousel";
import { ClassifiedStatus } from "@prisma/client";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Favourites } from "@/config/types";

const LatestArrivalSection = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId || "");

  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="text-foreground text-2xl sm:text-4xl uppercase font-semibold text-center tracking-tight">
          Latest Arrivals
        </h2>
        <LatestArrivalCarousel
          classifieds={classifieds}
          favourites={favourites ? favourites.ids : []}
        />
      </div>
    </section>
  );
};

export default LatestArrivalSection;
