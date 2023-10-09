import Footer from "@/app/wish-simulator/components/Footer";
import Header from "@/app/wish-simulator/components/Header";
import Background from "@/app/wish-simulator/components/Background";
import Banner from "@/app/wish-simulator/components/Banner";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {bannerOrder, CharacterBanner, WeaponBanner} from "@/app/types/banner";
import {PostgrestError} from "@supabase/supabase-js";
import BannerProvider from "@/app/wish-simulator/components/banner-provider";
import {Character} from "@/app/types/character";
import {Weapon} from "@/app/types/weapon";

export const metadata = {
    title: 'Genshin World | Симулятор молитв',
    description: `Симулятор молитв из игры Genshin Impact. Который позволяет путешественникам
        совершать молитвы в неограниченном количестве для развлечения и сбора статистики.`
}

type FetchCharactersBannersProps = {
    data: CharacterBanner[] | null,
    error: PostgrestError | null
}

type FetchWeaponsBannersProps = {
    data: WeaponBanner[] | null,
    error: PostgrestError | null
}

type FetchCharactersProps = {
    data: Character[] | null
    error: PostgrestError | null
}

export default async function WishSimulator() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const {data: characterBanners, error: characterBannersError} : FetchCharactersBannersProps = await supabase
        .from("characters_banners")
        .select("*")
        .or("and(version.eq.4,phase.eq.2),and(title.eq.Wanderlust Invocation,rerun_number.eq.2)")

    const {data: weaponBanner, error: weaponBannerError} : FetchWeaponsBannersProps = await supabase
        .from("weapons_banners")
        .select("*")
        .or("and(version.eq.4,phase.eq.2)")

    const charactersIds: number[] = (characterBanners as CharacterBanner[]).map((characterBanner: CharacterBanner): number =>
        characterBanner.main_character !== null ? characterBanner.main_character : 0);

    const weaponsIds = (weaponBanner as WeaponBanner[]).map((weaponBanner) => [weaponBanner.first_main_weapon, weaponBanner.second_main_weapon]).flat();

    const { data: mainCharacters, error: mainCharactersError } : FetchCharactersProps= await supabase
        .from("characters")
        .select("*")
        .in("id", charactersIds)


    const { data: mainWeapons, error: mainWeaponsError } = await supabase
        .from("weapons")
        .select("*")
        .in("id", weaponsIds)

    const banners: (CharacterBanner | WeaponBanner)[] = [...characterBanners as CharacterBanner[], ...weaponBanner as WeaponBanner[]];
    const sortedBanners = banners.sort((a, b) =>
        bannerOrder[a.type] - bannerOrder[b.type]
    );

    const bannersPreviewUrls: string[] = sortedBanners.map((banner) => {
        if('main_character' in banner) {
            return supabase.storage.from('wish banners').getPublicUrl(`${banner.title} ${banner.rerun_number}.png`).data.publicUrl;
        } else {
            return supabase.storage.from('wish banners').getPublicUrl(`${banner.title} ${banner.date}.png`).data.publicUrl;
        }
    });

    const mainCharactersAndWeapons: (Character | Weapon)[] = [...mainCharacters as Character[], ...mainWeapons as Weapon[]];

    const mainCharactersAndWeaponsPortrait: string[] = mainCharactersAndWeapons.map((item) => {
        if('name' in item) {
            return supabase.storage.from('character portraits').getPublicUrl(`${item.name}.png`).data.publicUrl;
        } else {
            return supabase.storage.from('weapons portraits').getPublicUrl(`${item.title}.png`).data.publicUrl;
        }
    });

    return (
        <main className={'w-full h-full cursor-genshin grid grid-rows-[1fr_2.5fr_1fr] md:grid-rows-[1fr_5fr_1fr]'}>
            <Background/>
            <BannerProvider banners={sortedBanners} bannersPreviews={bannersPreviewUrls} bannersPortraits={mainCharactersAndWeaponsPortrait}>
                <Header/>
                <Banner/>
                <Footer/>
            </BannerProvider>
        </main>
    )
}