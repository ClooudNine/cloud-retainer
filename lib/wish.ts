import {
    BannerItems,
    Banners,
    BannerStats,
    bannerTranslates,
    EpitomizedPath,
    WishHistoryTypes,
} from '@/lib/banners';
import { BannerTypes, Character, Rares, Weapon, WeaponBanner } from '@/lib/db/schema';
import { getBannerStatName } from '@/lib/wish-simulator';

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
            softFiveStar: 63,
            guaranteedPity: 80,
            fourStarSoftRate: 0.656,
        };
    } else {
        return {
            softFourStar: 9,
            softFiveStar: 74,
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

    if (currentFiveStarCounter >= pityRules.softFiveStar - 1) {
        baseChances.fiveStar +=
            baseChances.fiveStar *
            10 *
            (currentFiveStarCounter - (pityRules.softFiveStar - 2));
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
            (currentFourStarCounter - (pityRules.softFourStar - 1)) / 10;
    }

    baseChances.threeStar = 1 - baseChances.fiveStar - baseChances.fourStar;

    return Object.values(baseChances).map((chance) => Number(chance.toFixed(3)));
};

const getFourStarItemsByBannerState = (
    banner: Banners,
    bannerStatType: WishHistoryTypes,
    currentStats: BannerStats,
    items: BannerItems
) => {
    if (bannerStatType === 'StandardWish') return items;

    if (bannerStatType === 'NoviceWish') {
        const noelleExists = currentStats[bannerStatType].history.some(
            (wish) => wish.item.name === 'Noelle'
        );
        return noelleExists
            ? items
            : ([
                  items.find((item) => 'name' in item && item.name === 'Noelle'),
              ] as Character[]);
    }

    const fourStarGuaranteed =
        currentStats[bannerStatType].fourStarGuaranteed ||
        Math.random() < (bannerStatType === 'WeaponEventWish' ? 0.75 : 0.5);
    currentStats[bannerStatType].fourStarGuaranteed = !fourStarGuaranteed;

    let featuredItems: Character[] | Weapon[] = [];

    if ('rerunNumber' in banner) {
        featuredItems = banner.featuredCharactersInBanners.map(
            ({ character }) => character
        );
    } else {
        featuredItems = (banner as WeaponBanner).featuredWeaponsInBanners.map(
            ({ weapon }) => weapon
        );
    }

    if (fourStarGuaranteed) return featuredItems;

    return items.filter(
        (item) =>
            !featuredItems.some(
                (featuredItem) =>
                    featuredItem.id === item.id && featuredItem.title === item.title
            )
    );
};

const getFiveStarItemsByBannerState = (
    banner: Banners,
    bannerStatType: WishHistoryTypes,
    currentStats: BannerStats,
    items: BannerItems,
    epitomizedPath: EpitomizedPath,
    setEpitomizedPath: (newEpitomizedPath: EpitomizedPath) => void
) => {
    if (bannerStatType === 'StandardWish' || bannerStatType === 'NoviceWish')
        return items;

    if ('mainCharacterId' in banner) {
        const isFiveStarGuaranteed =
            currentStats[bannerStatType].fiveStarGuaranteed || Math.random() < 0.5;
        currentStats[bannerStatType].fiveStarGuaranteed = !isFiveStarGuaranteed;

        return isFiveStarGuaranteed
            ? [banner.character]
            : items.filter((item) => item.inStandardWish && item.rare === '5');
    }

    let returnedWeapon: Weapon[];
    const updatedEpitomizedPath = { ...epitomizedPath };
    const mainWeapons = [banner.firstMainWeapon, banner.secondMainWeapon];

    if (updatedEpitomizedPath[banner.id]?.count === 2) {
        returnedWeapon = [
            mainWeapons.find(
                (mainWeapon) =>
                    mainWeapon.id === updatedEpitomizedPath[banner.id].weaponId
            ),
        ] as Weapon[];
        updatedEpitomizedPath[banner.id].count = 0;
        currentStats[bannerStatType].fiveStarGuaranteed = false;
    } else {
        const isFiveStarGuaranteed =
            currentStats[bannerStatType].fiveStarGuaranteed || Math.random() >= 0.25;
        currentStats[bannerStatType].fiveStarGuaranteed = !isFiveStarGuaranteed;

        if (isFiveStarGuaranteed) {
            returnedWeapon = [getRandomItem(mainWeapons)] as Weapon[];
            if (updatedEpitomizedPath[banner.id]) {
                if (returnedWeapon[0].id !== updatedEpitomizedPath[banner.id].weaponId) {
                    updatedEpitomizedPath[banner.id].count++;
                } else updatedEpitomizedPath[banner.id].count = 0;
            }
        } else {
            returnedWeapon = items.filter(
                (item) =>
                    !mainWeapons.some(
                        (mainWeapon) => mainWeapon.id === item.id && 'type' in item
                    ) && item.rare === '5'
            ) as Weapon[];
            if (updatedEpitomizedPath[banner.id])
                updatedEpitomizedPath[banner.id].count++;
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
                    banner,
                    bannerStatName,
                    updatedBannerStats,
                    items
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
