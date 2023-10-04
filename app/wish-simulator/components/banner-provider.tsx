'use client'
import React, {createContext, useCallback, useContext, useState} from 'react'
import {CharacterBanner, WeaponBanner} from "@/app/types/banner"

type BannerContextProviderProps = {
    children: React.ReactNode;
    banners: (CharacterBanner | WeaponBanner)[];
    bannersPreviews: string[];
}

type BannerContext = {
    banners: (CharacterBanner | WeaponBanner)[];
    currentBanner: CharacterBanner | WeaponBanner;
    currentBannerPreviewUrl: string;
    switchBanner: (banner: CharacterBanner | WeaponBanner) => void;
}
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({children, banners, bannersPreviews} : BannerContextProviderProps) {
    const [currentBanner, setCurrentBanner] =
        useState<CharacterBanner | WeaponBanner>(banners[0]);

    const [currentBannerPreviewUrl, setCurrentBannerPreviewUrl] =
        useState<string>(bannersPreviews[0]);

    const switchBanner = useCallback((banner: CharacterBanner | WeaponBanner) => {
            setCurrentBanner(banner);
            setCurrentBannerPreviewUrl(bannersPreviews[banners.indexOf(banner)]);
    },[banners, bannersPreviews]);

    return (
        <BannerContext.Provider
            value={{
                banners,
                currentBanner,
                currentBannerPreviewUrl,
                switchBanner
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
            "useBannerContext must be used within a BannerContextProvider"
        );
    }
    return context
}