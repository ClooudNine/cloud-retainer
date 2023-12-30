import { BannerItems, Banners } from "@/lib/banners";
import { getBannerDrop } from "@/app/wish-simulator/utils";
import ItemsTable from "@/app/wish-simulator/details/components/itemsListSection/ItemsTable";
import {
  BannerTypes,
  Character,
  characters,
  Rares,
  Weapon,
  weapons,
} from "@/lib/db/schema";
import { db } from "@/lib/db";
import { isNotNull } from "drizzle-orm";

const getItemsByRarity = (
  bannerType: BannerTypes,
  bannerItems: BannerItems,
  rare: Rares,
  itemsToMove?: Character[] | Weapon[] | null,
) => {
  let itemsByRarity = bannerItems.filter((item) => item.rare === rare);
  if (itemsToMove) {
    let movedItems: (Character | Weapon)[] = [];
    let remainingItems: (Character | Weapon)[] = [];
    const itemsToMoveId = itemsToMove.map((item) => item.id);
    itemsByRarity.forEach((item) => {
      const isTypeCheck =
        bannerType !== "Weapon Event Wish" ? "name" in item : "type" in item;
      if (itemsToMoveId.includes(item.id) && isTypeCheck) {
        movedItems.push(item);
      } else {
        remainingItems.push(item);
      }
    });
    itemsByRarity = movedItems.concat(remainingItems);
  }
  return itemsByRarity;
};
export const dynamic = "force-dynamic";
const ItemsList = async ({
  banner,
  mainItems,
  featuredItems,
}: {
  banner: Banners;
  mainItems: (Character | Weapon)[] | null;
  featuredItems: (Character | Weapon)[] | null;
}) => {
  const charactersFromWishes: Character[] = await db
    .select()
    .from(characters)
    .where(isNotNull(characters.inStandardWish));

  const weaponsFromWishes: Weapon[] = await db
    .select()
    .from(weapons)
    .where(isNotNull(weapons.inStandardWish));

  if (charactersFromWishes === null || weaponsFromWishes === null) {
    return <p>Data miss :(</p>;
  }

  const bannerItems = getBannerDrop(
    banner,
    charactersFromWishes,
    weaponsFromWishes,
    featuredItems?.map((item) => item.id),
  );

  const fiveStarItems = getItemsByRarity(
    banner.type,
    bannerItems,
    "5",
    mainItems,
  );
  const fourStarItems = getItemsByRarity(
    banner.type,
    bannerItems,
    "4",
    featuredItems,
  );
  const threeStarItems = getItemsByRarity(banner.type, bannerItems, "3");

  return (
    <div
      className={
        "absolute overflow-y-scroll genshin-scrollbar w-[81%] h-[60%] md:h-[68%] top-[30%] md:top-[22%] left-[10%] pr-2"
      }
    >
      <p className={"text-[#595252] text-[2vw] md:text-[1.3vw]"}>
        Список предметов, доступных для получения с помощью Молитвы:
      </p>
      <ItemsTable
        rare={"5"}
        items={fiveStarItems}
        mainItems={mainItems}
        bannerType={banner.type}
      />
      <ItemsTable
        rare={"4"}
        items={fourStarItems}
        mainItems={featuredItems}
        bannerType={banner.type}
      />
      <ItemsTable rare={"3"} items={threeStarItems} bannerType={banner.type} />
    </div>
  );
};

export default ItemsList;
