"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { CharacterBanner, WeaponBanner } from "@/app/types/banner";
import { Weapon } from "@/app/types/weapon";
import { Character } from "@/app/types/character";
import { currentGamePhase, currentGameVersion } from "@/app/types/common";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getBannersSet,
  getButtonsPortraitsUrl,
  getPreviewsUrlForCurrentBanners,
} from "@/app/wish-simulator/utils";

type BannerContextProviderProps = {
  children: React.ReactNode;
  allGameBanners: (CharacterBanner | WeaponBanner)[];
  characters: Character[];
  weapons: Weapon[];
};

type BannerContext = {
  characters: Character[];
  weapons: Weapon[];
  currentBanners: (CharacterBanner | WeaponBanner)[];
  currentBannersPortraits: string[][];
  selectedBanner: CharacterBanner | WeaponBanner;
  selectedBannerPreviewUrl: string;
  switchBanner: (
    banner: CharacterBanner | WeaponBanner,
    trigger: "Banner button" | "Arrow button",
  ) => void;
  isAnimate: boolean;
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
  children,
  allGameBanners,
  characters,
  weapons,
}: BannerContextProviderProps) {
  const supabase = createClientComponentClient();

  const [currentBanners, setCurrentBanners] = useState<
    (CharacterBanner | WeaponBanner)[]
  >(getBannersSet(allGameBanners, currentGameVersion, currentGamePhase));

  const [currentBannersPortraits, setCurrentBannersPortraits] = useState(
    getButtonsPortraitsUrl(supabase, currentBanners, characters, weapons),
  );

  const [currentBannersPreviewsUrl, setCurrentBannersPreviewsUrl] = useState<
    string[]
  >(getPreviewsUrlForCurrentBanners(supabase, currentBanners));

  const [selectedBanner, setSelectedBanner] = useState<
    CharacterBanner | WeaponBanner
  >(currentBanners[0]);

  const [selectedBannerPreviewUrl, setSelectedBannerPreviewUrl] =
    useState<string>(currentBannersPreviewsUrl[0]);

  const [isAnimate, setIsAnimate] = useState(false);

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
      if (banner !== selectedBanner) {
        setIsAnimate(true);
        const bannerIndex = currentBanners!.indexOf(banner);
        setSelectedBanner(banner);
        setSelectedBannerPreviewUrl(currentBannersPreviewsUrl[bannerIndex]);
        setTimeout(() => setIsAnimate(false), 100);
      }
    },
    [currentBanners, currentBannersPreviewsUrl, selectedBanner],
  );

  return (
    <BannerContext.Provider
      value={{
        characters,
        weapons,
        currentBanners,
        currentBannersPortraits,
        selectedBanner,
        selectedBannerPreviewUrl,
        switchBanner,
        isAnimate,
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
