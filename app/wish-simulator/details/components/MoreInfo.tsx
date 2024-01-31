import { Banners } from '@/lib/banners';
import CharacterEventWish from '@/app/wish-simulator/details/components/descriptions/CharacterEventWish';
import WeaponEventWish from '@/app/wish-simulator/details/components/descriptions/WeaponEventWish';
import StandardWish from '@/app/wish-simulator/details/components/descriptions/StandardWish';
import { CSSProperties } from 'react';
import { Character, Weapon } from '@/lib/db/schema';

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
                'absolute overflow-y-scroll genshin-scrollbar w-[81%] h-[76%] top-[16%] left-[10%] pr-2 sm:h-[68%] sm:top-[21%]'
            }
        >
            <p className={'text-[#595252] text-[3.5cqw] sm:text-[1.8cqw]'}>
                Подробнее о Молитвах
            </p>
            <div
                className={
                    'h-4 mt-2 flex justify-center items-center bg-[#6f778a] sm:h-[7%]'
                }
            >
                <div
                    className={
                        'flex items-center w-[99.5%] h-[90%] border-2 border-[#757d90] pl-[5%]'
                    }
                >
                    <p className={'text-white text-[3cqw] sm:text-[1.6cqw]'}>
                        {banner.type === 'Standard Wish'
                            ? 'Нет ограничения по времени'
                            : 'Временное событие'}
                    </p>
                </div>
            </div>
            <div
                style={{ '--palette': palette } as CSSProperties}
                className={
                    'mt-2 text-[#595252] text-[3.5cqw] sm:text-[1.6cqw] sm:mt-4 [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic [&_i]:not-italic'
                }
            >
                {getBannerMoreInfo(banner, mainItems, featuredItems)}
            </div>
        </div>
    );
};
export default MoreInfo;
