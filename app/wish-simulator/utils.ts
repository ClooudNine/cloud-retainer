import { bannerOrder, Banners } from '@/lib/banners';
import { basedCharacters, currentGameVersion, elementToColor } from '@/lib/common';
import striptags from 'striptags';
import {
    BannerTypes,
    Character,
    CharacterBanner,
    Phases,
    Weapon,
    WeaponBanner,
} from '@/lib/db/schema';

const getCharacterPortraitUrl = (characters: Character[], characterId: number) => {
    const character = characters.find((character) => character.id === characterId);
    if (character) {
        return `/characters/portraits/${character.name}.webp`;
    }
    return '';
};
const getWeaponPortraitUrl = (weapons: Weapon[], weaponId: number) => {
    const weapon = weapons.find((weapon) => weapon.id === weaponId);
    if (weapon) {
        return `/weapons/portraits/${weapon.title}.webp`;
    }
    return '';
};
export const getButtonPortraitUrl = (
    banner: Banners,
    characters: Character[],
    weapons: Weapon[]
): string[] => {
    if ('firstMainWeaponId' in banner) {
        const mainWeaponsId = [banner.firstMainWeaponId, banner.secondMainWeaponId];
        return mainWeaponsId.map((weaponId) => getWeaponPortraitUrl(weapons, weaponId));
    } else {
        return [getCharacterPortraitUrl(characters, banner.mainCharacterId)];
    }
};
export const getPreviewUrl = (banner: Banners): string => {
    const bannerTitle = striptags(banner.title);
    if ('rerunNumber' in banner) {
        return `${bannerTitle} ${banner.rerunNumber}`;
    } else if ('firstMainWeaponId' in banner) {
        return `${bannerTitle} ${banner.version} ${banner.phase}`;
    } else {
        return `${bannerTitle} ${banner.previewVersion}`;
    }
};
export const getBannersSet = (
    banners: Banners[],
    version: number,
    phase: Phases
): Banners[] => {
    let standardBanner = null;
    let bannersByVersion = banners.filter((banner) => {
        if ('previewVersion' in banner) {
            if (banner.version <= currentGameVersion) standardBanner = banner;
        } else {
            return banner.version === version && banner.phase === phase;
        }
    });
    if (standardBanner) bannersByVersion.push(standardBanner);
    return bannersByVersion.sort(
        (firstBanner, secondBanner) =>
            bannerOrder[firstBanner.type] - bannerOrder[secondBanner.type]
    );
};
export const getBannerDrop = (
    banner: Banners,
    characters: Character[],
    weapons: Weapon[],
    featuredItems?: number[] | null
) => {
    switch (banner.type) {
        case 'Character Event Wish':
        case 'Character Event Wish-2':
            const characterBannerCharacters = characters.filter(
                (character) =>
                    (character.inStandardWish ||
                        character.id === (banner as CharacterBanner).mainCharacterId ||
                        featuredItems?.includes(character.id)) &&
                    !basedCharacters.includes(character.name) &&
                    character.appearanceVersion <= currentGameVersion
            );
            const characterBannerWeapons = weapons.filter(
                (weapon) =>
                    weapon.inStandardWish &&
                    weapon.rare !== '5' &&
                    weapon.appearanceVersion <= currentGameVersion
            );
            return [...characterBannerCharacters, ...characterBannerWeapons];
        case 'Standard Wish':
            const standardBannerCharacters = characters.filter(
                (character) =>
                    character.inStandardWish &&
                    character.appearanceVersion < currentGameVersion
            );
            const standardBannerWeapons = weapons.filter(
                (weapon) =>
                    weapon.inStandardWish &&
                    weapon.appearanceVersion <= currentGameVersion
            );
            return [...standardBannerCharacters, ...standardBannerWeapons];
        case 'Weapon Event Wish':
            const weaponBannerCharacters = characters.filter(
                (character) =>
                    character.inStandardWish &&
                    character.rare === '4' &&
                    !basedCharacters.includes(character.name) &&
                    character.appearanceVersion < currentGameVersion
            );
            const weaponBannerWeapons = weapons.filter(
                (weapon) =>
                    (weapon.inStandardWish ||
                        weapon.id === (banner as WeaponBanner).firstMainWeaponId ||
                        weapon.id === (banner as WeaponBanner).secondMainWeaponId ||
                        featuredItems?.includes(weapon.id)) &&
                    weapon.appearanceVersion <= currentGameVersion
            );
            return [...weaponBannerCharacters, ...weaponBannerWeapons];
        case 'Novice Wish':
            const noviceBannerCharacters = characters.filter(
                (character) =>
                    character.inStandardWish &&
                    character.appearanceVersion === 1 &&
                    !basedCharacters.includes(character.name)
            );
            const noviceBannerWeapons = weapons.filter(
                (weapon) =>
                    weapon.inStandardWish &&
                    weapon.rare === '3' &&
                    weapon.appearanceVersion === 1
            );
            return [...noviceBannerCharacters, ...noviceBannerWeapons];
    }
};
export const playSfxEffect = (path: string) => {
    const sfx = new Audio(path);
    sfx.play();
};
export const getMainItemsName = (
    banner: Banners,
    characters: Character[],
    weapons: Weapon[]
) => {
    if ('mainCharacterId' in banner) {
        const mainCharacter = characters.find(
            (character) => character.id === banner.mainCharacterId
        ) as Character;
        return [mainCharacter.name];
    } else {
        const mainWeapons = weapons.filter(
            (weapon) =>
                weapon.id === banner.firstMainWeaponId ||
                weapon.id === banner.secondMainWeaponId
        );
        return mainWeapons.map((weapon) => weapon.title);
    }
};
export const getBannerStatName = (bannerType: BannerTypes) => {
    return bannerType.replace(/[^a-zA-Zа-яА-Я]/g, '');
};
export const getBannerColor = (banner: Banners, characters?: Character[]) => {
    if ('mainCharacterId' in banner && banner.type !== 'Standard Wish') {
        return elementToColor[
            (
                characters?.find(
                    (character) => character.id === banner.mainCharacterId
                ) as Character
            ).element
        ];
    } else if ('firstMainWeaponId' in banner) {
        return '226,124,35';
    } else {
        if (currentGameVersion === 1) {
            return '230,98,106';
        } else {
            return '120,126,201';
        }
    }
};
