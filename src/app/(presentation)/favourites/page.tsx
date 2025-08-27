import { PageSchema } from "@/app/schemas/page.schema";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import FavouritesMain from "@/modules/presentation/favorites/favourites-main";

const FavouritesPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const validPage = PageSchema.parse(searchParams?.page);
  const page = validPage ? validPage : 1;
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  const classifieds = prisma.classified.findMany({
    where: { id: { in: favourites ? favourites.ids : [] } },
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });

  const count = await prisma.classified.count({
    where: { id: { in: favourites ? favourites.ids : [] } },
  });

  return (
    <FavouritesMain
      searchParams={searchParams ?? {}}
      classifieds={classifieds}
      count={count}
    />
  );
};

export default FavouritesPage;
