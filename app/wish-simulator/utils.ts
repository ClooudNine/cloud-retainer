import {
  bannerOrder,
  BannerPhases,
  Banners,
  BannerTypes,
} from "@/app/types/banner";
import {
  basedCharacters,
  currentGameVersion,
  Rares,
  Versions,
} from "@/app/types/common";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { SupabaseClient } from "@supabase/supabase-js";
import striptags from "striptags";

const getNearestVersion = (
  availableVersions: Versions[],
  currentGameVersion: Versions,
) => {
  return availableVersions.reduce((prev, curr) => {
    return Math.abs(curr - currentGameVersion) <
      Math.abs(prev - currentGameVersion)
      ? curr
      : prev;
  });
};
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
  return currentBanners.map((banner) => {
    const bannerTitle = striptags(banner.title);
    switch (banner.type) {
      case "Character Event Wish":
      case "Character Event Wish-2":
        return supabase.storage
          .from("wish banners")
          .getPublicUrl(`${bannerTitle} ${banner.rerun_number}.webp`).data
          .publicUrl;
      case "Weapon Event Wish":
        return supabase.storage
          .from("wish banners")
          .getPublicUrl(`${bannerTitle} ${banner.date}.webp`).data.publicUrl;
      case "Standard Wish":
        return supabase.storage
          .from("wish banners")
          .getPublicUrl(`${bannerTitle} ${banner.preview_version}.webp`).data
          .publicUrl;
      case "Novice Wish":
        return supabase.storage
          .from("wish banners")
          .getPublicUrl(`${bannerTitle}.webp`).data.publicUrl;
    }
  });
};
export const getBannersSet = (
  banners: Banners[],
  version: Versions,
  phase: BannerPhases,
): Banners[] => {
  const standardBanners = banners.filter(
    (banner) => banner.type === "Standard Wish",
  );
  const standardBannerVersions = standardBanners.map(
    (standardBanner) => standardBanner.version,
  );
  const standardBannerVersion = getNearestVersion(
    standardBannerVersions,
    version,
  );
  const bannersByVersion = banners.filter((banner) => {
    if (banner.type === "Standard Wish") {
      return banner.version === standardBannerVersion;
    }
    return banner.version === version && banner.phase === phase;
  });
  return bannersByVersion.sort(
    (firstBanner, secondBanner) =>
      bannerOrder[firstBanner.type] - bannerOrder[secondBanner.type],
  );
};
export const getBannerDrop = (
  banner: Banners,
  characters: Character[],
  weapons: Weapon[],
) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      const characterBannerCharacters = characters.filter(
        (character) =>
          (character.in_standard_wish ||
            character.id === banner.main_character) &&
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
            weapon.id === banner.second_main_weapon) &&
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
export const playObtainAudioByRare = (rare: Rares) => {
  const soundEffect = new Audio(`/sounds/${rare}-star-item-obtain.mp3`);
  soundEffect.play();
};
export const playSfxEffect = (path: string) => {
  const sfx = new Audio(path);
  sfx.play();
};
export const getBannerItemName = (
  banner: Banners,
  characters: Character[],
  weapons: Weapon[],
  index: number,
) => {
  if (banner.type !== "Weapon Event Wish") {
    const mainCharacter = characters.find(
      (character) => character.id === banner.main_character,
    ) as Character;
    return mainCharacter.name;
  } else {
    const mainWeapon = weapons.find((weapon) =>
      index === 0
        ? weapon.id === banner.first_main_weapon
        : weapon.id === banner.second_main_weapon,
    ) as Weapon;
    return mainWeapon.title;
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
      return null;
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
      return null;
    }
    return featuredCharacters.map((characterId) => characterId.character_id);
  } else {
    return null;
  }
};
export const getBannerStatName = (bannerType: BannerTypes) => {
  return bannerType.replace(/[^a-zA-Zа-яА-Я]/g, "");
};
