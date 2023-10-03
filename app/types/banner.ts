import {Versions} from "@/app/types/common";

export type BannerType = "Character Event Wish" | "Character Event Wish-2" | "Weapon Event Wish" | "Novice Wish" | "Standard Wish";
export type BannerPhases = 1 | 2;
export interface CharacterBanner {
    id: number,
    title: string,
    version: Versions,
    main_character: number,
    rerun_number: number,
    banner_type: BannerType
    phase: BannerPhases
}

export interface WeaponBanner {
    id: number,
    title: string,
    version: Versions,
    first_main_weapon: number,
    second_main_weapon: number,
    date: Date,
    phase: BannerPhases
}