import Background from '@/app/wish-simulator/components/Background';
import bookBackground from '@/public/wish-simulator/assets/book-background.webp';
import Image from 'next/image';
import Title from '@/app/wish-simulator/details/components/Title';
import Navigation from '@/app/wish-simulator/details/components/Navigation';
import IncreasedChance from '@/app/wish-simulator/details/components/increasedChanceSection/IncreasedChance';
import { getBannerColor } from '@/app/wish-simulator/utils';
import MoreInfo from '@/app/wish-simulator/details/components/MoreInfo';
import ItemsList from '@/app/wish-simulator/details/components/itemsListSection/ItemsList';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
    BannerTypes,
    Character,
    characterBanners,
    characters,
    featuredCharactersInBanners,
    featuredWeaponsInBanners,
    standardBanners,
    Weapon,
    weaponBanners,
    weapons,
} from '@/lib/db/schema';
import { Banners } from '@/lib/banners';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв - Детали',
    description: 'Здесь вы можете ознакомиться с подробными деталями баннера',
};

export type DetailsSections = 'increased-chance' | 'more-info' | 'items-list';

export default async function Details({
    searchParams,
}: {
    searchParams: {
        id: number;
        type: BannerTypes;
        section: DetailsSections;
    };
}) {
    const bannerTableName = {
        'Character Event Wish': characterBanners,
        'Character Event Wish-2': characterBanners,
        'Novice Wish': characterBanners,
        'Weapon Event Wish': weaponBanners,
        'Standard Wish': standardBanners,
    };

    if (
        bannerTableName[searchParams.type] === undefined ||
        isNaN(Number(searchParams.id))
    ) {
        return (
            <p
                className={
                    'w-full h-full flex items-center justify-center font-genshin text-6xl'
                }
            >
                Некорректные параметры запроса!
            </p>
        );
    }

    const maybeBanner = await db
        .select()
        .from(bannerTableName[searchParams.type])
        .where(eq(bannerTableName[searchParams.type].id, searchParams.id));

    const banner = maybeBanner[0] as Banners;

    if (banner === undefined) {
        return (
            <p
                className={
                    'w-full h-full flex items-center justify-center font-genshin text-9xl'
                }
            >
                Баннер не найден :(
            </p>
        );
    }

    let mainItems: Character[] | Weapon[] | null = null;
    let featuredItems: Character[] | Weapon[] | null = null;

    if (banner.type !== 'Standard Wish' && banner.type !== 'Novice Wish') {
        if ('firstMainWeaponId' in banner) {
            mainItems = await db
                .select()
                .from(weapons)
                .where(
                    inArray(weapons.id, [
                        banner.firstMainWeaponId,
                        banner.secondMainWeaponId,
                    ])
                );

            const featuredWeaponsId = await db
                .select({ id: featuredWeaponsInBanners.weaponId })
                .from(featuredWeaponsInBanners)
                .where(eq(featuredWeaponsInBanners.bannerId, banner.id));

            featuredItems = await db
                .select()
                .from(weapons)
                .where(
                    inArray(
                        weapons.id,
                        featuredWeaponsId.map((weaponId) => weaponId.id)
                    )
                );
        } else {
            mainItems = await db
                .select()
                .from(characters)
                .where(eq(characters.id, banner.mainCharacterId));
            const featuredCharactersId = await db
                .select({ id: featuredCharactersInBanners.characterId })
                .from(featuredCharactersInBanners)
                .where(eq(featuredCharactersInBanners.bannerId, banner.id));

            featuredItems = await db
                .select()
                .from(characters)
                .where(
                    inArray(
                        characters.id,
                        featuredCharactersId.map((characterId) => characterId.id)
                    )
                );
        }
    }

    const bannerColor = getBannerColor(banner, mainItems as Character[]);

    return (
        <main
            className={
                'w-full h-full flex items-center justify-center font-genshin cursor-genshin'
            }
        >
            <Background isBlurred={true} />
            <div
                className={
                    'relative flex justify-center items-center h-[85vh] w-[45vh] xs:w-[150vh] xs:h-auto'
                }
            >
                <Image
                    src={bookBackground}
                    draggable={false}
                    quality={100}
                    alt={'Детали баннера'}
                    className={
                        'max-w-none w-[85vh] -rotate-90 -scale-y-100 xs:rotate-0 xs:scale-y-100 xs:max-w-full xs:w-[150vh]'
                    }
                />
                <Title title={banner.title} palette={bannerColor} />
                <Link
                    href={'/wish-simulator'}
                    className={
                        'absolute cursor-genshin top-[2.5%] right-[7%] xs:top-[6.2%] xs:right-[2.4%]'
                    }
                >
                    <svg
                        className={'w-9'}
                        transform="rotate(45)"
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth=".00016"
                        version="1.1"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
                            fill="#e9d5af"
                        />
                    </svg>
                </Link>
                <Navigation bannerType={searchParams.type} />
                {searchParams.section === 'increased-chance' ? (
                    <IncreasedChance
                        bannerType={searchParams.type}
                        mainItems={mainItems}
                        featuredItems={featuredItems}
                    />
                ) : searchParams.section === 'more-info' ? (
                    <MoreInfo
                        banner={banner}
                        mainItems={mainItems}
                        featuredItems={featuredItems}
                        palette={bannerColor}
                    />
                ) : (
                    <ItemsList
                        banner={banner}
                        mainItems={mainItems}
                        featuredItems={featuredItems}
                    />
                )}
            </div>
        </main>
    );
}
