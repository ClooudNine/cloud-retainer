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
import {
  currentGamePhase,
  currentGameVersion,
  WishHistory,
} from "@/app/types/common";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getBannerDrop,
  getBannersSet,
  getBannerStatName,
  getButtonsPortraitsUrl,
  getFeaturedItems,
  getPreviewsUrlForCurrentBanners,
  playSfxEffect,
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
  const [currentBanners, setCurrentBanners] = useState<Banners[]>(() =>
    getBannersSet(allGameBanners, currentGameVersion, currentGamePhase),
  );
  const [currentBannersPortraits, setCurrentBannersPortraits] = useState<
    string[][]
  >(() =>
    getButtonsPortraitsUrl(supabase, currentBanners, characters, weapons),
  );
  const [currentBannersPreviewsUrl, setCurrentBannersPreviewsUrl] = useState<
    string[]
  >(() => getPreviewsUrlForCurrentBanners(supabase, currentBanners));
  const [selectedBanner, setSelectedBanner] = useState<Banners>(
    currentBanners[0],
  );
  const [selectedBannerDrop, setSelectedBannerDrop] = useState<
    (Character | Weapon)[]
  >(() => getBannerDrop(selectedBanner, characters, weapons));
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
    const bannerTypes: BannerTypes[] = [
      "Character Event Wish",
      "Character Event Wish-2",
      "Weapon Event Wish",
      "Standard Wish",
      "Novice Wish",
    ];
    bannerTypes.forEach((bannerType) => {
      const storageName = getBannerStatName(bannerType);
      const bannerState = localStorage.getItem(storageName);
      if (bannerState === null) {
        let baseBannerState: Record<string, number | boolean | WishHistory> = {
          fourStarCounter: 0,
          fiveStarCounter: 0,
          history: [],
        };
        if (
          storageName === "WeaponEventWish" ||
          storageName === "CharacterEventWish"
        ) {
          baseBannerState.fourStarGuaranteed = false;
          baseBannerState.fiveStarGuaranteed = false;
        }
        localStorage.setItem(storageName, JSON.stringify(baseBannerState));
      }
    });
    if (!localStorage.getItem("EpitomizedPath")) {
      localStorage.setItem("EpitomizedPath", JSON.stringify({}));
    }
  }, []);
  const switchBanner = useCallback(
    (banner: Banners, trigger: "Banner button" | "Arrow button") => {
      if (trigger === "Banner button") {
        playSfxEffect("/sounds/click-on-banner.mp3");
      } else {
        playSfxEffect("/sounds/click-on-arrow.mp3");
      }
      if (banner !== selectedBanner) {
        localStorage.setItem("lastBanner", getBannerStatName(banner.type));
        setSelectedBanner(banner);
        setSelectedBannerDrop(getBannerDrop(banner, characters, weapons));
        getFeaturedItems(supabase, banner).then(setSelectedBannerFeaturedItems);
      }
    },
    [characters, selectedBanner, supabase, weapons],
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
