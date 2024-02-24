'use client';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    currentGamePhase,
    currentGameVersion,
    initialBalance,
    initialBannerStats,
} from '@/lib/constants';
import {
    getBannerDrop,
    getBannersSet,
    getFeaturedItems,
} from '@/app/wish-simulator/utils';
import WishDrop from '@/app/wish-simulator/components/WishDrop';
import {
    BalanceStats,
    BannerItems,
    Banners,
    BannerStats,
    EpitomizedPath,
    PullCurrency,
} from '@/lib/banners';
import { Character, Phases, Weapon } from '@/lib/db/schema';
import ChooseVersion from '@/app/wish-simulator/components/ChooseVersion';
import { useRouter } from 'next/navigation';
import CloseButton from '@/components/wish-simulator/close-button';

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
    epitomizedPath: EpitomizedPath;
    bannerStats: BannerStats;
    featuredItems: Character[] | Weapon[];
    pullCurrency: PullCurrency;
    balance: BalanceStats;
    switchBanner: (banner: Banners) => void;
    setCurrentBanners: (banners: Banners[]) => void;
    setDroppedItems: (droppedItems: (Character | Weapon)[]) => void;
    setBalance: (newBalance: BalanceStats) => void;
    setEpitomizedPath: (newStats: EpitomizedPath) => void;
    setBannerStats: (newStats: BannerStats) => void;
};
export const BannerContext = createContext<BannerContext | null>(null);
export default function BannerProvider({
    children,
    banners,
    characters,
    weapons,
}: BannerContextProviderProps) {
    const router = useRouter();

    const [currentBanners, setCurrentBanners] = useState<Banners[]>([]);
    const [selectedBanner, setSelectedBanner] = useState<Banners | null>(null);
    const [featuredItems, setFeaturedItems] = useState<Character[] | Weapon[]>([]);
    const [drop, setDrop] = useState<(Character | Weapon)[]>([]);

    const [epitomizedPath, setEpitomizedPath] = useState<EpitomizedPath>({});
    const [bannerStats, setBannerStats] = useState<BannerStats>(initialBannerStats);

    const [pullCurrency, setPullCurrency] = useState<PullCurrency>('acquaint-fate');
    const [balance, setBalance] = useState<BalanceStats>(initialBalance);

    const [droppedItems, setDroppedItems] = useState<BannerItems>([]);

    const [isChooseVersion, setIsChooseVersion] = useState<boolean>(false);

    useEffect(() => {
        const version = localStorage.getItem('version') ?? currentGameVersion;
        const phase = localStorage.getItem('phase') ?? currentGamePhase;

        const maybeStats = localStorage.getItem('bannerStats');
        if (maybeStats) setBannerStats(JSON.parse(maybeStats));

        const maybeEpitomizedPath = localStorage.getItem('epitomizedPath');
        if (maybeEpitomizedPath) setEpitomizedPath(JSON.parse(maybeEpitomizedPath));

        const maybeBalance = localStorage.getItem('balance');
        if (maybeBalance) setBalance(JSON.parse(maybeBalance));

        const baseBannerSet = getBannersSet(
            banners,
            Number(version),
            phase as Phases,
            maybeStats
                ? (JSON.parse(maybeStats) as BannerStats).NoviceWish.history.length
                : 0
        );

        setCurrentBanners(baseBannerSet);
        setSelectedBanner(baseBannerSet[0]);
    }, [banners, characters, weapons]);

    useEffect(() => {
        if (bannerStats.NoviceWish.history.length === 20) {
            setCurrentBanners((prevBanners) => {
                const bannersWithoutNoviceWish = prevBanners.filter(
                    (banner) => banner.type !== 'Novice Wish'
                );
                setSelectedBanner(bannersWithoutNoviceWish[0]);
                return bannersWithoutNoviceWish;
            });
        }
    }, [bannerStats.NoviceWish.history.length, characters, weapons]);

    useEffect(() => {
        if (selectedBanner !== null) {
            if (
                selectedBanner.type === 'Standard Wish' ||
                selectedBanner.type === 'Novice Wish'
            ) {
                setPullCurrency('acquaint-fate');
                setFeaturedItems([]);
                setDrop(getBannerDrop(selectedBanner, characters, weapons));
            } else {
                getFeaturedItems(selectedBanner.id, selectedBanner.type).then(
                    (result) => {
                        setPullCurrency('intertwined-fate');
                        setFeaturedItems(result);
                        setDrop(
                            getBannerDrop(selectedBanner, characters, weapons, result)
                        );
                    }
                );
            }
        }
    }, [characters, selectedBanner, weapons]);

    const switchBanner = useCallback(
        (banner: Banners) => banner !== selectedBanner && setSelectedBanner(banner),
        [selectedBanner]
    );

    const switchVersion = useCallback(
        (version: number, phase: Phases) => {
            const newBannerSet = getBannersSet(
                banners,
                version,
                phase,
                bannerStats.NoviceWish.history.length
            );
            setCurrentBanners(newBannerSet);
            setSelectedBanner(newBannerSet[0]);
        },
        [bannerStats, banners]
    );

    return (
        <>
            {selectedBanner !== null && (
                <BannerContext.Provider
                    value={{
                        characters,
                        weapons,
                        currentBanners,
                        selectedBanner,
                        drop,
                        epitomizedPath,
                        bannerStats,
                        featuredItems,
                        pullCurrency,
                        balance,
                        switchBanner,
                        setCurrentBanners,
                        setDroppedItems,
                        setBalance,
                        setEpitomizedPath,
                        setBannerStats,
                    }}
                >
                    <CloseButton
                        handler={() => router.push('/')}
                        styles={
                            'absolute top-12 right-5 size-8 xs:max-lg:top-4 lg:top-11 lg:right-8'
                        }
                    />
                    {isChooseVersion && (
                        <ChooseVersion
                            allBanners={banners}
                            switchVersion={switchVersion}
                            closeChooseVersion={() => setIsChooseVersion(false)}
                        />
                    )}
                    {droppedItems.length > 0 && <WishDrop droppedItems={droppedItems} />}
                    {children}
                </BannerContext.Provider>
            )}
        </>
    );
}

export function useBannerContext() {
    const context = useContext(BannerContext);
    if (context === null) {
        throw new Error('useBannerContext must be used within a BannerContextProvider');
    }
    return context;
}
