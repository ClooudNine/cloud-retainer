import Background from '@/app/wish-simulator/components/Background';
import Banner from '@/app/wish-simulator/components/bannerOverview/Banner';
import BannerProvider from '@/app/wish-simulator/BannerProvider';
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
import Title from '@/app/wish-simulator/components/headerComponents/Title';
import BannerList from '@/app/wish-simulator/components/headerComponents/BannerList';
import CurrentBalance from '@/app/wish-simulator/components/headerComponents/CurrentBalance';
import MasterlessCurrency from '@/app/wish-simulator/components/footerComponents/MasterlessCurrency';
import Links from '@/app/wish-simulator/components/footerComponents/Links';
import WishButton from '@/app/wish-simulator/components/footerComponents/WishButton';

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
                'w-full h-full cursor-genshin font-genshin flex flex-col justify-between overflow-hidden'
            }
        >
            <Background isBlurred={false} />
            <Title />
            <BannerProvider
                banners={[
                    ...allCharactersBanners,
                    ...allWeaponBanners,
                    ...allStandardBanners,
                ]}
                characters={charactersFromWishes}
                weapons={weaponsFromWishes}
            >
                <BannerList />
                <CurrentBalance />
                <Banner />
                <MasterlessCurrency />
                <div
                    className={
                        'z-10 absolute w-full bottom-4 px-2 flex justify-between items-end gap-3 xs:max-lg:pl-32 xs:px-16'
                    }
                >
                    <Links />
                    <div
                        className={
                            'flex justify-end flex-col gap-3 xs:max-lg:flex-wrap xs:flex-row'
                        }
                    >
                        <WishButton count={1} />
                        <WishButton count={10} />
                    </div>
                </div>
            </BannerProvider>
        </main>
    );
}
