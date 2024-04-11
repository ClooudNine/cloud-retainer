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
import { getBannerDrop, getBannersSet, playSfxEffect } from '@/lib/wish-simulator';
import WishDrop from '@/components/wish-simulator/wish-drop';
import {
    BalanceStats,
    BannerItems,
    Banners,
    BannerStats,
    EpitomizedPath,
    PullCurrency,
} from '@/lib/banners';
import { Character, Phases, Weapon } from '@/lib/db/schema';
import ChooseVersion from '@/components/wish-simulator/choose-version';
import CloseButton from '@/components/wish-simulator/close-button';
import Link from 'next/link';
import { GearIcon } from '@radix-ui/react-icons';

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
    pullCurrency: PullCurrency;
    balance: BalanceStats;
    droppedItems: (Character | Weapon)[];
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
    const [currentBanners, setCurrentBanners] = useState<Banners[]>([]);
    const [selectedBanner, setSelectedBanner] = useState<Banners | null>(null);
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
        setDrop(getBannerDrop(baseBannerSet[0], characters, weapons));
    }, [banners, characters, weapons]);

    useEffect(() => {
        if (bannerStats.NoviceWish.history.length === 20) {
            setCurrentBanners((prevBanners) => {
                const bannersWithoutNoviceWish = prevBanners.filter(
                    (banner) => banner.type !== 'Novice Wish'
                );
                setSelectedBanner(bannersWithoutNoviceWish[0]);
                setPullCurrency('intertwined-fate');
                setDrop(getBannerDrop(bannersWithoutNoviceWish[0], characters, weapons));
                return bannersWithoutNoviceWish;
            });
        }
    }, [bannerStats.NoviceWish.history.length, characters, weapons]);

    const switchBanner = useCallback(
        (banner: Banners) => {
            if (banner !== selectedBanner) {
                if (banner.type === 'Standard Wish' || banner.type === 'Novice Wish') {
                    setPullCurrency('acquaint-fate');
                } else {
                    setPullCurrency('intertwined-fate');
                }
                setDrop(getBannerDrop(banner, characters, weapons));
                setSelectedBanner(banner);
            }
        },
        [characters, selectedBanner, weapons]
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
            switchBanner(newBannerSet[0]);
            localStorage.setItem('version', version.toString());
            localStorage.setItem('phase', phase);
            setIsChooseVersion(false);
        },
        [bannerStats.NoviceWish.history.length, banners, switchBanner]
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
                        pullCurrency,
                        balance,
                        droppedItems,
                        switchBanner,
                        setCurrentBanners,
                        setDroppedItems,
                        setBalance,
                        setEpitomizedPath,
                        setBannerStats,
                    }}
                >
                    {isChooseVersion && (
                        <ChooseVersion
                            allBanners={banners}
                            switchVersion={switchVersion}
                            closeChooseVersion={() => setIsChooseVersion(false)}
                        />
                    )}
                    {droppedItems.length > 0 && <WishDrop droppedItems={droppedItems} />}
                    <button
                        aria-label={'Список баннеров'}
                        onClick={() => setIsChooseVersion(true)}
                        className={
                            'z-10 absolute bottom-1/4 left-1/2 -translate-x-1/2 p-1 rounded-full transition bg-[#ede6d6] ring-4 ring-[rgba(237,230,214,0.5)] cursor-genshin duration-500 hover:ring-[#fcfdff] hover:rotate-180 hover:ring-4 hover:drop-shadow-[0_0_5px_#ffffff] active:ring-[#7a8ca4] active:ring-4 active:bg-[#c8c4bb] lg:ring-8 xs:bottom-16 lg:bottom-4'
                        }
                    >
                        <GearIcon className={'size-12 xs:size-8'} />
                    </button>
                    <Link href={'/'}>
                        <CloseButton
                            handler={() => playSfxEffect('sounds/return.mp3')}
                            styles={
                                'absolute top-12 right-5 size-8 xs:max-lg:top-4 lg:top-11 lg:right-8'
                            }
                        />
                    </Link>
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
