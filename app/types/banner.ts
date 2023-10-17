import {Versions} from "@/app/types/common";

export type BannerType = "Character Event Wish" | "Character Event Wish-2" | "Weapon Event Wish" | "Novice Wish" | "Standard Wish";
export type BannerPhases = 1 | 2;
type nameOffsets = {"r": number, "b": number};
export interface CharacterBanner {
    id: number,
    title: string,
    version: Versions,
    main_character: number,
    rerun_number: number,
    type: BannerType
    phase: BannerPhases,
    color_palette: string,
    name_offsets: nameOffsets;
}

export interface WeaponBanner {
    id: number,
    title: string,
    version: Versions,
    first_main_weapon: number,
    second_main_weapon: number,
    date: Date,
    phase: BannerPhases,
    type: 'Weapon Event Wish',
    color_palette: string,
    name_offsets: nameOffsets;
}
export const bannerOrder: { [key in BannerType]: number } = {
    "Novice Wish": 1,
    "Character Event Wish": 2,
    "Character Event Wish-2": 3,
    "Weapon Event Wish": 4,
    "Standard Wish": 5,
};

export const bannerDescriptions: { [key in BannerType]: string } = {
    "Novice Wish": '"As a dutiful main would."',
    "Character Event Wish": "5-star event-exclusive characters can only be obtained in the specified wish during the specified time period(s). View Details for more.",
    "Character Event Wish-2": "5-star event-exclusive characters can only be obtained in the specified wish during the specified time period(s). View Details for more.",
    "Weapon Event Wish": "View Details for more.",
    "Standard Wish": "Standard wishes have no time limit. View Details for more.",
};

export const bannerSecondTitle: { [key in BannerType]: string } = {
    "Novice Wish": "10-set 20% off. First 10-set will receive Noelle",
    "Character Event Wish": "Probability increased!",
    "Character Event Wish-2": "Probability increased!",
    "Weapon Event Wish": "Probability increased!",
    "Standard Wish": "Standard Wish",
};