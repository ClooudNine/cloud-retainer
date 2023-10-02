import {Versions} from "@/app/types/common";

export type BannerType = "Character Event Wish" | "Character Event Wish-2" | "Weapon Event Wish" | "Novice Wish" | "Standard Wish";
export interface CharacterBanner {
    id: number,
    title: string,
    version: Versions,
    main_character: number,
    rerun_number: number,
    banner_type: BannerType
}

export interface WeaponBanner {
    id: number,
    title: string,
    version: Versions,
    main_character: number,
    rerun_number: number,
    banner_type: BannerType
}