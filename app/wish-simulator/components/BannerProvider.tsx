'use client';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    BalanceStats,
    Currencies,
    currentGamePhase,
    currentGameVersion,
    PullCurrency,
} from '@/lib/common';
import {
    getBannerDrop,
    getBannersSet,
    getFeaturedItems,
} from '@/app/wish-simulator/utils';
import WishDrop from '@/app/wish-simulator/components/WishDrop';
import { BannerItems, Banners, WishHistory, WishHistoryTypes } from '@/lib/banners';
import { Character, Weapon } from '@/lib/db/schema';

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
    selectedBanner: Banners;
    drop: BannerItems;
    featuredItems: number[] | null;
    pullCurrency: PullCurrency;
    balance: { [key in Currencies]: number };
    setBalance: (newBalance: { [key in Currencies]: number }) => void;
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
    const [currentBanners, setCurrentBanners] = useState<Banners[]>(() =>
        getBannersSet(banners, currentGameVersion, currentGamePhase)
    );

    const [selectedBanner, setSelectedBanner] = useState<Banners>(currentBanners[0]);

    const [featuredItems, setFeaturedItems] = useState<number[]>([]);
    const [drop, setDrop] = useState<(Character | Weapon)[]>([]);

    const [pullCurrency, setPullCurrency] = useState<PullCurrency>('intertwined-fate');
    const [balance, setBalance] = useState<BalanceStats>({
        'intertwined-fate': 0,
        'acquaint-fate': 20,
        primogems: 3200,
        'masterless-stardust': 0,
        'masterless-starglitter': 0,
        'genesis-crystal': 0,
    });

    const [droppedItems, setDroppedItems] = useState<BannerItems>([]);

    useEffect(() => {
        const noviceWishStat = localStorage.getItem('NoviceWish');
        if (noviceWishStat) {
            const noviceWishPullCount = JSON.parse(noviceWishStat).history;
            if (noviceWishPullCount < 20) {
                const noviceWish = banners.find(
                    (banner) => banner.type === 'Novice Wish'
                ) as Banners;
                setCurrentBanners([noviceWish, ...currentBanners]);
            }
        }
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

        const maybeBalance = localStorage.getItem('Balance');
        if (maybeBalance) {
            setBalance(JSON.parse(maybeBalance));
        }
    }, []);

    const switchBanner = useCallback(
        (banner: Banners) => {
            if (banner !== selectedBanner) {
                localStorage.setItem('LastBanner', banner.type);
                setSelectedBanner(banner);
                if (banner.type === 'Standard Wish' || banner.type === 'Novice Wish') {
                    setPullCurrency('acquaint-fate');
                    setFeaturedItems([]);
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
                characters,
                weapons,
                currentBanners,
                selectedBanner,
                drop,
                featuredItems,
                pullCurrency,
                balance,
                setBalance,
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
