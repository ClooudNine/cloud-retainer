"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { CharacterBanner, WeaponBanner } from "@/app/types/banner";
import { Weapon } from "@/app/types/weapon";
import { Character } from "@/app/types/character";

type BannerContextProviderProps = {
  children: React.ReactNode;
  banners: (CharacterBanner | WeaponBanner)[];
  bannersPreviews: string[];
  bannersPortraits: string[][];
  mainCharactersAndWeapons: (Character | Weapon[])[];
};

type BannerContext = {
  banners: (CharacterBanner | WeaponBanner)[];
  bannersPortraits: string[][];
  currentBanner: CharacterBanner | WeaponBanner;
  currentBannerPreviewUrl: string;
  currentBannerMainItem: Character | Weapon[];
  switchBanner: (
    banner: CharacterBanner | WeaponBanner,
    trigger: "Banner button" | "Arrow button",
  ) => void;
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
  children,
  banners,
  bannersPreviews,
  bannersPortraits,
  mainCharactersAndWeapons,
}: BannerContextProviderProps) {
  const [currentBanner, setCurrentBanner] = useState<
    CharacterBanner | WeaponBanner
  >(banners[0]);

  const [currentBannerPreviewUrl, setCurrentBannerPreviewUrl] =
    useState<string>(bannersPreviews[0]);

  const [currentBannerMainItem, setCurrentBannerMainItem] = useState<
    Character | Weapon[]
  >(mainCharactersAndWeapons[0]);

  const switchBanner = useCallback(
    (
      banner: CharacterBanner | WeaponBanner,
      trigger: "Banner button" | "Arrow button",
    ) => {
      const soundEffect = new Audio();
      if (trigger === "Banner button") {
        soundEffect.src = "/sounds/click-on-banner.mp3";
      } else {
        soundEffect.src = "/sounds/click-on-arrow.mp3";
      }
      soundEffect.play();
      const bannerIndex = banners.indexOf(banner);
      setCurrentBanner(banner);
      setCurrentBannerPreviewUrl(bannersPreviews[bannerIndex]);
      setCurrentBannerMainItem(mainCharactersAndWeapons[bannerIndex]);
    },
    [banners, bannersPreviews, mainCharactersAndWeapons],
  );

  return (
    <BannerContext.Provider
      value={{
        banners,
        bannersPortraits,
        currentBanner,
        currentBannerPreviewUrl,
        currentBannerMainItem,
        switchBanner,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}

export function useBannerContext() {
  const context = useContext(BannerContext);
  if (context === null) {
    throw new Error(
      "useBannerContext must be used within a BannerContextProvider",
    );
  }
  return context;
}
