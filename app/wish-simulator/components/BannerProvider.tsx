"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BannerItems, Banners, BannerTypes } from "@/app/types/banner";
import { Weapon } from "@/app/types/weapon";
import { Character } from "@/app/types/character";
import { currentGamePhase, currentGameVersion } from "@/app/types/common";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getBannerDrop,
  getBannersSet,
  getButtonsPortraitsUrl,
  getFeaturedItems,
  getPreviewsUrlForCurrentBanners,
} from "@/app/wish-simulator/utils";
import WishDrop from "@/app/wish-simulator/components/WishDrop";

type BannerContextProviderProps = {
  children: React.ReactNode;
  allGameBanners: Banners[];
  characters: Character[];
  weapons: Weapon[];
};

type BannerContext = {
  characters: Character[];
  weapons: Weapon[];
  currentBanners: Banners[];
  currentBannersPortraits: string[][];
  currentBannersPreviewsUrl: string[];
  selectedBanner: Banners;
  selectedBannerDrop: (Character | Weapon)[];
  selectedBannerFeaturedItems: number[] | null;
  switchBanner: (
    banner: Banners,
    trigger: "Banner button" | "Arrow button",
  ) => void;
  setDroppedItems: React.Dispatch<React.SetStateAction<(Character | Weapon)[]>>;
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
  children,
  allGameBanners,
  characters,
  weapons,
}: BannerContextProviderProps) {
  const supabase = createClientComponentClient();
  const backgroundMusic = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/statue-of-the-seven.mp3")
      : undefined,
  );
  const [currentBanners, setCurrentBanners] = useState<Banners[]>(
    getBannersSet(allGameBanners, currentGameVersion, currentGamePhase),
  );
  const [currentBannersPortraits, setCurrentBannersPortraits] = useState(
    getButtonsPortraitsUrl(supabase, currentBanners, characters, weapons),
  );
  const [currentBannersPreviewsUrl, setCurrentBannersPreviewsUrl] = useState<
    string[]
  >(getPreviewsUrlForCurrentBanners(supabase, currentBanners));
  const [selectedBanner, setSelectedBanner] = useState<Banners>(
    currentBanners[0],
  );
  const [selectedBannerDrop, setSelectedBannerDrop] = useState<
    (Character | Weapon)[]
  >(getBannerDrop(selectedBanner, characters, weapons));
  const [selectedBannerFeaturedItems, setSelectedBannerFeaturedItems] =
    useState<number[] | null>(null);
  const [droppedItems, setDroppedItems] = useState<BannerItems>([]);

  useEffect(() => {
    if (droppedItems.length > 0) {
      backgroundMusic.current?.pause();
    } else {
      backgroundMusic.current?.play();
      backgroundMusic.current!.loop = true;
    }
  }, [backgroundMusic, droppedItems.length]);

  useEffect(() => {
    getFeaturedItems(supabase, selectedBanner).then(
      setSelectedBannerFeaturedItems,
    );
  }, [supabase, selectedBanner]);

  useEffect(() => {
    const bannerTypes: BannerTypes[] = [
      "Character Event Wish",
      "Character Event Wish-2",
      "Weapon Event Wish",
      "Standard Wish",
      "Novice Wish",
    ];
    bannerTypes.forEach((bannerType) => {
      const bannerTypeStorageName = bannerType.replace(/[^a-zA-Zа-яА-Я]/g, "");
      const bannerState = localStorage.getItem(bannerTypeStorageName);
      if (bannerState === null) {
        let baseBannerState: Record<string, number | boolean> = {
          fourStarCounter: 0,
          fiveStarCounter: 0,
        };
        if (
          bannerTypeStorageName === "WeaponEventWish" ||
          bannerTypeStorageName === "CharacterEventWish"
        ) {
          baseBannerState.fourStarGuaranteed = false;
          baseBannerState.fiveStarGuaranteed = false;
        }
        localStorage.setItem(
          bannerTypeStorageName,
          JSON.stringify(baseBannerState),
        );
      }
    });
    if (!localStorage.getItem("EpitomizedPath")) {
      localStorage.setItem("EpitomizedPath", JSON.stringify({}));
    }
  });
  const switchBanner = useCallback(
    (banner: Banners, trigger: "Banner button" | "Arrow button") => {
      const soundEffect = new Audio();
      if (trigger === "Banner button") {
        soundEffect.src = "/sounds/click-on-banner.mp3";
      } else {
        soundEffect.src = "/sounds/click-on-arrow.mp3";
      }
      soundEffect.play();
      if (banner !== selectedBanner) {
        setSelectedBanner(banner);
        setSelectedBannerDrop(getBannerDrop(banner, characters, weapons));
      }
    },
    [characters, selectedBanner, weapons],
  );

  return (
    <BannerContext.Provider
      value={{
        characters,
        weapons,
        currentBanners,
        currentBannersPortraits,
        currentBannersPreviewsUrl,
        selectedBanner,
        selectedBannerDrop,
        selectedBannerFeaturedItems,
        switchBanner,
        setDroppedItems,
      }}
    >
      {children}
      {droppedItems.length > 0 ? <WishDrop droppedItems={droppedItems} /> : ""}
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
