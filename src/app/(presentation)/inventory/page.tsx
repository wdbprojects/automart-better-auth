import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { PageSchema } from "@/app/schemas/page.schema";
import InventoryMain from "@/modules/presentation/inventory/inventory-main";
import { buildClassifiedFilterQuery } from "@/lib/utils";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  // validate page
  const validPage = PageSchema.parse(searchParams?.page);
  // get current page
  const currentPage = validPage ? validPage : 1;
  // calculate the offset
  const offset = (currentPage - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = getInventory(searchParams);
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });

  const minMaxResult = await prisma.classified.aggregate({
    where: {
      status: ClassifiedStatus.LIVE,
    },
    _min: {
      price: true,
      year: true,
      odometerReading: true,
    },
    _max: {
      price: true,
      year: true,
      odometerReading: true,
    },
  });

  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  return (
    <InventoryMain
      searchParams={searchParams ?? {}}
      count={count}
      classifieds={classifieds}
      favourites={favourites ? favourites.ids : []}
      totalPages={totalPages}
      minMaxResult={minMaxResult}
    />
  );
};

export default InventoryPage;
