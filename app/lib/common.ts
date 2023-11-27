import { BannerPhases } from "@/app/lib/banner";

export type Rares = 1 | 2 | 3 | 4 | 5;
export type Versions =
  | 1
  | 1.1
  | 1.2
  | 1.3
  | 1.4
  | 1.5
  | 1.6
  | 2
  | 2.1
  | 2.2
  | 2.3
  | 2.4
  | 2.5
  | 2.6
  | 2.7
  | 2.8
  | 3
  | 3.1
  | 3.2
  | 3.3
  | 3.4
  | 3.5
  | 3.6
  | 3.7
  | 3.8
  | 4
  | 4.1
  | 4.2;
export type Elements =
  | "Hydro"
  | "Cryo"
  | "Pyro"
  | "Anemo"
  | "Dendro"
  | "Geo"
  | "Electro";

export type EpitomizedStats = { weaponId: number; count: number };
export type EpitomizedPath = { [key: string]: EpitomizedStats };
export type WishHistory = {
  type: string;
  item: { name: string; rare: Rares };
  wishType: string;
  date: string;
}[];
export const currentGameVersion: Versions = 4.1;
export const currentGamePhase: BannerPhases = 1;
export const basedCharacters = ["Amber", "Kaeya", "Lisa"];
export const elementToColor: { [key in Elements]: string } = {
  Anemo: "58,152,150",
  Dendro: "106,170,32",
  Cryo: "52,170,203",
  Electro: "105,88,190",
  Pyro: "234,75,33",
  Geo: "202,143,72",
  Hydro: "80,145,205",
};
