import CharacterEventWish from '@/components/wish-simulator/details/more-info/character-event-wish';
import WeaponEventWish from '@/components/wish-simulator/details/more-info/weapon-event-wish';
import StandardWish from '@/components/wish-simulator/details/more-info/standard-wish';
import { CSSProperties } from 'react';
import NoviceWish from '@/components/wish-simulator/details/more-info/novice-wish';
import { Banners, Character, Weapon } from '@/lib/types';
import { useTranslations } from 'next-intl';

const MoreInfo = ({
    banner,
    mainItems,
    featuredItems,
    palette,
}: {
    banner: Banners;
    mainItems: Character[] | Weapon[];
    featuredItems: Character[] | Weapon[];
    palette: string;
}) => {
    const t = useTranslations('wish-simulator');

    return (
        <div
            className={
                'absolute overflow-y-scroll genshin-scrollbar w-[81%] h-[76%] top-[16%] left-[10%] pr-2 xs:h-[68%] xs:top-[21%]'
            }
        >
            <p className={'text-[#595252] text-2xl'}>{t('more-about-wishes')}</p>
            <div className={'h-8 mt-2 flex justify-center items-center bg-[#6f778a]'}>
                <div className={'flex items-center w-[99.5%] h-[90%] border-2 border-[#757d90] pl-[5%]'}>
                    <p className={'text-white text-xl'}>
                        {banner.type === 'Standard Wish'
                            ? t('no-limit')
                            : banner.type === 'Novice Wish'
                              ? t('no-limit-wishes')
                              : t('temporary-event')}
                    </p>
                </div>
            </div>
            <div
                style={{ '--palette': palette } as CSSProperties}
                className={
                    'mt-2 text-[#595252] text-xl/normal sm:mt-4 [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic [&_i]:not-italic lg:text-lg/normal'
                }
            >
                {banner.type === 'Character Event Wish' || banner.type === 'Character Event Wish-2' ? (
                    <CharacterEventWish
                        banner={banner}
                        mainCharacter={mainItems as Character[]}
                        featuredItems={featuredItems as Character[]}
                    />
                ) : banner.type === 'Weapon Event Wish' ? (
                    <WeaponEventWish
                        banner={banner}
                        mainWeapons={mainItems as Weapon[]}
                        featuredWeapons={featuredItems as Weapon[]}
                    />
                ) : banner.type === 'Standard Wish' ? (
                    <StandardWish />
                ) : (
                    <NoviceWish />
                )}
            </div>
        </div>
    );
};
export default MoreInfo;
