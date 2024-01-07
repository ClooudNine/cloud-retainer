import Footer from '@/app/wish-simulator/components/footerComponents/Footer';
import Header from '@/app/wish-simulator/components/headerComponents/Header';
import Background from '@/app/wish-simulator/components/Background';
import Banner from '@/app/wish-simulator/components/bannerOverview/Banner';
import BannerProvider from '@/app/wish-simulator/components/BannerProvider';
import {
    CharacterBanner,
    WeaponBanner,
    characterBanners,
    weaponBanners,
    StandardBanner,
    standardBanners,
    Character,
    characters,
    Weapon,
    weapons,
} from '@/lib/db/schema';
import { db } from '@/lib/db';
import { isNotNull } from 'drizzle-orm';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв',
    description:
        'Симулятор молитв из игры Genshin Impact, который позволяет путешественникам совершать молитвы в неограниченном количестве для развлечения и сбора статистики.',
};
export const dynamic = 'force-dynamic';
export default async function WishSimulator() {
    const allCharactersBanners: CharacterBanner[] = await db
        .select()
        .from(characterBanners);

    const allWeaponBanners: WeaponBanner[] = await db.select().from(weaponBanners);

    const allStandardBanners: StandardBanner[] = await db.select().from(standardBanners);

    const charactersFromWishes: Character[] = await db
        .select()
        .from(characters)
        .where(isNotNull(characters.inStandardWish));

    const weaponsFromWishes: Weapon[] = await db
        .select()
        .from(weapons)
        .where(isNotNull(weapons.inStandardWish));

    if (
        allCharactersBanners === null ||
        allWeaponBanners === null ||
        allStandardBanners === null
    ) {
        return (
            <div
                className={
                    'w-full h-full flex justify-center items-center text-9xl font-genshin'
                }
            >
                Banners fetch error!
            </div>
        );
    }

    if (charactersFromWishes === null || weaponsFromWishes === null) {
        return (
            <div
                className={
                    'w-full h-full flex justify-center items-center text-9xl font-genshin'
                }
            >
                Characters or weapons fetch error!
            </div>
        );
    }

    return (
        <main
            className={
                'w-full h-full cursor-genshin grid grid-rows-[1fr_2.5fr_1fr] md:grid-rows-[1fr_5fr_1fr] overflow-hidden'
            }
        >
            <Background isBlurred={false} />
            <BannerProvider
                banners={[
                    ...allCharactersBanners,
                    ...allWeaponBanners,
                    ...allStandardBanners,
                ]}
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
