import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";
import { EpitomizedPath, Rares, WishHistory } from "@/app/lib/common";
import {
  BannerItems,
  Banners,
  bannerTranslates,
  BannerTypes,
  WeaponBanner,
} from "@/app/lib/banner";
import { getBannerStatName } from "@/app/wish-simulator/utils";

type BannerStats = {
  fourStarCounter: number;
  fiveStarCounter: number;
  history: WishHistory;
  fourStarGuaranteed: boolean;
  fiveStarGuaranteed: boolean;
};
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
  if (bannerType === "Weapon Event Wish") {
    return { threeStar: 0.933, fourStar: 0.06, fiveStar: 0.007 };
  } else {
    return { threeStar: 0.943, fourStar: 0.051, fiveStar: 0.006 };
  }
};
export const getPityRules = (bannerType: BannerTypes) => {
  if (bannerType === "Weapon Event Wish") {
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
  currentFiveStarCounter: number,
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
    baseChances.fiveStar = 0;
    baseChances.fourStar = 1;
  } else if (currentFourStarCounter === 9) {
    baseChances.fourStar = 1 - baseChances.fiveStar;
  } else if (currentFourStarCounter >= pityRules.softFourStar - 1) {
    if (baseChances.fiveStar + pityRules.fourStarSoftRate > 1) {
      baseChances.fourStar = 1 - baseChances.fiveStar;
    } else {
      baseChances.fourStar =
        pityRules.fourStarSoftRate +
        (currentFourStarCounter - (pityRules.softFourStar - 1));
    }
  }

  baseChances.threeStar = 1 - baseChances.fiveStar - baseChances.fourStar;

  return Object.values(baseChances).map((chance) => Number(chance.toFixed(3)));
};
const getOneMainWeapon = (
  weaponBanner: WeaponBanner,
  items: BannerItems,
  epitomizedPath: EpitomizedPath,
) => {
  const mainWeapons = items.filter(
    (item) => !item.in_standard_wish && item.rare === 5,
  );
  const droppedWeapon = getRandomItem(mainWeapons) as Weapon;
  if (epitomizedPath[weaponBanner.id]) {
    if (droppedWeapon.id === epitomizedPath[weaponBanner.id].weaponId) {
      delete epitomizedPath[weaponBanner.id];
    } else {
      epitomizedPath[weaponBanner.id].count++;
    }
  }
  return [droppedWeapon];
};
const getFeaturedFourStarItems = (
  items: BannerItems,
  banner: Banners,
  featuredItems: number[] | null,
) => {
  return items.filter((item) => {
    if (banner.type === "Weapon Event Wish") {
      return featuredItems?.includes(item.id) && "type" in item;
    } else {
      return featuredItems?.includes(item.id) && "name" in item;
    }
  });
};
const getFourStarItemsByBannerState = (
  banner: Banners,
  currentStats: BannerStats,
  items: BannerItems,
  featuredItems: number[] | null,
) => {
  if (banner.type === "Novice Wish" || banner.type === "Standard Wish") {
    return items;
  }
  if (currentStats.fourStarGuaranteed) {
    currentStats.fourStarGuaranteed = false;
    return getFeaturedFourStarItems(items, banner, featuredItems);
  } else {
    const randomNumber = Math.random();
    if (randomNumber < (banner.type === "Weapon Event Wish" ? 0.75 : 0.5)) {
      return getFeaturedFourStarItems(items, banner, featuredItems);
    } else {
      currentStats.fourStarGuaranteed = true;
      return items.filter(
        (item) =>
          (!featuredItems?.includes(item.id) && "name" in item) ||
          "type" in item,
      );
    }
  }
};
const getFiveStarItemsByBannerState = (
  banner: Banners,
  currentStats: BannerStats,
  items: BannerItems,
) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      const mainCharacter = items.filter(
        (item) => item.id === banner.main_character && item.rare === 5,
      );
      if (currentStats.fiveStarGuaranteed) {
        currentStats.fiveStarGuaranteed = false;
        return mainCharacter;
      } else {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
          currentStats.fiveStarGuaranteed = true;
          return items.filter(
            (item) => item.in_standard_wish && item.rare === 5,
          );
        } else {
          return mainCharacter;
        }
      }
    case "Weapon Event Wish":
      const epitomizedPath: EpitomizedPath = JSON.parse(
        localStorage.getItem("EpitomizedPath")!,
      );
      let returnedWeapon: Weapon[] = [];
      if (epitomizedPath[banner.id]) {
        if (epitomizedPath[banner.id].count === 2)
          returnedWeapon = items.filter(
            (item) =>
              item.id === epitomizedPath[banner.id].weaponId && item.rare === 5,
          ) as Weapon[];
        delete epitomizedPath[banner.id];
        currentStats.fiveStarGuaranteed = false;
      } else if (currentStats.fiveStarGuaranteed) {
        currentStats.fiveStarGuaranteed = false;
        returnedWeapon = getOneMainWeapon(banner, items, epitomizedPath);
      } else {
        const randomNumber = Math.random();
        if (randomNumber < 0.25) {
          currentStats.fiveStarGuaranteed = true;
          epitomizedPath[banner.id].count++;
          returnedWeapon = items.filter(
            (item) => item.in_standard_wish && item.rare === 5,
          ) as Weapon[];
        } else {
          returnedWeapon = getOneMainWeapon(banner, items, epitomizedPath);
        }
      }
      localStorage.setItem("EpitomizedPath", JSON.stringify(epitomizedPath));
      return returnedWeapon;
    default:
      return items;
  }
};
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
export const getWishInfo = (
  bannerType: BannerTypes,
  droppedItem: Character | Weapon,
) => {
  const type = "name" in droppedItem ? "Персонаж" : "Оружие";
  const name = "name" in droppedItem ? droppedItem.name : droppedItem.title;
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
  items: (Character | Weapon)[] | null,
  featuredItems: number[] | null,
) => {
  if (items === null) {
    return;
  }
  const bannerTypeStatName = getBannerStatName(banner.type);
  const currentStat: BannerStats = JSON.parse(
    localStorage.getItem(bannerTypeStatName)!,
  );
  const currentChances = getCurrentChances(
    banner.type,
    currentStat.fourStarCounter,
    currentStat.fiveStarCounter,
  );
  const randomNumber = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < currentChances.length; i++) {
    cumulativeProbability += currentChances[i];
    if (randomNumber <= cumulativeProbability) {
      const itemRare = (i + 3) as Rares;
      if (itemRare === 3) {
        currentStat.fourStarCounter++;
        currentStat.fiveStarCounter++;
      } else if (itemRare === 4) {
        items = getFourStarItemsByBannerState(
          banner,
          currentStat,
          items,
          featuredItems,
        );
        currentStat.fourStarCounter = 0;
        currentStat.fiveStarCounter++;
      } else {
        items = getFiveStarItemsByBannerState(banner, currentStat, items);
        currentStat.fourStarCounter++;
        currentStat.fiveStarCounter = 0;
      }
      const droppedItem = dropItem(items, itemRare);
      currentStat.history.unshift(getWishInfo(banner.type, droppedItem));
      localStorage.setItem(bannerTypeStatName, JSON.stringify(currentStat));
      return droppedItem;
    }
  }
};
