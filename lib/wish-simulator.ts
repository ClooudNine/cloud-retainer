import { BannerItems, bannerOrder, Banners, WishHistoryTypes } from '@/lib/banners';
import { basedCharacters, currentGameVersion, elementToColor } from '@/lib/constants';
import striptags from 'striptags';
import {
    BannerTypes,
    Character,
    CharacterBanner,
    Phases,
    Rares,
    Weapon,
    WeaponBanner,
} from '@/lib/db/schema';

const getCharacterPortrait = (character: Character) => {
    return `/characters/portraits/${character.name}.webp`;
};

const getWeaponPortrait = (weapon: Weapon) => {
    return `/weapons/portraits/${weapon.title}.webp`;
};

export const getButtonPortraitUrl = (banner: Banners): string[] => {
    if ('firstMainWeaponId' in banner) {
        const mainWeapons = [banner.firstMainWeapon, banner.secondMainWeapon];
        return mainWeapons.map((weapon) => getWeaponPortrait(weapon));
    } else {
        return [getCharacterPortrait(banner.character)];
    }
};

export const getPreviewUrl = (banner: Banners): string => {
    const bannerTitle = striptags(banner.title);

    if ('rerunNumber' in banner) {
        return `${bannerTitle} ${banner.rerunNumber}`;
    }

    if ('firstMainWeaponId' in banner) {
        return `${bannerTitle} ${banner.version} ${banner.phase}`;
    }

    return `${bannerTitle} ${banner.previewVersion}`;
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
    weapons: Weapon[]
) => {
    if ('mainCharacterId' in banner) {
        if (banner.type === 'Standard Wish') {
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
        }

        if (banner.type === 'Novice Wish') {
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

        const characterBannerCharacters = characters.filter(
            (character) =>
                (character.inStandardWish || character.id === banner.mainCharacterId) &&
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
    }

    const weaponBannerCharacters = characters.filter(
        (character) =>
            character.inStandardWish &&
            character.rare === '4' &&
            !basedCharacters.includes(character.name) &&
            character.appearanceVersion < banner.version
    );

    const featuredWeaponsInBanner = banner.featuredWeaponsInBanners.map(
        ({ weapon }) => weapon
    );

    const weaponBannerWeapons = weapons.filter(
        (weapon) =>
            (weapon.inStandardWish ||
                weapon.id === banner.firstMainWeaponId ||
                weapon.id === banner.secondMainWeaponId ||
                featuredWeaponsInBanner.some(
                    (featuredWeapon) => featuredWeapon.id === weapon.id
                )) &&
            weapon.appearanceVersion <= banner.version
    );

    return [...weaponBannerCharacters, ...weaponBannerWeapons];
};

export const playSfxEffect = (path: string) => {
    const sfx = new Audio(path);
    sfx.play();
};

export const getMainItemsName = (banner: Banners) => {
    if ('mainCharacterId' in banner) {
        return [banner.character.name];
    } else {
        return [banner.firstMainWeapon.title, banner.secondMainWeapon.title];
    }
};

export const getBannerStatName = (bannerType: BannerTypes) => {
    return bannerType.replace(/[^a-zA-Zа-яА-Я]/g, '') as WishHistoryTypes;
};

export const getBannerColor = (banner: Banners) => {
    if ('mainCharacterId' in banner) {
        if (banner.type === 'Standard Wish') {
            if (currentGameVersion === 1) return '230,98,106';

            return '120,126,201';
        }

        if (banner.type === 'Novice Wish') return '195,151,97';

        return elementToColor[banner.character.element];
    }

    return '226,124,35';
};

export const getItemPortrait = (item: Character | Weapon) => {
    if ('name' in item) {
        return `/characters/profiles/${item.name}.webp`;
    }
    return `/weapons/portraits/${item.title}.webp`;
};

export const sortItemsForDetails = (
    bannerItems: BannerItems,
    rare: Rares,
    itemsToMove?: (Character | Weapon)[] | null
) => {
    let itemsByRarity = bannerItems.filter(
        (item) =>
            item.rare === rare &&
            !itemsToMove?.some((itemToMove) => itemToMove.id === item.id)
    );

    if (itemsToMove) {
        itemsToMove.forEach((item) => itemsByRarity.unshift(item));
    }

    return itemsByRarity;
};

export const getChancesRules = (
    bannerType: BannerTypes
): Partial<{
    [key in Rares]: { baseChance: string; includingGuarantee: string };
}> => {
    if (bannerType !== 'Weapon Event Wish') {
        return {
            5: { baseChance: '0,600%', includingGuarantee: '1,600%' },
            4: { baseChance: '5,100%', includingGuarantee: '13,000%' },
            3: { baseChance: '94,300%', includingGuarantee: '85,400%' },
        };
    } else {
        return {
            5: { baseChance: '0,700%', includingGuarantee: '1,850%' },
            4: { baseChance: '6,000%', includingGuarantee: '14,500%' },
            3: { baseChance: '93,300%', includingGuarantee: '83,650%' },
        };
    }
};

export const getGroupedBanners = (banners: Banners[]) => {
    return banners.reduce(
        (groupedBanners, banner) => {
            if (banner.type === 'Novice Wish' || 'previewVersion' in banner) {
                return groupedBanners;
            }
            const key = `${banner.version}-${banner.phase}`;
            groupedBanners[key] = groupedBanners[key] || [];
            groupedBanners[key].push(banner);
            return groupedBanners;
        },
        {} as { [key: string]: (CharacterBanner | WeaponBanner)[] }
    );
};
