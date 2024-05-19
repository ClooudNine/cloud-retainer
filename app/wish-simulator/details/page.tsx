import Background from '@/components/wish-simulator/background';
import Image from 'next/image';
import Title from '@/components/wish-simulator/details/title';
import Navigation from '@/components/wish-simulator/details/navigation';
import IncreasedChance from '@/components/wish-simulator/details/increased-chance/Increased-chance';
import { getBannerColor } from '@/lib/wish-simulator';
import MoreInfo from '@/components/wish-simulator/details/more-info/more-info';
import ItemsList from '@/components/wish-simulator/details/items-list/items-list';
import Link from 'next/link';
import { bannerTypesEnum } from '@/lib/db/schema';
import { getBannerByIdAndType } from '@/data/banner';
import WishCrossIcon from '@/components/icons/wish-cross';
import { BannerTypes, Character, Weapon } from '@/lib/types';

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
    if (!bannerTypesEnum.enumValues.includes(searchParams.type) || isNaN(Number(searchParams.id))) {
        return (
            <p className={'w-full h-full flex items-center justify-center text-6xl'}>
                Некорректные параметры запроса!
            </p>
        );
    }

    const banner = await getBannerByIdAndType(searchParams.id, searchParams.type);

    if (!banner) {
        return (
            <p className={'w-full h-full flex items-center justify-center text-9xl'}>Баннер не найден :(</p>
        );
    }

    let mainItems: Character[] | Weapon[] = [];
    let featuredItems: Character[] | Weapon[] = [];

    if ('firstMainWeaponId' in banner) {
        mainItems = [banner.firstMainWeapon, banner.secondMainWeapon];
        featuredItems = banner.featuredWeaponsInBanners.map(({ weapon }) => weapon);
    } else if ('rerunNumber' in banner) {
        mainItems = [banner.character];
        featuredItems = banner.featuredCharactersInBanners.map(({ character }) => character);
    }

    const bannerColor = getBannerColor(banner);

    return (
        <main className={'size-full flex items-center justify-center'}>
            <Background isBlurred={true} />
            <div
                className={
                    'relative flex justify-center items-center h-[85vh] w-[45vh] xs:w-[150vh] xs:h-auto'
                }
            >
                <Image
                    src={'wish-simulator/assets/book-background.webp'}
                    width={1440}
                    height={761}
                    draggable={false}
                    alt={'Детали баннера'}
                    className={
                        'max-w-none w-[85vh] -rotate-90 -scale-y-100 xs:rotate-0 xs:scale-y-100 xs:max-w-full xs:w-[150vh]'
                    }
                />
                <Title title={banner.title} palette={bannerColor} />
                <Link
                    href={'/wish-simulator'}
                    className={'absolute cursor-genshin top-[2.5%] right-[7%] xs:top-[6.2%] xs:right-[2.4%]'}
                >
                    <WishCrossIcon fillColor={'#e9d5af'} />
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
                    <ItemsList banner={banner} mainItems={mainItems} featuredItems={featuredItems} />
                )}
            </div>
        </main>
    );
}
