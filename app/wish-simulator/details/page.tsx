import Background from "@/app/wish-simulator/components/Background";
import detailsBook from "@/public/wish-simulator/assets/details-book.webp";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BannerPhases, Banners, BannerTypes } from "@/app/types/banner";
import { Versions } from "@/app/types/common";
import Title from "@/app/wish-simulator/details/components/Title";
import Navigation from "@/app/wish-simulator/details/components/Navigation";
import IncreasedChanceSection from "@/app/wish-simulator/details/components/increasedChanceSection/IncreasedChanceSection";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { getBannerColor } from "@/app/wish-simulator/utils";
import MoreInfo from "@/app/wish-simulator/details/components/MoreInfo";
import ItemsList from "@/app/wish-simulator/details/components/ItemsList";
import Link from "next/link";

export const metadata = {
  title: "Cloud Retainer | Симулятор молитв - Детали",
  description: "Здесь вы можете ознакомиться с подробными деталями баннера",
};
export const dynamic = "force-dynamic";
export default async function Details({
  searchParams,
}: {
  searchParams: {
    title: string;
    type: BannerTypes;
    version: Versions;
    phase: BannerPhases;
    section: string;
  };
}) {
  const supabase = createServerComponentClient({ cookies });
  const bannerTableName: { [key in BannerTypes]: string } = {
    "Character Event Wish": "characters_banners",
    "Character Event Wish-2": "characters_banners",
    "Novice Wish": "character_banners",
    "Weapon Event Wish": "weapons_banners",
    "Standard Wish": "standard_banners",
  };
  const itemsType =
    searchParams.type === "Weapon Event Wish" ? "weapon" : "character";
  const { data: banner }: { data: Banners | null } = await supabase
    .from(bannerTableName[searchParams.type])
    .select("*")
    .eq("title", searchParams.title)
    .eq("version", searchParams.version)
    .eq(
      searchParams.type === "Standard Wish" ? "type" : "phase",
      searchParams.type === "Standard Wish"
        ? "Standard Wish"
        : searchParams.phase,
    )
    .single();
  if (banner === null) {
    return <p>Not found :(</p>;
  }
  const {
    data: featuredItemsId,
  }: { data: ({ weapon_id: number } | { character_id: number })[] | null } =
    await supabase
      .from(`featured_${itemsType}s_in_banners`)
      .select(`${itemsType}_id`)
      .eq("banner_id", banner?.id);

  const itemsId = featuredItemsId
    ?.map((itemId) => Object.values(itemId))
    .flat(1) as number[];
  const {
    data: featuredItems,
  }: {
    data: Character[] | Weapon[] | null;
  } = await supabase.from(`${itemsType}s`).select("*").in("id", itemsId);

  const {
    data: bannerMainItems,
  }: {
    data: Character[] | Weapon[] | null;
  } = await supabase
    .from(banner?.type === "Weapon Event Wish" ? "weapons" : "characters")
    .select("*")
    .in(
      "id",
      banner?.type === "Weapon Event Wish"
        ? [banner.first_main_weapon, banner.second_main_weapon]
        : [banner?.main_character],
    );
  const bannerColor = getBannerColor(banner, bannerMainItems as Character[]);
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
        <Title bannerTitle={banner.title} palette={bannerColor} />
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
            mainItems={bannerMainItems}
            featuredItems={featuredItems}
          />
        ) : searchParams.section === "more-info" ? (
          <MoreInfo
            banner={banner}
            mainItems={bannerMainItems}
            featuredItems={featuredItems}
            palette={bannerColor}
          />
        ) : (
          <ItemsList
            banner={banner}
            mainItems={bannerMainItems}
            featuredItems={featuredItems}
          />
        )}
      </div>
    </main>
  );
}
