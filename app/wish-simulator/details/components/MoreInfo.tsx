import { Banners } from '@/lib/banners';
import CharacterEventWish from '@/app/wish-simulator/details/components/descriptions/CharacterEventWish';
import WeaponEventWish from '@/app/wish-simulator/details/components/descriptions/WeaponEventWish';
import StandardWish from '@/app/wish-simulator/details/components/descriptions/StandardWish';
import { CSSProperties } from 'react';
import { Character, Weapon } from '@/lib/db/schema';
import NoviceWish from '@/app/wish-simulator/details/components/descriptions/NoviceWish';

const getBannerMoreInfo = (
    banner: Banners,
    mainItems: Character[] | Weapon[] | null,
    featuredItems: Character[] | Weapon[] | null
) => {
    switch (banner.type) {
        case 'Character Event Wish':
        case 'Character Event Wish-2':
            return (
                <CharacterEventWish
                    banner={banner}
                    mainCharacter={mainItems as Character[]}
                    featuredItems={featuredItems as Character[]}
                />
            );
        case 'Weapon Event Wish':
            return (
                <WeaponEventWish
                    banner={banner}
                    mainWeapons={mainItems as Weapon[]}
                    featuredWeapons={featuredItems as Weapon[]}
                />
            );
        case 'Standard Wish':
            return <StandardWish />;
        case 'Novice Wish':
            return <NoviceWish />;
    }
};
const MoreInfo = ({
    banner,
    mainItems,
    featuredItems,
    palette,
}: {
    banner: Banners;
    mainItems: Character[] | Weapon[] | null;
    featuredItems: Character[] | Weapon[] | null;
    palette: string;
}) => {
    return (
        <div
            className={
                'absolute overflow-y-scroll genshin-scrollbar w-[81%] h-[76%] top-[16%] left-[10%] pr-2 xs:h-[68%] xs:top-[21%]'
            }
        >
            <p className={'text-[#595252] text-2xl'}>Подробнее о Молитвах</p>
            <div className={'h-8 mt-2 flex justify-center items-center bg-[#6f778a]'}>
                <div
                    className={
                        'flex items-center w-[99.5%] h-[90%] border-2 border-[#757d90] pl-[5%]'
                    }
                >
                    <p className={'text-white text-xl'}>
                        {banner.type === 'Standard Wish'
                            ? 'Нет ограничения по времени'
                            : banner.type === 'Novice Wish'
                              ? 'Нет ограничения по времени (Открыто до 20 молитв)'
                              : 'Временное событие'}
                    </p>
                </div>
            </div>
            <div
                style={{ '--palette': palette } as CSSProperties}
                className={
                    'mt-2 text-[#595252] text-xl/normal sm:mt-4 [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic [&_i]:not-italic'
                }
            >
                {getBannerMoreInfo(banner, mainItems, featuredItems)}
            </div>
        </div>
    );
};
export default MoreInfo;
