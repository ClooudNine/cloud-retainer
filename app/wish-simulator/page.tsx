import Footer from "@/app/wish-simulator/components/footerComponents/Footer";
import Header from "@/app/wish-simulator/components/headerComponents/Header";
import Background from "@/app/wish-simulator/components/Background";
import Banner from "@/app/wish-simulator/components/bannerOverview/Banner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  CharacterBanner,
  StandardBanner,
  WeaponBanner,
} from "@/app/types/banner";
import BannerProvider from "@/app/wish-simulator/components/BannerProvider";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";

export const metadata = {
  title: "Cloud Retainer | Симулятор молитв",
  description:
    "Симулятор молитв из игры Genshin Impact, который позволяет путешественникам совершать молитвы в неограниченном количестве для развлечения и сбора статистики.",
};
export const dynamic = "force-dynamic";
export default async function WishSimulator() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: allCharacterBanners,
  }: {
    data: CharacterBanner[] | null;
  } = await supabase.from("characters_banners").select("*");

  const {
    data: allWeaponBanners,
  }: {
    data: WeaponBanner[] | null;
  } = await supabase.from("weapons_banners").select("*");

  const {
    data: allStandardBanners,
  }: {
    data: StandardBanner[] | null;
  } = await supabase.from("standard_banners").select("*");

  const {
    data: allCharactersFromWishes,
  }: {
    data: Character[] | null;
  } = await supabase
    .from("characters")
    .select("*")
    .not("in_standard_wish", "is", null);

  const {
    data: allWeaponsFromWishes,
  }: {
    data: Weapon[] | null;
  } = await supabase
    .from("weapons")
    .select("*")
    .not("in_standard_wish", "is", null);

  if (
    allCharacterBanners === null ||
    allWeaponBanners === null ||
    allStandardBanners === null ||
    allCharactersFromWishes === null ||
    allWeaponsFromWishes === null
  ) {
    return (
      <div className={"flex justify-center items-center text-9xl"}>Oops...</div>
    );
  }

  return (
    <main
      className={
        "w-full h-full cursor-genshin grid grid-rows-[1fr_2.5fr_1fr] md:grid-rows-[1fr_5fr_1fr]"
      }
    >
      <Background isBlurred={false} />
      <BannerProvider
        allGameBanners={[
          ...allCharacterBanners,
          ...allWeaponBanners,
          ...allStandardBanners,
        ]}
        characters={allCharactersFromWishes}
        weapons={allWeaponsFromWishes}
      >
        <Header />
        <Banner />
        <Footer />
      </BannerProvider>
    </main>
  );
}
