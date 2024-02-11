import { bannerOrder, Banners, WishHistoryTypes } from '@/lib/banners';
import { basedCharacters, currentGameVersion, elementToColor } from '@/lib/constants';
import striptags from 'striptags';
import {
    BannerTypes,
    Character,
    CharacterBanner,
    Phases,
    Weapon,
    WeaponBanner,
} from '@/lib/db/schema';

export const getFeaturedItems = async (id: number, type: BannerTypes) => {
    const baseUrl = window.location.origin;
    const res = await fetch(`${baseUrl}/api/featuredItems?id=${id}&type=${type}`);
    const featuredItems = await res.json();
    return featuredItems.res as Character[] | Weapon[];
};

const getCharacterPortrait = (characters: Character[], characterId: number) => {
    const character = characters.find((character) => character.id === characterId);
    if (character) {
        return `/characters/portraits/${character.name}.webp`;
    }
    return '';
};

const getWeaponPortrait = (weapons: Weapon[], weaponId: number) => {
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
        return mainWeaponsId.map((weaponId) => getWeaponPortrait(weapons, weaponId));
    } else {
        return [getCharacterPortrait(characters, banner.mainCharacterId)];
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
    phase: Phases,
    noviceWishCount: number
): Banners[] => {
    let standardBanner = null;
    let bannersByVersion = banners.filter((banner) => {
        if ('previewVersion' in banner) {
            if (banner.version <= version) standardBanner = banner;
        } else {
            return banner.version === version && banner.phase === phase;
        }
    });
    if (standardBanner) bannersByVersion.push(standardBanner);
    if (noviceWishCount < 20)
        bannersByVersion.push(
            banners.find((banner) => banner.type === 'Novice Wish') as CharacterBanner
        );
    return bannersByVersion.sort(
        (firstBanner, secondBanner) =>
            bannerOrder[firstBanner.type] - bannerOrder[secondBanner.type]
    );
};

export const getBannerDrop = (
    banner: Banners,
    characters: Character[],
    weapons: Weapon[],
    featuredWeapons?: Weapon[] | Character[]
) => {
    switch (banner.type) {
        case 'Character Event Wish':
        case 'Character Event Wish-2':
            const characterBannerCharacters = characters.filter(
                (character) =>
                    (character.inStandardWish ||
                        character.id === (banner as CharacterBanner).mainCharacterId) &&
                    !basedCharacters.includes(character.name) &&
                    character.appearanceVersion <= banner.version
            );
            const characterBannerWeapons = weapons.filter(
                (weapon) =>
                    weapon.inStandardWish &&
                    weapon.rare !== '5' &&
                    weapon.appearanceVersion <= banner.version
            );
            return [...characterBannerCharacters, ...characterBannerWeapons];
        case 'Standard Wish':
            const standardBannerCharacters = characters.filter(
                (character) =>
                    character.inStandardWish &&
                    character.appearanceVersion < banner.version
            );
            const standardBannerWeapons = weapons.filter(
                (weapon) =>
                    weapon.inStandardWish && weapon.appearanceVersion < banner.version
            );
            return [...standardBannerCharacters, ...standardBannerWeapons];
        case 'Weapon Event Wish':
            const weaponBannerCharacters = characters.filter(
                (character) =>
                    character.inStandardWish &&
                    character.rare === '4' &&
                    !basedCharacters.includes(character.name) &&
                    character.appearanceVersion < banner.version
            );
            const weaponBannerWeapons = weapons.filter(
                (weapon) =>
                    (weapon.inStandardWish ||
                        weapon.id === (banner as WeaponBanner).firstMainWeaponId ||
                        weapon.id === (banner as WeaponBanner).secondMainWeaponId ||
                        featuredWeapons?.some(
                            (featuredWeapon) => featuredWeapon.id === weapon.id
                        )) &&
                    weapon.appearanceVersion <= banner.version
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
    return bannerType.replace(/[^a-zA-Zа-яА-Я]/g, '') as WishHistoryTypes;
};

export const getBannerColor = (banner: Banners, characters?: Character[]) => {
    if ('mainCharacterId' in banner) {
        if (banner.type === 'Standard Wish') {
            if (currentGameVersion === 1) {
                return '230,98,106';
            }
            return '120,126,201';
        } else if (banner.type === 'Novice Wish') {
            return '195,151,97';
        } else {
            return elementToColor[
                (
                    characters?.find(
                        (character) => character.id === banner.mainCharacterId
                    ) as Character
                ).element
            ];
        }
    }
    return '226,124,35';
};
