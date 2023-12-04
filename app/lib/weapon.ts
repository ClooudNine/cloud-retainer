import { Rares, Versions } from "@/app/lib/common";

export type WeaponType = "Sword" | "Claymore" | "Polearm" | "Catalyst" | "Bow";

export type Weapon = {
  id: number;
  title: string;
  rare: Rares;
  type: WeaponType;
  in_standard_wish: boolean;
  appearance_version: Versions;
};