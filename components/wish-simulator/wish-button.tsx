'use client';
import Image from 'next/image';
import { useBannerContext } from '@/app/wish-simulator/banner-provider';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useAudioContext } from '@/app/wish-simulator/audio-provider';
import { wish } from '@/lib/wish';
import { BannerItems, Character, Weapon } from '@/lib/types';

const WishButton = ({ count }: { count: number }) => {
    const { audio } = useAudioContext();
    const {
        selectedBanner,
        drop,
        epitomizedPath,
        pullCurrency,
        balance,
        bannerStats,
        droppedItems,
        setDroppedItems,
        setBannerStats,
        setEpitomizedPath,
    } = useBannerContext();

    const pullCost = selectedBanner.type === 'Novice Wish' ? 8 : count;

    const wishButtonClasses = clsx(
        'relative transition text-2xl flex flex-col justify-center items-center cursor-genshin duration-300 active:brightness-90 xs:text-base',
        {
            hidden: selectedBanner.type === 'Novice Wish' && count === 1,
        }
    );

    const countClasses = clsx({
        'text-[#ff5f40]': pullCost > balance[pullCurrency],
        'text-[#b4a08c]': pullCost <= balance[pullCurrency],
    });

    const makeWish = useCallback(() => {
        if (balance[pullCurrency] < pullCost) {
            alert('Недостаточно средств для совершения молитв!');
            return;
        }

        audio?.pause();
        balance[pullCurrency] -= pullCost;
        let droppedItems: BannerItems = [];

        for (let i = 0; i < count; i++) {
            droppedItems.push(
                wish(
                    selectedBanner,
                    drop,
                    bannerStats,
                    epitomizedPath,
                    setBannerStats,
                    setEpitomizedPath
                ) as Character | Weapon
            );
        }
        localStorage.setItem('balance', JSON.stringify(balance));
        localStorage.setItem('bannerStats', JSON.stringify(bannerStats));
        setDroppedItems(droppedItems);
    }, [
        audio,
        balance,
        bannerStats,
        count,
        drop,
        epitomizedPath,
        pullCost,
        pullCurrency,
        selectedBanner,
        setBannerStats,
        setDroppedItems,
        setEpitomizedPath,
    ]);

    return (
        <button
            className={wishButtonClasses}
            onClick={makeWish}
            disabled={droppedItems.length > 0}
        >
            <Image
                src={'wish-simulator/assets/wish-button.webp'}
                width={317}
                height={72}
                alt={`Помолиться ${count} раз`}
                draggable={false}
                className={'w-[22rem] xs:w-64'}
            />
            {selectedBanner.type === 'Novice Wish' && (
                <div
                    className={
                        'absolute text-sm bg-[#90ab63] px-2 text-white left-[7%] -top-[20%] rounded-l-3xl rounded-br-[2.5rem]'
                    }
                >
                    -20%
                </div>
            )}
            <p className={'absolute top-1 text-[#b4a08c] whitespace-nowrap'}>
                Помолиться {count} раз
            </p>
            <div className={'absolute top-8 flex justify-center items-center xs:top-7'}>
                <Image
                    src={
                        pullCurrency === 'intertwined-fate'
                            ? 'wish-simulator/assets/intertwined-fate.webp'
                            : 'wish-simulator/assets/acquaint-fate.webp'
                    }
                    width={40}
                    height={40}
                    alt={pullCurrency}
                    draggable={false}
                    className={'w-12 xs:w-6'}
                />
                <p className={countClasses}>
                    x{' '}
                    {selectedBanner.type === 'Novice Wish' ? (
                        <>
                            8
                            <span className={'ml-3 relative opacity-70'}>
                                <span className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-7 h-0.5 bg-red-500"></span>
                                10
                            </span>
                        </>
                    ) : (
                        count
                    )}
                </p>
            </div>
        </button>
    );
};

export default WishButton;
