'use client';
import Image from 'next/image';
import wishButton from '@/public/wish-simulator/assets/wish-button.webp';
import intertwinedFate from '@/public/wish-simulator/assets/intertwined-fate.webp';
import acquaintFate from '@/public/wish-simulator/assets/acquaint-fate.webp';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
import { useCallback } from 'react';
import { wish } from '@/app/wish-simulator/wishLogic';
import { BannerItems } from '@/lib/banners';
import { Character, Weapon } from '@/lib/db/schema';
import clsx from 'clsx';
import { useAudioContext } from '@/app/wish-simulator/AudioProvider';

const WishButton = ({ count }: { count: number }) => {
    const { audio } = useAudioContext();
    const {
        selectedBanner,
        drop,
        featuredItems,
        epitomizedPath,
        pullCurrency,
        balance,
        bannerStats,
        setDroppedItems,
        setBannerStats,
        setEpitomizedPath,
    } = useBannerContext();

    const wishButtonClasses = clsx(
        'relative transition text-2xl flex flex-col justify-center items-center cursor-genshin duration-300 active:brightness-90 xs:text-base',
        {
            hidden: selectedBanner.type === 'Novice Wish' && count === 1,
        }
    );

    const countClasses = clsx({
        'text-[#ff5f40]': count > balance[pullCurrency],
        'text-[#b4a08c]': count <= balance[pullCurrency],
    });

    const makeWish = useCallback(() => {
        if (balance[pullCurrency] < count) {
            alert('Недостаточно средств для совершения молитв!');
            return;
        }
        audio.current?.pause();
        if (selectedBanner.type === 'Novice Wish') {
            balance[pullCurrency] -= 8;
        } else {
            balance[pullCurrency] -= count;
        }
        let droppedItems: BannerItems = [];
        for (let i = 0; i < count; i++) {
            console.log(drop);
            droppedItems.push(
                wish(
                    selectedBanner,
                    drop,
                    bannerStats,
                    featuredItems,
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
        featuredItems,
        pullCurrency,
        selectedBanner,
        setBannerStats,
        setDroppedItems,
        setEpitomizedPath,
    ]);

    return (
        <button className={wishButtonClasses} onClick={makeWish}>
            <Image
                src={wishButton}
                alt={`Помолиться ${count} раз`}
                quality={100}
                draggable={false}
                className={'w-[22rem] xs:w-64'}
            />
            {selectedBanner.type === 'Novice Wish' && (
                <div
                    className={
                        'absolute text-sm bg-[#90ab63] px-2 text-white left-[7%] -top-[20%] rounded-l-3xl rounded-br-[3rem]'
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
                            ? intertwinedFate
                            : acquaintFate
                    }
                    alt={'Переплетающиеся судьбы'}
                    quality={100}
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
