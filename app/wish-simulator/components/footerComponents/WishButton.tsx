'use client';
import Image from 'next/image';
import wishButton from '@/public/wish-simulator/assets/wish-button.webp';
import intertwinedFate from '@/public/wish-simulator/assets/intertwined-fate.webp';
import acquaintFate from '@/public/wish-simulator/assets/acquaint-fate.webp';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
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
        pullCurrency,
        balance,
        setDroppedItems,
    } = useBannerContext();

    const countClasses = clsx({
        'text-[#ff5f40]': count > balance[pullCurrency],
        'text-[#b4a08c]': count <= balance[pullCurrency],
    });

    const makeWish = useCallback(() => {
        audio.current?.pause();
        if (balance[pullCurrency] < count) {
            alert('Недостаточно средств для совершения молитв!');
            return;
        }
        balance[pullCurrency] -= count;
        localStorage.setItem('Balance', JSON.stringify(balance));
        let droppedItems: BannerItems = [];
        for (let i = 0; i < count; i++) {
            droppedItems.push(
                wish(selectedBanner, drop, featuredItems) as Character | Weapon
            );
        }
        setDroppedItems(droppedItems);
    }, [
        audio,
        balance,
        count,
        drop,
        featuredItems,
        pullCurrency,
        selectedBanner,
        setDroppedItems,
    ]);

    return (
        <button
            className={
                'relative transition text-2xl flex flex-col justify-center items-center cursor-genshin duration-300 active:brightness-90 xs:text-base'
            }
            onClick={makeWish}
        >
            <Image
                src={wishButton}
                alt={`Помолиться ${count} раз`}
                quality={100}
                draggable={false}
                className={'w-[22rem] xs:w-64'}
            />
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
                <p className={countClasses}>x {count}</p>
            </div>
        </button>
    );
};

export default WishButton;
