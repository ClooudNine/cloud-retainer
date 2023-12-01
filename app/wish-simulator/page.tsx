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
} from "@/app/lib/banner";
import BannerProvider from "@/app/wish-simulator/components/BannerProvider";
import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";
import { PostgrestError } from "@supabase/supabase-js";

export const metadata = {
  title: "Cloud Retainer | Симулятор молитв",
  description:
    "Симулятор молитв из игры Genshin Impact, который позволяет путешественникам совершать молитвы в неограниченном количестве для развлечения и сбора статистики.",
};
export const dynamic = "force-dynamic";
export default async function WishSimulator() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: characterBanners,
    error: charactersBannersError,
  }: {
    data: CharacterBanner[] | null;
    error: PostgrestError | null;
  } = await supabase.from("characters_banners").select("*");

  const {
    data: weaponBanners,
    error: weaponsBannersError,
  }: {
    data: WeaponBanner[] | null;
    error: PostgrestError | null;
  } = await supabase.from("weapons_banners").select("*");

  const {
    data: standardBanners,
    error: standardBannersError,
  }: {
    data: StandardBanner[] | null;
    error: PostgrestError | null;
  } = await supabase.from("standard_banners").select("*");

  const {
    data: charactersFromWishes,
    error: charactersError,
  }: {
    data: Character[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from("characters")
    .select("*")
    .not("in_standard_wish", "is", null);

  const {
    data: weaponsFromWishes,
    error: weaponsError,
  }: {
    data: Weapon[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from("weapons")
    .select("*")
    .not("in_standard_wish", "is", null);

  if (
    characterBanners === null ||
    weaponBanners === null ||
    standardBanners === null ||
    charactersFromWishes === null ||
    weaponsFromWishes === null
  ) {
    return (
      <div
        className={
          "w-full h-full flex justify-center items-center text-9xl font-genshin"
        }
      >
        Banners not found...
      </div>
    );
  }

  if (
    charactersBannersError ||
    weaponsBannersError ||
    standardBannersError ||
    charactersError ||
    weaponsError
  ) {
    return (
      <div
        className={
          "w-full h-full flex justify-center items-center text-9xl font-genshin"
        }
      >
        Banners fetch error!
      </div>
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
        banners={[...characterBanners, ...weaponBanners, ...standardBanners]}
        characters={charactersFromWishes}
        weapons={weaponsFromWishes}
      >
        <Header />
        <Banner />
        <Footer />
      </BannerProvider>
    </main>
  );
}
