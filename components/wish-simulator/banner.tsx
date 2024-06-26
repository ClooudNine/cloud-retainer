'use client';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';
import Image from 'next/image';
import { CSSProperties } from 'react';
import SwitchBannerArrow from '@/components/wish-simulator/switch-banner-arrow';
import { currentGameVersion } from '@/lib/constants';
import { getBannerColor, getPreviewUrl } from '@/lib/wish-simulator';
import EpitomizedPathButton from '@/components/wish-simulator/epitomized-path-button';
import clsx from 'clsx';
import StarIcon from '@/components/icons/star';
import {
    Banners,
    Character,
    CharacterBanner,
    EpitomizedPath,
    StandardBanner,
    Weapon,
    WeaponBanner,
} from '@/lib/types';
import { useTranslations } from 'next-intl';
import striptags from 'striptags';

const renderCharacterName = (banner: CharacterBanner, t: any) => {
    return (
        <div
            style={
                {
                    '--right-offset': banner.textParameters.r,
                    '--bottom-offset': banner.textParameters.b,
                } as CSSProperties
            }
            className={'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'}
        >
            <p className={'text-3xl text-white drop-shadow-[0_0_2px_#000000]'}>
                {t(`characters.${banner.character.name}.name`)}
            </p>
            <p className={'text-sm mt-7 text-[#c2bd96]'}>{t(`characters.${banner.character.name}.title`)}</p>
        </div>
    );
};

const renderWeaponBannerInfo = (banner: WeaponBanner, epitomizedWeapon: Weapon | null, t: any) => {
    const bannerTextParameters = Object.entries(banner.textParameters);

    return (
        <>
            <div
                style={
                    {
                        '--right-offset': bannerTextParameters[0][1].r,
                        '--bottom-offset': bannerTextParameters[0][1].b,
                        '--title-size': bannerTextParameters[0][1].fontSize,
                    } as CSSProperties
                }
                className={'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'}
            >
                {[banner.firstMainWeapon, banner.secondMainWeapon].map((weapon) => (
                    <p
                        key={weapon.title}
                        className={
                            'text-white text-[length:var(--title-size)] leading-tight drop-shadow-[0_0_2px_#000000]'
                        }
                    >
                        {t(`weapons.${weapon.title}.title`)}
                    </p>
                ))}
                {epitomizedWeapon && (
                    <p
                        className={
                            'absolute text-sm px-2 mt-[9%] -ml-[6%] bg-[#687c9c]/90 text-[#e4f4ff] whitespace-nowrap'
                        }
                    >
                        Текущий курс установлен на:
                        <br />
                        {t(`weapons.${epitomizedWeapon.title}.title`)}
                    </p>
                )}
            </div>
            <div
                style={
                    {
                        '--right-offset': bannerTextParameters[1][1].r,
                        '--bottom-offset': bannerTextParameters[1][1].b,
                        '--title-size': bannerTextParameters[1][1].fontSize,
                    } as CSSProperties
                }
                className={'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'}
            >
                <p
                    className={
                        'text-white text-[length:var(--title-size)] leading-tight drop-shadow-[0_0_2px_#000000]'
                    }
                    dangerouslySetInnerHTML={{ __html: bannerTextParameters[1][0] }}
                />
            </div>
        </>
    );
};

const renderStandardBannerInfo = (banner: StandardBanner, characters: Character[], t: any) => {
    return (
        <>
            {Object.keys(banner.textParameters).map((title) => {
                const maybeCharacter = characters.find((character) => character.name === title);

                return (
                    <div
                        key={title}
                        style={
                            {
                                '--right-offset': banner.textParameters[title]['r'],
                                '--bottom-offset': banner.textParameters[title]['b'],
                                '--name-size': banner.textParameters[title]['fontSize'],
                            } as CSSProperties
                        }
                        className={
                            'absolute text-white bottom-[var(--bottom-offset)] right-[var(--right-offset)] text-[length:var(--name-size)] drop-shadow-[0_0_2px_#000000]'
                        }
                    >
                        {maybeCharacter ? (
                            <>
                                <p>{t(`characters.${[maybeCharacter.name]}.name`)}</p>
                                <p className={'text-xs mt-3 text-[#c2bd96]'}>
                                    {t(`characters.${[maybeCharacter.name]}.title`)}
                                </p>
                            </>
                        ) : (
                            <pre className={'font-genshin leading-tight'}>{title}</pre>
                        )}
                    </div>
                );
            })}
        </>
    );
};

const renderBannerInfo = (
    characters: Character[],
    weapons: Weapon[],
    selectedBanner: Banners,
    epitomizedPath: EpitomizedPath,
    t: any
) => {
    if ('mainCharacterId' in selectedBanner) {
        if (selectedBanner.type === 'Standard Wish')
            return renderStandardBannerInfo(selectedBanner as StandardBanner, characters, t);

        return renderCharacterName(selectedBanner as CharacterBanner, t);
    } else {
        let epitomizedWeapon = null;
        if (epitomizedPath[selectedBanner.id]) {
            epitomizedWeapon = weapons.find(
                (weapon) => weapon.id === epitomizedPath[selectedBanner.id].weaponId
            ) as Weapon;
        }
        return renderWeaponBannerInfo(selectedBanner as WeaponBanner, epitomizedWeapon, t);
    }
};

const Banner = () => {
    const t = useTranslations();
    const { characters, weapons, selectedBanner, bannerStats, epitomizedPath } = useBannerContext();

    const infoContainerClasses = clsx('relative animate-banner-preview-appearance w-[50rem] h-[27rem]', {
        'pt-0': selectedBanner.type !== 'Standard Wish',
        'pt-10': selectedBanner.type === 'Standard Wish' && currentGameVersion > 1,
    });

    const rulesClasses = clsx('flex items-center gap-1 mt-2', {
        'bg-[rgba(var(--palette),0.8)]': currentGameVersion !== 1,
        'bg-[rgba(65,163,162,0.8)]': currentGameVersion === 1 && selectedBanner.type === 'Standard Wish',
        'bg-[rgba(230,98,106,1)]': selectedBanner.type === 'Novice Wish',
    });

    return (
        <>
            <section
                className={
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-1 overflow-hidden flex items-center justify-around xs:max-lg:pointer-events-none xs:max-lg:pl-20'
                }
            >
                <SwitchBannerArrow isForward={false} />
                <div
                    key={selectedBanner.type + '-' + selectedBanner.id}
                    className={infoContainerClasses}
                    style={
                        {
                            '--palette': `${getBannerColor(selectedBanner)}`,
                        } as CSSProperties
                    }
                >
                    <Image
                        src={`wish-simulator/banners/${getPreviewUrl(selectedBanner)}.webp`}
                        alt={striptags(t.raw(`wish-simulator.banners.${selectedBanner.title}`))}
                        draggable={false}
                        priority={true}
                        fill
                        className={'-z-10 rounded-xl'}
                    />
                    <p
                        className={
                            'w-fit text-sm text-white bg-[rgb(var(--palette))] -ml-1 rounded-l-3xl rounded-br-[3rem] px-6 py-0.5 lg:text-base'
                        }
                    >
                        {t(`wish-simulator.banner-types.${selectedBanner.type}`)}
                    </p>
                    <p
                        className={`pl-10 text-[#595957] text-4xl/tight [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic`}
                        dangerouslySetInnerHTML={{
                            __html: t.raw(`wish-simulator.banners.${selectedBanner.title}`),
                        }}
                    />
                    <div
                        dir={'rtl'}
                        className={
                            'absolute left-0 bottom-[20%] pl-10 w-80 h-44 overflow-y-scroll scrollbar-for-banner'
                        }
                    >
                        <p dir={'ltr'} className={'text-[#595957] text-xl'}>
                            {t(`wish-simulator.banner-second-titles.${selectedBanner.type}`)}
                        </p>
                        <div dir={'ltr'} className={rulesClasses}>
                            <StarIcon styles={'fill-white w-8 pl-1'} />
                            <p className={'text-white text-sm'}>{t('wish-simulator.guarantee')}</p>
                        </div>
                        <p
                            dir={'ltr'}
                            className={'mt-2 text-[#595957] text-sm drop-shadow-[0_0_2px_#ffffff]'}
                        >
                            {t(`wish-simulator.banner-descriptions.${selectedBanner.type}`)}
                        </p>
                    </div>
                    {renderBannerInfo(characters, weapons, selectedBanner, epitomizedPath, t)}
                    {selectedBanner.type === 'Novice Wish' && (
                        <p className={'absolute text-[#d8d4d3] right-[5%] bottom-[7%]'}>
                            Попыток: {20 - bannerStats.NoviceWish.history.length}
                            /20
                        </p>
                    )}
                </div>
                <SwitchBannerArrow isForward={true} />
            </section>
            {selectedBanner.type === 'Weapon Event Wish' && <EpitomizedPathButton />}
        </>
    );
};
export default Banner;
