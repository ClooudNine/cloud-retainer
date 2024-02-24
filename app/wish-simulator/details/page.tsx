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
    bannerTypesEnum,
    Character,
    characters,
    featuredCharactersInBanners,
    featuredWeaponsInBanners,
    Weapon,
    weaponBanners,
    weapons,
} from '@/lib/db/schema';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';
import { getBannerByIdAndType } from '@/data/banner';
import WishCrossIcon from '@/components/icons/wish-cross';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв - Детали',
    description: 'Здесь вы можете ознакомиться с подробными деталями баннера',
};

export default async function Details({
    searchParams,
}: {
    searchParams: {
        id: number;
        type: BannerTypes;
        section: 'increased-chance' | 'more-info' | 'items-list';
    };
}) {
    if (
        !bannerTypesEnum.enumValues.includes(searchParams.type) ||
        isNaN(Number(searchParams.id))
    ) {
        return (
            <p className={'w-full h-full flex items-center justify-center text-6xl'}>
                Некорректные параметры запроса!
            </p>
        );
    }

    const banner = await getBannerByIdAndType(searchParams.id, searchParams.type);

    if (!banner) {
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

            featuredItems = await db
                .select()
                .from(featuredWeaponsInBanners)
                .leftJoin(weapons, eq(featuredWeaponsInBanners.weaponId, weapons.id))
                .leftJoin(
                    weaponBanners,
                    eq(featuredWeaponsInBanners.bannerId, weaponBanners.id)
                )
                .where(eq(weaponBanners.id, banner.id));
        } else {
            mainItems = await db
                .select()
                .from(characters)
                .where(eq(characters.id, banner.mainCharacterId));

            featuredItems = await db
                .select()
                .from(char)
                .join(
                    featuredCharactersInBanners,
                    eq(featuredCharactersInBanners.id, characters.characterId)
                )
                .where(eq(featuredCharactersInBanners.bannerId, banner.id));
        }
    }

    console.log(featuredItems);

    const bannerColor = getBannerColor(banner, mainItems as Character[]);

    return (
        <main className={'w-full h-full flex items-center justify-center'}>
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
                    <WishCrossIcon />
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
