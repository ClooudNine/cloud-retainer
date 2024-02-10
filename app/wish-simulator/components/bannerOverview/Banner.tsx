'use client';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { bannerDescriptions, Banners, bannerSecondTitle } from '@/lib/banners';
import SwitchBannerArrow from '@/app/wish-simulator/components/bannerOverview/SwitchBannerArrow';
import { currentGameVersion } from '@/lib/constants';
import { getBannerColor, getPreviewUrl } from '@/app/wish-simulator/utils';
import EpitomizedPathButton from '@/app/wish-simulator/components/epitomizedPathSystem/EpitomizedPathButton';
import clsx from 'clsx';
import {
    Character,
    CharacterBanner,
    StandardBanner,
    Weapon,
    WeaponBanner,
} from '@/lib/db/schema';
import StarIcon from '@/app/wish-simulator/components/icons/StarIcon';

const renderCharacterName = (character: Character, offsets: { r: string; b: string }) => {
    return (
        <div
            style={
                {
                    '--right-offset': offsets.r,
                    '--bottom-offset': offsets.b,
                } as CSSProperties
            }
            className={
                'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'
            }
        >
            <p className={'text-3xl text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]'}>
                {character.name}
            </p>
            <p className={'text-sm mt-7 text-[#c2bd96]'}>{character.title}</p>
        </div>
    );
};
const renderWeaponBannerInfo = (
    fiveStarWeapons: Weapon[],
    offset: {
        fiveStar: { r: string; b: string; fontSize: string };
        [key: string]: { r: string; b: string; fontSize: string };
    }
) => {
    const fourStarWeaponText = Object.values(offset)[1];
    return (
        <>
            <div
                style={
                    {
                        '--right-offset': offset.fiveStar.r,
                        '--bottom-offset': offset.fiveStar.b,
                        '--title-size': offset.fiveStar.fontSize,
                    } as CSSProperties
                }
                className={
                    'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'
                }
            >
                {fiveStarWeapons.map((weapon) => (
                    <p
                        key={weapon.title}
                        className={
                            'text-[length:var(--title-size)] text-white leading-tight drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
                        }
                    >
                        {weapon.title}
                    </p>
                ))}
            </div>
            <div
                style={
                    {
                        '--right-offset': fourStarWeaponText.r,
                        '--bottom-offset': fourStarWeaponText.b,
                        '--title-size': fourStarWeaponText.fontSize,
                    } as CSSProperties
                }
                className={
                    'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'
                }
            >
                <p
                    className={
                        'text-white leading-tight text-[length:var(--title-size)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
                    }
                    dangerouslySetInnerHTML={{ __html: Object.keys(offset)[1] }}
                ></p>
            </div>
        </>
    );
};
const renderStandardBannerInfo = (
    titlesOnBanner: string[],
    characters: Character[],
    textParameters: {
        [key: string]: { r: string; b: string; fontSize: string };
    }
) => {
    return (
        <>
            {titlesOnBanner.map((title) => {
                const maybeCharacter = characters.find(
                    (character) => character.name === title
                );
                return (
                    <div
                        key={title}
                        style={
                            {
                                '--right-offset': textParameters[title]['r'],
                                '--bottom-offset': textParameters[title]['b'],
                                '--name-size': textParameters[title]['fontSize'],
                            } as CSSProperties
                        }
                        className={
                            'absolute text-white bottom-[var(--bottom-offset)] right-[var(--right-offset)] text-[length:var(--name-size)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
                        }
                    >
                        {maybeCharacter ? (
                            <>
                                <p>{maybeCharacter.name}</p>
                                <p className={'text-xs mt-3 text-[#c2bd96]'}>
                                    {maybeCharacter.title}
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
    selectedBanner: Banners
) => {
    if ('mainCharacterId' in selectedBanner) {
        if (selectedBanner.type === 'Standard Wish') {
            const titlesOnBanner = Object.keys(selectedBanner.textParameters);
            return renderStandardBannerInfo(
                titlesOnBanner,
                characters,
                (selectedBanner as StandardBanner).textParameters
            );
        }
        const mainCharacter = characters.find(
            (character) =>
                character.id === (selectedBanner as CharacterBanner).mainCharacterId
        ) as Character;
        return renderCharacterName(
            mainCharacter,
            (selectedBanner as CharacterBanner).textParameters
        );
    } else {
        const mainWeaponsId = [
            (selectedBanner as WeaponBanner).firstMainWeaponId,
            (selectedBanner as WeaponBanner).secondMainWeaponId,
        ];
        const mainFiveStarWeapons = mainWeaponsId.map(
            (weaponId) => weapons.find((weapon) => weapon.id === weaponId) as Weapon
        );
        return renderWeaponBannerInfo(
            mainFiveStarWeapons,
            (selectedBanner as WeaponBanner).textParameters
        );
    }
};
const Banner = () => {
    const { characters, weapons, selectedBanner, bannerStats } = useBannerContext();

    const infoContainerClasses = clsx('absolute flex flex-col gap-6', {
        'top-0': selectedBanner.type !== 'Standard Wish',
        'top-10': selectedBanner.type === 'Standard Wish' && currentGameVersion > 1,
    });

    const rulesClasses = clsx('flex items-center gap-1 mt-2', {
        'bg-[rgba(var(--palette),0.8)]': currentGameVersion !== 1,
        'bg-[rgba(65,163,162,0.8)]':
            currentGameVersion === 1 && selectedBanner.type === 'Standard Wish',
        'bg-[rgba(230,98,106,1)]': selectedBanner.type === 'Novice Wish',
    });

    return (
        <>
            <section
                className={
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-1 overflow-hidden flex items-center justify-around xs:max-lg:pl-20'
                }
            >
                <SwitchBannerArrow isForward={false} />
                <div
                    key={selectedBanner.type + '-' + selectedBanner.id}
                    className={'animate-banner-preview-appearance'}
                    style={
                        {
                            '--palette': `${getBannerColor(selectedBanner, characters)}`,
                        } as CSSProperties
                    }
                >
                    <Image
                        src={`/wish-simulator/banners/${getPreviewUrl(
                            selectedBanner
                        )}.webp`}
                        alt={`Картинка баннера ${selectedBanner.title}`}
                        draggable={false}
                        priority={true}
                        width={1200}
                        height={600}
                        quality={100}
                        className={'rounded-xl w-[50rem]'}
                    />
                    <div className={infoContainerClasses}>
                        <div
                            className={
                                'w-max text-sm text-white bg-[rgb(var(--palette))] -ml-1 rounded-l-3xl rounded-br-[3rem] px-6 py-0.5 lg:text-base'
                            }
                        >
                            {selectedBanner.type}
                        </div>
                        <p
                            className={`pl-10 text-[#595957] text-4xl leading-tight [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic`}
                            dangerouslySetInnerHTML={{ __html: selectedBanner.title }}
                        ></p>
                        <div
                            dir={'rtl'}
                            className={
                                'pl-10 w-80 h-44 overflow-y-scroll scrollbar-for-banner'
                            }
                        >
                            <p dir={'ltr'} className={'text-[#595957] text-xl'}>
                                {bannerSecondTitle[selectedBanner.type]}
                            </p>
                            <div dir={'ltr'} className={rulesClasses}>
                                <StarIcon styles={'fill-white w-8 pl-1'} />
                                <p className={'text-white text-sm'}>
                                    Every 10 wishes is guaranteed to include at least one
                                    4-star or higher item.
                                </p>
                            </div>
                            <p
                                dir={'ltr'}
                                className={
                                    'mt-2 text-[#595957] text-sm drop-shadow-[0_0_2px_rgba(255,255,255,1)]'
                                }
                            >
                                {bannerDescriptions[selectedBanner.type]}
                            </p>
                        </div>
                    </div>
                    {renderBannerInfo(characters, weapons, selectedBanner)}
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
