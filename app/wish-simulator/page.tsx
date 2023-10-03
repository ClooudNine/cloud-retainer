import WishSimulatorFooter from "@/app/wish-simulator/components/WishSimulatorFooter";
import WishSimulatorHeader from "@/app/wish-simulator/components/WishSimulatorHeader";
import WishSimulatorBackground from "@/app/wish-simulator/components/WishSimulatorBackground";
import WishSimulatorBanner from "@/app/wish-simulator/components/WishSimulatorBanner";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {CharacterBanner, WeaponBanner} from "@/app/types/banner";
import {PostgrestError} from "@supabase/supabase-js";
export const metadata = {
    title: 'Genshin World | Симулятор молитв',
    description: `Симулятор молитв из игры Genshin Impact. Который позволяет путешественникам
        совершать молитвы в неограниченном количестве для развлечения и сбора статистики.`
}

export default async function WishSimulator() {
    const supabase = createServerComponentClient({cookies});

    const { data: characterBanners, error: characterBannersError}:
        {data: CharacterBanner[] | null, error: PostgrestError | null} = await supabase
        .from("characters_banners")
        .select("*")
        .or("and(version.eq.4,phase.eq.2),title.eq.Wanderlust Invocation 2")

    const { data: weaponBanner, error: weaponBannerError}:
        {data: WeaponBanner[] | null, error: PostgrestError | null} = await supabase
        .from("weapons_banners")
        .select("*")
        .or("and(version.eq.4,phase.eq.2)")

    const banners: (CharacterBanner | WeaponBanner)[] = [...characterBanners as CharacterBanner[], ...weaponBanner as WeaponBanner[]];
    console.log(banners);
    return (
        <main className={'w-full h-full cursor-genshin grid grid-rows-[1fr_2.5fr_1fr] md:grid-rows-[1fr_5fr_1fr]'}>
            <WishSimulatorBackground/>
            <WishSimulatorHeader/>
            <WishSimulatorBanner/>
            <WishSimulatorFooter/>
        </main>
    )
}