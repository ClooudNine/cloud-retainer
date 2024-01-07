import { db } from "@/lib/db";
import {
  featuredCharactersInBanners,
  featuredWeaponsInBanners,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  let res = null;
  if (type === "Weapon Event Wish") {
    res = await db
      .select({ id: featuredWeaponsInBanners.weaponId })
      .from(featuredWeaponsInBanners)
      .where(eq(featuredWeaponsInBanners.bannerId, Number(id)));
  } else if (
    type === "Character Event Wish" ||
    type === "Character Event Wish-2"
  ) {
    res = await db
      .select({ id: featuredCharactersInBanners.characterId })
      .from(featuredCharactersInBanners)
      .where(eq(featuredCharactersInBanners.bannerId, Number(id)));
  }

  return Response.json({ res });
}
