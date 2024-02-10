import {
    BannerItems,
    Banners,
    BannerStats,
    bannerTranslates,
    EpitomizedPath,
    WishHistoryTypes,
} from '@/lib/banners';
import { BannerTypes, Character, CharacterBanner, Rares, Weapon } from '@/lib/db/schema';
import { getBannerStatName } from '@/app/wish-simulator/utils';

const getItemsByRarity = (items: BannerItems, rare: Rares) => {
    return items.filter((item) => item.rare === rare);
};
const getRandomItem = (items: BannerItems) => {
    return items[Math.floor(Math.random() * items.length)];
};
const dropItem = (items: BannerItems, rare: Rares) => {
    return getRandomItem(getItemsByRarity(items, rare));
};
const getBaseChances = (bannerType: BannerTypes) => {
    if (bannerType === 'Weapon Event Wish') {
        return { threeStar: 0.933, fourStar: 0.06, fiveStar: 0.007 };
    } else {
        return { threeStar: 0.943, fourStar: 0.051, fiveStar: 0.006 };
    }
};
export const getPityRules = (bannerType: BannerTypes) => {
    if (bannerType === 'Weapon Event Wish') {
        return {
            softFourStar: 8,
            softFiveStar: 62,
            guaranteedPity: 80,
            fourStarSoftRate: 0.656,
        };
    } else {
        return {
            softFourStar: 9,
            softFiveStar: 73,
            guaranteedPity: 90,
            fourStarSoftRate: 0.561,
        };
    }
};
const getCurrentChances = (
    bannerType: BannerTypes,
    currentFourStarCounter: number,
    currentFiveStarCounter: number
) => {
    const pityRules = getPityRules(bannerType);
    let baseChances = getBaseChances(bannerType);

    if (currentFiveStarCounter === pityRules.guaranteedPity - 1) {
        baseChances.fiveStar = 1;
    } else if (currentFiveStarCounter >= pityRules.softFiveStar) {
        baseChances.fiveStar +=
            baseChances.fiveStar *
            10 *
            (currentFiveStarCounter - (pityRules.softFiveStar - 1));
    }

    if (currentFourStarCounter === 10) {
        baseChances = { threeStar: 0, fourStar: 1, fiveStar: 0 };
    } else if (
        currentFourStarCounter === 9 ||
        baseChances.fiveStar + pityRules.fourStarSoftRate > 1
    ) {
        baseChances.fourStar = 1 - baseChances.fiveStar;
    } else if (currentFourStarCounter >= pityRules.softFourStar - 1) {
        baseChances.fourStar =
            pityRules.fourStarSoftRate +
            (currentFourStarCounter - (pityRules.softFourStar - 1));
    }

    baseChances.threeStar = 1 - baseChances.fiveStar - baseChances.fourStar;

    return Object.values(baseChances).map((chance) => Number(chance.toFixed(3)));
};
const getOneMainWeapon = (items: BannerItems) => {
    const mainWeapons = items.filter((item) => !item.inStandardWish && item.rare === '5');
    const droppedWeapon = getRandomItem(mainWeapons) as Weapon;
    return [droppedWeapon];
};
const getFourStarItemsByBannerState = (
    bannerType: WishHistoryTypes,
    currentStats: BannerStats,
    items: BannerItems,
    featuredItems: Character[] | Weapon[]
) => {
    switch (bannerType) {
        case 'StandardWish':
            return items;
        case 'NoviceWish':
            const noelleExists = currentStats[bannerType].history.some(
                (wish) => wish.item.name === 'Noelle'
            );
            return noelleExists
                ? items
                : ([
                      items.find((item) => 'name' in item && item.name === 'Noelle'),
                  ] as Character[]);
        default:
            const isWeaponBanner = bannerType === 'WeaponEventWish';
            const fourStarGuaranteed =
                currentStats[bannerType].fourStarGuaranteed ||
                Math.random() < (isWeaponBanner ? 0.75 : 0.5);
            currentStats[bannerType].fourStarGuaranteed = !fourStarGuaranteed;
            return fourStarGuaranteed
                ? featuredItems
                : items.filter(
                      (item) =>
                          !featuredItems.some(
                              (featuredItem) =>
                                  featuredItem.id === item.id &&
                                  featuredItem.title === item.title
                          )
                  );
    }
};
const getFiveStarItemsByBannerState = (
    banner: Banners,
    bannerStatType: WishHistoryTypes,
    currentStats: BannerStats,
    items: BannerItems,
    epitomizedPath: EpitomizedPath,
    setEpitomizedPath: (newEpitomizedPath: EpitomizedPath) => void
) => {
    if (bannerStatType === 'StandardWish' || bannerStatType === 'NoviceWish') {
        return items;
    }

    if (bannerStatType === 'CharacterEventWish') {
        const isFiveStarGuaranteed =
            currentStats[bannerStatType].fiveStarGuaranteed || Math.random() < 0.5;
        currentStats[bannerStatType].fiveStarGuaranteed = !isFiveStarGuaranteed;

        return isFiveStarGuaranteed
            ? items.filter(
                  (item) =>
                      item.id === (banner as CharacterBanner).mainCharacterId &&
                      item.rare === '5'
              )
            : items.filter((item) => item.inStandardWish && item.rare === '5');
    }

    let returnedWeapon: Weapon[];
    const updatedEpitomizedPath = { ...epitomizedPath };

    if (updatedEpitomizedPath[banner.id].count === 2) {
        returnedWeapon = items.filter(
            (item) => item.id === epitomizedPath[banner.id].weaponId && item.rare === '5'
        ) as Weapon[];
        updatedEpitomizedPath[banner.id].count = 0;
        currentStats[bannerStatType].fiveStarGuaranteed = false;
    } else {
        const isFiveStarGuaranteed =
            currentStats[bannerStatType].fiveStarGuaranteed || Math.random() >= 0.25;
        currentStats[bannerStatType].fiveStarGuaranteed = !isFiveStarGuaranteed;

        if (isFiveStarGuaranteed) {
            returnedWeapon = getOneMainWeapon(items);
            if (returnedWeapon[0].id !== updatedEpitomizedPath[banner.id].weaponId) {
                updatedEpitomizedPath[banner.id].count++;
            }
        } else {
            updatedEpitomizedPath[banner.id].count++;
            returnedWeapon = items.filter(
                (item) => item.inStandardWish && item.rare === '5'
            ) as Weapon[];
        }
    }

    localStorage.setItem('epitomizedPath', JSON.stringify(updatedEpitomizedPath));
    setEpitomizedPath(updatedEpitomizedPath);
    return returnedWeapon;
};
const getCurrentDateTime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
};
export const getWishInfo = (bannerType: BannerTypes, droppedItem: Character | Weapon) => {
    const type = 'name' in droppedItem ? 'Персонаж' : 'Оружие';
    const name = 'name' in droppedItem ? droppedItem.name : droppedItem.title;
    const wishType = bannerTranslates[bannerType];
    const date = getCurrentDateTime();
    return {
        type: type,
        item: { name: name, rare: droppedItem.rare },
        wishType: wishType,
        date: date,
    };
};
export const wish = (
    banner: Banners,
    items: (Character | Weapon)[],
    bannerStat: BannerStats,
    featuredItems: Character[] | Weapon[],
    epitomizedPath: EpitomizedPath,
    setBannerStats: (newStats: BannerStats) => void,
    setEpitomizedPath: (newEpitomizedPath: EpitomizedPath) => void
) => {
    const bannerStatName = getBannerStatName(banner.type);
    const updatedBannerStats = { ...bannerStat };
    const currentChances = getCurrentChances(
        banner.type,
        updatedBannerStats[bannerStatName].fourStarCounter,
        updatedBannerStats[bannerStatName].fiveStarCounter
    );
    const randomNumber = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < currentChances.length; i++) {
        cumulativeProbability += currentChances[i];
        if (randomNumber <= cumulativeProbability) {
            const itemRare = String(i + 3) as Rares;
            if (itemRare === '3') {
                updatedBannerStats[bannerStatName].fourStarCounter++;
                updatedBannerStats[bannerStatName].fiveStarCounter++;
            } else if (itemRare === '4') {
                items = getFourStarItemsByBannerState(
                    bannerStatName,
                    updatedBannerStats,
                    items,
                    featuredItems
                );
                updatedBannerStats[bannerStatName].fourStarCounter = 0;
                updatedBannerStats[bannerStatName].fiveStarCounter++;
            } else {
                items = getFiveStarItemsByBannerState(
                    banner,
                    bannerStatName,
                    updatedBannerStats,
                    items,
                    epitomizedPath,
                    setEpitomizedPath
                );
                updatedBannerStats[bannerStatName].fourStarCounter++;
                updatedBannerStats[bannerStatName].fiveStarCounter = 0;
            }
            const droppedItem = dropItem(items, itemRare);
            updatedBannerStats[bannerStatName].history.unshift(
                getWishInfo(banner.type, droppedItem)
            );
            setBannerStats(updatedBannerStats);
            return droppedItem;
        }
    }
};
