import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { Rares } from "@/app/types/common";
import { BannerTypes } from "@/app/types/banner";

type BannerStat = {
  fourStarCounter: number;
  fiveStarCounter: number;
  guaranteedStatus: boolean;
};
const getItemsByRarity = (items: (Character | Weapon)[], rare: Rares) => {
  return items.filter((item) => item.rare === rare);
};
const getRandomItem = (items: (Character | Weapon)[]) => {
  return items[Math.floor(Math.random() * items.length)];
};
const dropItem = (items: (Character | Weapon)[], rare: Rares) => {
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

  if (currentFiveStarCounter >= pityRules.guaranteedPity - 1) {
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
export const wish = (
  bannerType: BannerTypes,
  items: (Character | Weapon)[],
) => {
  const currentStat: BannerStat = JSON.parse(
    localStorage.getItem(bannerType.replace(/[^a-zA-Zа-яА-Я]/g, ""))!,
  );
  const currentChances = getCurrentChances(
    bannerType,
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
        currentStat.fourStarCounter++;
        currentStat.fiveStarCounter = 0;
      }
      localStorage.setItem(
        bannerType.replace(/[^a-zA-Zа-яА-Я]/g, ""),
        JSON.stringify(currentStat),
      );
      return dropItem(items, itemRare);
    }
  }
};
