import { BannerItems, Banners, BannerTypes } from "@/app/types/banner";
import { getBannerDrop } from "@/app/wish-simulator/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { Rares } from "@/app/types/common";
import ItemsTable from "@/app/wish-simulator/details/components/itemsListSection/ItemsTable";
import {PostgrestError} from "@supabase/supabase-js";

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
  mainItems: Character[] | Weapon[] | null;
  featuredItems: Character[] | Weapon[] | null;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: allCharactersFromWishes,
    error: charactersError
  }: {
    data: Character[] | null;
    error: PostgrestError | null
  } = await supabase
    .from("characters")
    .select("*")
    .not("in_standard_wish", "is", null);

  const {
    data: allWeaponsFromWishes,
    error: weaponsError
  }: {
    data: Weapon[] | null;
    error: PostgrestError | null
  } = await supabase
    .from("weapons")
    .select("*")
    .not("in_standard_wish", "is", null);

  if (allCharactersFromWishes === null || allWeaponsFromWishes === null) {
    return <p>Data miss :(</p>;
  }

  if(charactersError || weaponsError) {
    console.log(charactersError, weaponsError)
  }

  const bannerItems = getBannerDrop(
    banner,
    allCharactersFromWishes,
    allWeaponsFromWishes,
    featuredItems?.map((item) => item.id),
  );

  const fiveStarItems = getItemsByRarity(
    banner.type,
    bannerItems,
    5,
    mainItems,
  );
  const fourStarItems = getItemsByRarity(
    banner.type,
    bannerItems,
    4,
    featuredItems,
  );
  const threeStarItems = getItemsByRarity(banner.type, bannerItems, 3);

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
        rare={5}
        items={fiveStarItems}
        mainItems={mainItems}
        bannerType={banner.type}
      />
      <ItemsTable
        rare={4}
        items={fourStarItems}
        mainItems={featuredItems}
        bannerType={banner.type}
      />
      <ItemsTable rare={3} items={threeStarItems} bannerType={banner.type} />
    </div>
  );
};

export default ItemsList;
