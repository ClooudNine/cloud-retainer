'use client';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    Balance,
    currentGamePhase,
    currentGameVersion,
    PullCurrency,
} from '@/lib/common';
import { getBannerDrop, getBannersSet } from '@/app/wish-simulator/utils';
import WishDrop from '@/app/wish-simulator/components/WishDrop';
import { BannerItems, Banners, WishHistory, WishHistoryTypes } from '@/lib/banners';
import { BannerTypes, Character, Weapon } from '@/lib/db/schema';

type BannerContextProviderProps = {
    children: React.ReactNode;
    banners: Banners[];
    characters: Character[];
    weapons: Weapon[];
};
type BannerContext = {
    audio: React.MutableRefObject<HTMLAudioElement | undefined>;
    characters: Character[];
    weapons: Weapon[];
    currentBanners: Banners[];
    selectedBanner: Banners;
    drop: BannerItems;
    featuredItems: number[] | null;
    pullCurrency: PullCurrency;
    balance: { [key in Balance]: number };
    switchBanner: (banner: Banners) => void;
    setDroppedItems: React.Dispatch<React.SetStateAction<(Character | Weapon)[]>>;
};
const getFeaturedItems = async (id: number, type: BannerTypes) => {
    const res = await fetch(
        `http://localhost:3000/api/featuredItems?id=${id}&type=${type}`
    );
    const featuredItems = await res.json();
    return (featuredItems.res as { id: number }[]).map((itemId) => itemId.id);
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
    children,
    banners,
    characters,
    weapons,
}: BannerContextProviderProps) {
    const audio = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== 'undefined'
            ? new Audio('/sounds/statue-of-the-seven.mp3')
            : undefined
    );

    const [currentBanners, setCurrentBanners] = useState<Banners[]>(() =>
        getBannersSet(banners, currentGameVersion, currentGamePhase)
    );

    const [selectedBanner, setSelectedBanner] = useState<Banners>(currentBanners[0]);

    const [featuredItems, setFeaturedItems] = useState<number[]>([]);
    const [drop, setDrop] = useState<(Character | Weapon)[]>([]);

    const [pullCurrency, setPullCurrency] = useState<PullCurrency>('intertwined-fate');
    const [balance, setBalance] = useState<{ [key in Balance]: number }>({
        'intertwined-fate': 0,
        'acquaint-fate': 20,
        primogems: 1600,
        'masterless-stardust': 0,
        'masterless-starglitter': 0,
    });

    const [droppedItems, setDroppedItems] = useState<BannerItems>([]);

    useEffect(() => {
        audio.current?.play();
        getFeaturedItems(selectedBanner.id, selectedBanner.type).then((result) => {
            setFeaturedItems(result);
            setDrop(getBannerDrop(selectedBanner, characters, weapons, result));
        });
        const historyTypes: WishHistoryTypes[] = [
            'CharacterEventWish',
            'WeaponEventWish',
            'StandardWish',
            'NoviceWish',
        ];
        historyTypes.forEach((bannerType) => {
            const bannerState = localStorage.getItem(bannerType);
            if (bannerState === null) {
                let baseBannerState: Record<string, number | boolean | WishHistory> = {
                    fourStarCounter: 0,
                    fiveStarCounter: 0,
                    history: [],
                };
                if (
                    bannerType === 'WeaponEventWish' ||
                    bannerType === 'CharacterEventWish'
                ) {
                    baseBannerState.fourStarGuaranteed = false;
                    baseBannerState.fiveStarGuaranteed = false;
                }
                localStorage.setItem(bannerType, JSON.stringify(baseBannerState));
            }
        });

        if (!localStorage.getItem('EpitomizedPath')) {
            localStorage.setItem('EpitomizedPath', JSON.stringify({}));
        }

        if (localStorage.getItem('Balance')) {
            setBalance(JSON.parse(localStorage.getItem('Balance')!));
        }
    }, []);

    const switchBanner = useCallback(
        (banner: Banners) => {
            if (banner !== selectedBanner) {
                setSelectedBanner(banner);
                if (banner.type === 'Standard Wish' || banner.type === 'Novice Wish') {
                    setPullCurrency('acquaint-fate');
                    setDrop(getBannerDrop(banner, characters, weapons));
                } else {
                    setPullCurrency('intertwined-fate');
                    getFeaturedItems(banner.id, banner.type).then((result) => {
                        setFeaturedItems(result);
                        setDrop(getBannerDrop(banner, characters, weapons, result));
                    });
                }
            }
        },
        [characters, selectedBanner, weapons]
    );

    return (
        <BannerContext.Provider
            value={{
                audio,
                characters,
                weapons,
                currentBanners,
                selectedBanner,
                drop,
                featuredItems,
                pullCurrency,
                balance,
                switchBanner,
                setDroppedItems,
            }}
        >
            {children}
            {droppedItems.length > 0 && <WishDrop droppedItems={droppedItems} />}
        </BannerContext.Provider>
    );
}

export function useBannerContext() {
    const context = useContext(BannerContext);
    if (context === null) {
        throw new Error('useBannerContext must be used within a BannerContextProvider');
    }
    return context;
}
