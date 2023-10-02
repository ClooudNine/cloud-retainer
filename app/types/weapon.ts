import {Rares} from "@/app/types/common";

export type WeaponType = "Sword" | "Claymore" | "Polearm" | "Catalyst" | "Bow";
export interface Weapon {
    id: number,
    title: string,
    rare: Rares,
    type: WeaponType
}