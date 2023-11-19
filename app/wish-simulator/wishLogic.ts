import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { EpitomizedPath, EpitomizedStats, Rares } from "@/app/types/common";
import {
  BannerItems,
  Banners,
  BannerTypes,
  WeaponBanner,
} from "@/app/types/banner";

type BannerStat = {
  fourStarCounter: number;
  fiveStarCounter: number;
  guaranteedFourStarStatus: boolean;
  guaranteedFiveStarStatus: boolean;
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
const getPityRules = (bannerType: BannerTypes) => {
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
  currentEpitomizedStats: EpitomizedStats,
) => {
  const mainWeapons = items.filter(
    (item) => !item.in_standard_wish && item.rare === 5,
  );
  const droppedWeapon = getRandomItem(mainWeapons) as Weapon;
  if (droppedWeapon.id === currentEpitomizedStats.weaponId) {
    delete epitomizedPath[weaponBanner.id];
  } else {
    currentEpitomizedStats.count++;
  }
  return [droppedWeapon];
};
const getFiveStarItemsByBannerState = (
  banner: Banners,
  currentStats: BannerStat,
  items: (Character | Weapon)[],
) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      const mainCharacter = items.filter(
        (item) => item.id === banner.main_character && item.rare === 5,
      );
      if (currentStats.guaranteedFiveStarStatus) {
        currentStats.guaranteedFiveStarStatus = false;
        return mainCharacter;
      } else {
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
          currentStats.guaranteedFiveStarStatus = true;
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
      const currentEpitomizedStats = epitomizedPath[banner.id];
      let returnedWeapon: Weapon[] = [];
      if (currentEpitomizedStats.count === 2) {
        returnedWeapon = items.filter(
          (item) =>
            item.id === currentEpitomizedStats.weaponId && item.rare === 5,
        ) as Weapon[];
        delete epitomizedPath[banner.id];
        currentStats.guaranteedFiveStarStatus = false;
      } else if (currentStats.guaranteedFiveStarStatus) {
        currentStats.guaranteedFiveStarStatus = false;
        returnedWeapon = getOneMainWeapon(
          banner,
          items,
          epitomizedPath,
          currentEpitomizedStats,
        );
      } else {
        const randomNumber = Math.random();
        if (randomNumber < 0.25) {
          currentStats.guaranteedFiveStarStatus = true;
          currentEpitomizedStats.count++;
          returnedWeapon = items.filter(
            (item) => item.in_standard_wish && item.rare === 5,
          ) as Weapon[];
        } else {
          returnedWeapon = getOneMainWeapon(
            banner,
            items,
            epitomizedPath,
            currentEpitomizedStats,
          );
        }
      }
      epitomizedPath[banner.id] = currentEpitomizedStats;
      localStorage.setItem("EpitomizedPath", JSON.stringify(epitomizedPath));
      return returnedWeapon;
    default:
      return items;
  }
};
export const wish = (
  banner: Banners,
  items: (Character | Weapon)[],
  featuredItems: number[] | null,
) => {
  const bannerTypeStatName = banner.type.replace(/[^a-zA-Zа-яА-Я]/g, "");
  const currentStat: BannerStat = JSON.parse(
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
        currentStat.fourStarCounter = 0;
        currentStat.fiveStarCounter++;
      } else {
        items = getFiveStarItemsByBannerState(banner, currentStat, items);
        currentStat.fourStarCounter++;
        currentStat.fiveStarCounter = 0;
      }
      localStorage.setItem(bannerTypeStatName, JSON.stringify(currentStat));
      return dropItem(items, itemRare);
    }
  }
};
