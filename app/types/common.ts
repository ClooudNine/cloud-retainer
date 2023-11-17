import { BannerPhases } from "@/app/types/banner";

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

export const currentGameVersion: Versions = 4.1;
export const currentGamePhase: BannerPhases = 1;
export const basedCharacters = ["Amber", "Kaeya", "Lisa"];
