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

const WishButton = ({ count }: { count: number }) => {
    const {
        audio,
        selectedBanner,
        drop,
        featuredItems,
        pullCurrency,
        balance,
        setDroppedItems,
    } = useBannerContext();

    const countClasses = clsx('font-genshin text-sm sm:text-base lg:text-xl', {
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
                'relative w-full h-2/5 min-w-min transition-all select-none cursor-genshin duration-300 active:brightness-[0.85] md:h-3/5 md:w-[45%] xl:w-[35%]'
            }
            onClick={makeWish}
        >
            <Image
                src={wishButton}
                quality={100}
                fill
                sizes={'(max-width: 768px) 50vw, 20vw'}
                alt={`Помолиться ${count} раз`}
                className={'-z-10'}
            />
            <p
                className={
                    'font-genshin text-sm text-[#b4a08c] whitespace-nowrap sm:text-base lg:text-xl'
                }
            >
                Помолиться {count} раз
            </p>
            <div className={'flex h-1/2 justify-center items-center'}>
                <Image
                    src={
                        pullCurrency === 'intertwined-fate'
                            ? intertwinedFate
                            : acquaintFate
                    }
                    alt={'Переплетающиеся судьбы'}
                    width={32}
                    height={32}
                    className={'pointer-events-none'}
                />
                <p className={countClasses}>x {count}</p>
            </div>
        </button>
    );
};

export default WishButton;
