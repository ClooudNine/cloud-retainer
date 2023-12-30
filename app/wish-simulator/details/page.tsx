import Background from "@/app/wish-simulator/components/Background";
import detailsBook from "@/public/wish-simulator/assets/details-book.webp";
import Image from "next/image";
import Title from "@/app/wish-simulator/details/components/Title";
import Navigation from "@/app/wish-simulator/details/components/Navigation";
import IncreasedChanceSection from "@/app/wish-simulator/details/components/increasedChanceSection/IncreasedChanceSection";
import { getBannerColor } from "@/app/wish-simulator/utils";
import MoreInfo from "@/app/wish-simulator/details/components/MoreInfo";
import ItemsList from "@/app/wish-simulator/details/components/itemsListSection/ItemsList";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  BannerTypes,
  Character,
  CharacterBanner,
  characterBanners,
  featuredCharactersInBanners,
  featuredWeaponsInBanners,
  standardBanners,
  Weapon,
  WeaponBanner,
  weaponBanners,
} from "@/lib/db/schema";
import { Banners } from "@/lib/banners";

export const metadata = {
  title: "Cloud Retainer | Симулятор молитв - Детали",
  description: "Здесь вы можете ознакомиться с подробными деталями баннера",
};
export default async function Details({
  searchParams,
}: {
  searchParams: {
    id: number;
    type: BannerTypes;
    section: string;
  };
}) {
  const bannerTableName = {
    "Character Event Wish": characterBanners,
    "Character Event Wish-2": characterBanners,
    "Novice Wish": characterBanners,
    "Weapon Event Wish": weaponBanners,
    "Standard Wish": standardBanners,
  };

  const bannerTable = bannerTableName[searchParams.type];

  const banner: Banners[] = await db.execute(
    sql`select * from ${bannerTable} where ${bannerTable.id} = ${searchParams.id}`,
  );

  if (banner === null) {
    return (
      <p
        className={
          "w-full h-full flex items-center justify-center font-genshin text-9xl"
        }
      >
        Banner not found :(
      </p>
    );
  }

  const featuredItemsTable =
    searchParams.type === "Weapon Event Wish"
      ? featuredWeaponsInBanners
      : featuredCharactersInBanners;

  const itemsType =
    searchParams.type === "Weapon Event Wish" ? "weapon" : "character";

  const featuredItemsId: { id: number }[] = await db.execute(
    sql`select ${itemsType}_id from ${featuredItemsTable} where ${featuredItemsTable.bannerId} = ${banner[0].id}`,
  );

  const itemsId = featuredItemsId.map((itemId) => itemId.id);

  const featuredItems: (Character | Weapon)[] = await db.execute(
    sql`select * from ${itemsType}s where id in ${itemsId}`,
  );

  const mainItems: (Character | Weapon)[] = await db.execute(
    sql`select * from ${itemsType}s where id in ${
      banner[0].type === "Weapon Event Wish"
        ? [
            (banner[0] as WeaponBanner).firstMainWeaponId,
            (banner[0] as WeaponBanner).secondMainWeaponId,
          ]
        : [(banner[0] as CharacterBanner).mainCharacterId]
    }`,
  );

  const bannerColor = getBannerColor(banner[0], mainItems as Character[]);

  return (
    <main
      className={
        "w-full h-full flex items-center justify-center font-genshin cursor-genshin"
      }
    >
      <Background isBlurred={true} />
      <div className={"relative"}>
        <Image
          src={detailsBook}
          draggable={false}
          quality={100}
          alt={"Детали баннера"}
          className={"w-full md:w-[80vw] h-auto"}
        />
        <Title bannerTitle={banner[0].title} palette={bannerColor} />
        <Link
          href={"/wish-simulator"}
          className={"absolute cursor-genshin top-[6%] right-[2.2%]"}
        >
          <svg
            className={"w-[3.5vw] md:w-[2.8vw]"}
            transform="rotate(45)"
            fill="#000000"
            stroke="#000000"
            strokeWidth=".00016"
            version="1.1"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={"group-active:fill-[#fefeff]"}
              d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
              fill="#e9d5af"
            />
          </svg>
        </Link>
        <Navigation bannerType={searchParams.type} />
        {searchParams.section === "increased-chance" ? (
          <IncreasedChanceSection
            bannerType={searchParams.type}
            mainItems={mainItems}
            featuredItems={featuredItems}
          />
        ) : searchParams.section === "more-info" ? (
          <MoreInfo
            banner={banner[0]}
            mainItems={mainItems}
            featuredItems={featuredItems}
            palette={bannerColor}
          />
        ) : (
          <ItemsList
            banner={banner[0]}
            mainItems={mainItems}
            featuredItems={featuredItems}
          />
        )}
      </div>
    </main>
  );
}
