"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BannerItems, Banners, BannerTypes } from "@/app/lib/banner";
import { Weapon } from "@/app/lib/weapon";
import { Character } from "@/app/lib/character";
import {
  currentGamePhase,
  currentGameVersion,
  PaymentValets,
  WishHistory,
} from "@/app/lib/common";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getBannerDrop,
  getBannersSet,
  getBannerStatName,
  getButtonsPortraitsUrl,
  getFeaturedItems,
} from "@/app/wish-simulator/utils";
import WishDrop from "@/app/wish-simulator/components/WishDrop";

type BannerContextProviderProps = {
  children: React.ReactNode;
  banners: Banners[];
  characters: Character[];
  weapons: Weapon[];
};
type BannerContext = {
  characters: Character[];
  weapons: Weapon[];
  currentBanners: Banners[];
  currentBannersPortraits: string[][];
  selectedBanner: Banners;
  selectedBannerDrop: (Character | Weapon)[];
  selectedBannerFeaturedItems: number[] | null;
  paymentValet: PaymentValets;
  switchBanner: (banner: Banners) => void;
  setDroppedItems: React.Dispatch<React.SetStateAction<(Character | Weapon)[]>>;
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
  children,
  banners,
  characters,
  weapons,
}: BannerContextProviderProps) {
  const supabase = createClientComponentClient();
  const [audio] = useState<HTMLAudioElement | null>(
    typeof window !== "undefined"
      ? new Audio("/sounds/statue-of-the-seven.mp3")
      : null,
  );
  const [currentBanners, setCurrentBanners] = useState<Banners[]>(() =>
    getBannersSet(banners, currentGameVersion, currentGamePhase),
  );
  const [currentBannersPortraits, setCurrentBannersPortraits] = useState<
    string[][]
  >(() =>
    getButtonsPortraitsUrl(supabase, currentBanners, characters, weapons),
  );
  const [selectedBanner, setSelectedBanner] = useState<Banners>(
    currentBanners[0],
  );
  const [selectedBannerFeaturedItems, setSelectedBannerFeaturedItems] =
    useState<number[] | null>(null);
  const [selectedBannerDrop, setSelectedBannerDrop] = useState<
    (Character | Weapon)[]
  >([]);
  const [paymentValet, setPaymentValet] =
    useState<PaymentValets>("intertwined-fate");
  const [droppedItems, setDroppedItems] = useState<BannerItems>([]);
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
    if (!localStorage.getItem("Balance")) {
      localStorage.setItem(
        "Balance",
        JSON.stringify({
          "intertwined-fate": 0,
          "acquaint-fate": 20,
          primogems: 1600,
          "masterless-stardust": 0,
          "masterless-starglitter": 0,
        }),
      );
    }
  }, []);
  useEffect(() => {
    if (droppedItems.length > 0) {
      audio?.pause();
    } else {
      audio?.play();
      audio!.loop = true;
    }
    return () => {
      audio?.pause();
    };
  }, [audio, droppedItems.length]);
  useEffect(() => {
    setSelectedBannerDrop(
      getBannerDrop(
        selectedBanner,
        characters,
        weapons,
        selectedBannerFeaturedItems,
      ),
    );
  }, [characters, selectedBanner, selectedBannerFeaturedItems, weapons]);
  const switchBanner = useCallback(
    (banner: Banners) => {
      if (banner !== selectedBanner) {
        if (banner.type === "Standard Wish") {
          setPaymentValet("acquaint-fate");
        } else {
          setPaymentValet("intertwined-fate");
        }
        localStorage.setItem("lastBanner", getBannerStatName(banner.type));
        setSelectedBanner(banner);
        getFeaturedItems(supabase, banner).then(setSelectedBannerFeaturedItems);
      }
    },
    [selectedBanner, supabase],
  );
  return (
    <BannerContext.Provider
      value={{
        characters,
        weapons,
        currentBanners,
        currentBannersPortraits,
        selectedBanner,
        selectedBannerDrop,
        selectedBannerFeaturedItems,
        paymentValet,
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
