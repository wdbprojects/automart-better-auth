import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/routes";
import { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { setSourceId } from "@/lib/source-id";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data, error } = validateIdSchema.safeParse(body);
  if (!data) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
  if (typeof data.id !== "number") {
    return NextResponse.json({ error: "Invalid id" }, { status: 401 });
  }

  // get the source id from cookies
  const sourceId = await setSourceId();

  // retrieve the existing favourites from redis session
  const storedFavourites = await redis.get<Favourites>(sourceId);
  const favourites: Favourites = storedFavourites || { ids: [] };

  // add or remove the ID based on its current presence in the favourites
  if (favourites.ids.includes(data.id)) {
    // remove the ID if it already exists
    favourites.ids = favourites.ids.filter((favId) => {
      return favId !== data.id;
    });
  } else {
    // add ID if it doesn't exist
    favourites.ids.push(data.id);
  }

  // update the redis store with the new list of IDs
  await redis.set(sourceId, favourites);

  revalidatePath(routes.favourites);

  return NextResponse.json(
    { ids: favourites.ids, success: true },
    { status: 200 },
  );
};
