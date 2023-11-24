import { Versions } from "@/app/types/common";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";

export type BannerTypes =
  | "Character Event Wish"
  | "Character Event Wish-2"
  | "Weapon Event Wish"
  | "Novice Wish"
  | "Standard Wish";
export type Banners = CharacterBanner | WeaponBanner | StandardBanner;

export type BannerPhases = 1 | 2;
export type BannerItems = (Character | Weapon)[];
export type TextParameters = {
  r: string;
  b: string;
  fontSize: string;
};
export type NamesOffsets = {
  [name: string]: TextParameters;
};

export type CharacterBanner = {
  id: number;
  title: string;
  version: Versions;
  main_character: number;
  rerun_number: number;
  type: "Character Event Wish" | "Character Event Wish-2" | "Novice Wish";
  phase: BannerPhases;
  text_parameters: TextParameters;
};

export type StandardBanner = {
  id: number;
  title: string;
  main_character: number;
  version: Versions;
  preview_version: number;
  text_parameters: NamesOffsets;
  type: "Standard Wish";
};

export type WeaponBanner = {
  id: number;
  title: string;
  version: Versions;
  first_main_weapon: number;
  second_main_weapon: number;
  date: Date;
  phase: BannerPhases;
  type: "Weapon Event Wish";
  name_offsets: NamesOffsets;
  four_star_weapon_on_banner: string;
};
export const bannerOrder: { [key in BannerTypes]: number } = {
  "Novice Wish": 1,
  "Character Event Wish": 2,
  "Character Event Wish-2": 3,
  "Weapon Event Wish": 4,
  "Standard Wish": 5,
};
export const bannerDescriptions: { [key in BannerTypes]: string } = {
  "Novice Wish": '"As a dutiful main would."',
  "Character Event Wish":
    "5-star event-exclusive characters can only be obtained in the specified wish during the specified time period(s). View Details for more.",
  "Character Event Wish-2":
    "5-star event-exclusive characters can only be obtained in the specified wish during the specified time period(s). View Details for more.",
  "Weapon Event Wish": "View Details for more.",
  "Standard Wish": "Standard wishes have no time limit. View Details for more.",
};
export const bannerSecondTitle: { [key in BannerTypes]: string } = {
  "Novice Wish": "10-set 20% off. First 10-set will receive Noelle",
  "Character Event Wish": "Probability increased!",
  "Character Event Wish-2": "Probability increased!",
  "Weapon Event Wish": "Probability increased!",
  "Standard Wish": "Standard Wish",
};
export const bannerStorages: { [key: string]: string } = {
  StandardWish: "Стандартная молитва",
  NoviceWish: "Молитва новичка",
  CharacterEventWish:
    "Молитва события персонажа и Молитва события персонажа II",
  WeaponEventWish: "Молитва события оружия",
};
export const bannerTranslates: { [key in BannerTypes]: string } = {
  "Novice Wish": "Молитва новичка",
  "Character Event Wish": "Молитва события персонажа",
  "Character Event Wish-2": "Молитва события персонажа II",
  "Weapon Event Wish": "Молитва события оружия",
  "Standard Wish": "Стандартная молитва",
};
