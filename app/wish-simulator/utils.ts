import {
  bannerOrder,
  BannerPhases,
  Banners,
  BannerTypes,
} from "@/app/lib/banner";
import {
  basedCharacters,
  currentGameVersion,
  elementToColor,
  Versions,
} from "@/app/lib/common";
import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";
import { SupabaseClient } from "@supabase/supabase-js";
import striptags from "striptags";

const getCharacterPortraitUrl = (
  supabase: SupabaseClient,
  characters: Character[],
  characterId: number,
) => {
  const character = characters.find(
    (character) => character.id === characterId,
  );
  if (character) {
    return supabase.storage
      .from("character portraits")
      .getPublicUrl(`${character.name}.webp`).data.publicUrl;
  }
  return "";
};
const getWeaponPortraitUrl = (
  supabase: SupabaseClient,
  weapons: Weapon[],
  weaponId: number,
) => {
  const weapon = weapons.find((weapon) => weapon.id === weaponId);
  if (weapon) {
    return supabase.storage
      .from("weapons portraits")
      .getPublicUrl(`${weapon.title}.webp`).data.publicUrl;
  }
  return "";
};
const getBannerPreviewUrl = (supabase: SupabaseClient, fileName: string) =>
  supabase.storage.from("wish banners").getPublicUrl(fileName).data.publicUrl;
export const getButtonsPortraitsUrl = (
  supabase: SupabaseClient,
  currentBanners: Banners[],
  characters: Character[],
  weapons: Weapon[],
): string[][] => {
  return currentBanners.map((banner) => {
    if (banner.type === "Weapon Event Wish") {
      const mainWeaponsId = [
        banner.first_main_weapon,
        banner.second_main_weapon,
      ];
      return mainWeaponsId.map((weaponId) =>
        getWeaponPortraitUrl(supabase, weapons, weaponId),
      );
    } else {
      return [
        getCharacterPortraitUrl(supabase, characters, banner.main_character),
      ];
    }
  });
};
export const getPreviewsUrlForCurrentBanners = (
  supabase: SupabaseClient,
  currentBanners: Banners[],
): string[] => {
  console.log("call!");
  return currentBanners.map((banner) => {
    const bannerTitle = striptags(banner.title);
    switch (banner.type) {
      case "Character Event Wish":
      case "Character Event Wish-2":
        return getBannerPreviewUrl(
          supabase,
          `${bannerTitle} ${banner.rerun_number}.webp`,
        );
      case "Weapon Event Wish":
        return getBannerPreviewUrl(
          supabase,
          `${bannerTitle} ${banner.date}.webp`,
        );
      case "Standard Wish":
        return getBannerPreviewUrl(
          supabase,
          `${bannerTitle} ${banner.preview_version}.webp`,
        );
      case "Novice Wish":
        return getBannerPreviewUrl(supabase, `${bannerTitle}.webp`);
    }
  });
};
export const getBannersSet = (
  banners: Banners[],
  version: Versions,
  phase: BannerPhases,
): Banners[] => {
  let standardBanner = null;
  let bannersByVersion = banners.filter((banner) => {
    if (banner.type === "Standard Wish") {
      if (banner.version <= currentGameVersion) standardBanner = banner;
    } else {
      return banner.version === version && banner.phase === phase;
    }
  });
  if (standardBanner) bannersByVersion.push(standardBanner);
  return bannersByVersion.sort(
    (firstBanner, secondBanner) =>
      bannerOrder[firstBanner.type] - bannerOrder[secondBanner.type],
  );
};
export const getBannerDrop = (
  banner: Banners,
  characters: Character[],
  weapons: Weapon[],
  featuredItems?: number[] | null,
) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      const characterBannerCharacters = characters.filter(
        (character) =>
          (character.in_standard_wish ||
            character.id === banner.main_character ||
            featuredItems?.includes(character.id)) &&
          !basedCharacters.includes(character.name) &&
          character.appearance_version <= currentGameVersion,
      );
      const characterBannerWeapons = weapons.filter(
        (weapon) =>
          weapon.in_standard_wish &&
          weapon.rare !== 5 &&
          weapon.appearance_version <= currentGameVersion,
      );
      return [...characterBannerCharacters, ...characterBannerWeapons];
    case "Standard Wish":
      const standardBannerCharacters = characters.filter(
        (character) =>
          character.in_standard_wish &&
          character.appearance_version < currentGameVersion,
      );
      const standardBannerWeapons = weapons.filter(
        (weapon) =>
          weapon.in_standard_wish &&
          weapon.appearance_version <= currentGameVersion,
      );
      return [...standardBannerCharacters, ...standardBannerWeapons];
    case "Weapon Event Wish":
      const weaponBannerCharacters = characters.filter(
        (character) =>
          character.in_standard_wish &&
          character.rare === 4 &&
          !basedCharacters.includes(character.name) &&
          character.appearance_version < currentGameVersion,
      );
      const weaponBannerWeapons = weapons.filter(
        (weapon) =>
          (weapon.in_standard_wish ||
            weapon.id === banner.first_main_weapon ||
            weapon.id === banner.second_main_weapon ||
            featuredItems?.includes(weapon.id)) &&
          weapon.appearance_version <= currentGameVersion,
      );
      return [...weaponBannerCharacters, ...weaponBannerWeapons];
    case "Novice Wish":
      const noviceBannerCharacters = characters.filter(
        (character) =>
          character.in_standard_wish &&
          character.appearance_version === 1 &&
          !basedCharacters.includes(character.name),
      );
      const noviceBannerWeapons = weapons.filter(
        (weapon) =>
          weapon.in_standard_wish &&
          weapon.rare === 3 &&
          weapon.appearance_version === 1,
      );
      return [...noviceBannerCharacters, ...noviceBannerWeapons];
  }
};
export const playSfxEffect = (path: string) => {
  const sfx = new Audio(path);
  sfx.play();
};
export const getBannerMainItemName = (
  banner: Banners,
  characters: Character[],
  weapons: Weapon[],
) => {
  if (banner.type !== "Weapon Event Wish") {
    const mainCharacter = characters.find(
      (character) => character.id === banner.main_character,
    );
    if (mainCharacter === undefined) {
      throw new Error("Not found character!");
    }
    return [mainCharacter.name];
  } else {
    const mainWeapons = weapons.filter(
      (weapon) =>
        weapon.id === banner.first_main_weapon ||
        weapon.id === banner.second_main_weapon,
    );
    return mainWeapons.map((weapon) => weapon.title);
  }
};
export const getFeaturedItems = async (
  supabase: SupabaseClient,
  banner: Banners,
) => {
  if (banner.type === "Weapon Event Wish") {
    const { data: featuredWeapons }: { data: { weapon_id: number }[] | null } =
      await supabase
        .from("featured_weapons_in_banners")
        .select("weapon_id")
        .eq("banner_id", banner.id);
    if (!featuredWeapons) {
      throw new Error(
        `Not found featured weapons for ${banner.id} weapon banner!`,
      );
    }
    return featuredWeapons.map((weaponId) => weaponId.weapon_id);
  } else if (
    banner.type === "Character Event Wish" ||
    banner.type === "Character Event Wish-2"
  ) {
    const {
      data: featuredCharacters,
    }: { data: { character_id: number }[] | null } = await supabase
      .from("featured_characters_in_banners")
      .select("character_id")
      .eq("banner_id", banner.id);
    if (!featuredCharacters) {
      throw new Error(
        `Not found featured characters for ${
          banner.title + "-" + banner.rerun_number
        } banner!`,
      );
    }
    return featuredCharacters.map((characterId) => characterId.character_id);
  } else {
    return null;
  }
};
export const getBannerStatName = (bannerType: BannerTypes) => {
  return bannerType.replace(/[^a-zA-Zа-яА-Я]/g, "");
};
export const getBannerColor = (banner: Banners, characters?: Character[]) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
    case "Novice Wish":
      return elementToColor[
        (
          characters?.find(
            (character) => character.id === banner.main_character,
          ) as Character
        ).element
      ];
    case "Weapon Event Wish":
      return "226,124,35";
    case "Standard Wish":
      if (currentGameVersion === 1) {
        return "230,98,106";
      } else {
        return "120,126,201";
      }
  }
};
