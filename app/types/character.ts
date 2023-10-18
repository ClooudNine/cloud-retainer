import { Elements, Rares, Versions } from "@/app/types/common";
import { WeaponType } from "@/app/types/weapon";

export interface Character {
  id: number;
  name: string;
  rare: Rares;
  element: Elements;
  rerun_number: number;
  weapon_type: WeaponType;
  appearance_version: Versions;
  title: string;
}
