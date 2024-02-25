'use client';
import Image from 'next/image';
import primogem from '@/public/wish-simulator/assets/primogems.webp';
import { useBannerContext } from '@/app/wish-simulator/banner-provider';
import { useState } from 'react';
import CurrencyExchanger from '@/components/wish-simulator/currency-exchanger';
import { playSfxEffect } from '@/lib/wish-simulator';

const CurrentBalance = () => {
    const { pullCurrency, balance, setBalance } = useBannerContext();
    const [isExchange, setIsExchange] = useState<boolean>(false);

    return (
        <>
            <div
                className={
                    'absolute top-12 right-20 flex items-center gap-4 text-white text-2xl xs:text-base xs:max-lg:top-4 lg:right-24'
                }
            >
                <div
                    className={
                        'relative flex items-center bg-black/40 rounded-full gap-2 px-1 ring-2 ring-[#84a4c5]'
                    }
                >
                    <Image
                        src={primogem}
                        alt={'Примогем'}
                        quality={100}
                        draggable={false}
                        className={'size-8 xs:size-6'}
                    />
                    <p>{balance['primogems']}</p>
                    <button
                        onClick={() => {
                            playSfxEffect('/sounds/click-8.mp3');
                            setIsExchange(true);
                        }}
                        className={
                            'bg-[#ece5d8] text-[#3b4354] size-7 text-xl font-bold leading-none rounded-full transition cursor-genshin active:opacity-50 active:scale-95 hover:scale-110 xs:size-5'
                        }
                    >
                        +
                    </button>
                </div>
                <div
                    className={
                        'flex items-center bg-black/40 rounded-full ring-2 px-1 gap-1 ring-[#84a4c5]'
                    }
                >
                    <Image
                        src={`/wish-simulator/assets/${pullCurrency}.webp`}
                        alt={'Переплетающиеся судьбы'}
                        quality={100}
                        draggable={false}
                        width={140}
                        height={140}
                        className={'size-8 xs:size-6'}
                    />
                    <p>{balance[pullCurrency]}</p>
                </div>
            </div>
            {isExchange && (
                <CurrencyExchanger
                    balance={balance}
                    setBalance={setBalance}
                    closeCurrencyExchanger={() => {
                        playSfxEffect('/sounds/click-7.mp3');
                        setIsExchange(false);
                    }}
                />
            )}
        </>
    );
};
export default CurrentBalance;
