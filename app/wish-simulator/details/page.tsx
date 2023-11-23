import Background from "@/app/wish-simulator/components/Background";
import detailsBook from "@/public/wish-simulator/assets/details-book.webp";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BannerPhases, Banners, BannerTypes } from "@/app/types/banner";
import { Versions } from "@/app/types/common";
import Title from "@/app/wish-simulator/details/components/Title";
import Navigation from "@/app/wish-simulator/details/components/Navigation";
import IncreasedChanceSection from "@/app/wish-simulator/details/components/IncreasedChanceSection";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";

export const metadata = {
  title: "Cloud Retainer | Симулятор молитв - Детали",
  description: "Здесь вы можете ознакомиться с подробными деталями баннера",
};
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
  const { data: banner }: { data: Banners | null } = await supabase
    .from(bannerTableName[searchParams.type])
    .select("*")
    .eq("title", searchParams.title)
    .eq("version", searchParams.version)
    .eq("phase", searchParams.phase)
    .single();

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

  if (banner === null) {
    return <p>Not found :(</p>;
  }

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
        <Title bannerTitle={banner.title} palette={banner.color_palette} />
        <Navigation />
        {searchParams.section === "increased-chance" ? (
          <IncreasedChanceSection
            bannerType={searchParams.type}
            mainItems={bannerMainItems}
          />
        ) : searchParams.section === "more-info" ? (
          ""
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
