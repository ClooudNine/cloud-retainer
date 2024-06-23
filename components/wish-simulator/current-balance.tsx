'use client';
import Image from 'next/image';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';
import { useState } from 'react';
import CurrencyExchanger from '@/components/wish-simulator/currency-exchanger';
import { playSfxEffect } from '@/lib/wish-simulator';
import { useTranslations } from 'next-intl';

const CurrentBalance = () => {
    const t = useTranslations('common');
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
                        src={'wish-simulator/assets/primogem.webp'}
                        width={40}
                        height={40}
                        alt={t('primogem', { count: 1 })}
                        draggable={false}
                        className={'size-8 xs:size-6'}
                    />
                    <p>{balance['primogem']}</p>
                    <button
                        onClick={() => {
                            playSfxEffect('sounds/click-8.mp3');
                            setIsExchange(true);
                        }}
                        className={
                            'bg-[#ece5d8] text-[#3b4354] size-7 text-xl/none font-bold rounded-full transition cursor-genshin active:opacity-50 active:scale-95 hover:scale-110 xs:size-5'
                        }
                    >
                        +
                    </button>
                </div>
                <div
                    className={'flex items-center bg-black/40 rounded-full ring-2 px-1 gap-1 ring-[#84a4c5]'}
                >
                    <Image
                        src={`wish-simulator/assets/${pullCurrency}.webp`}
                        width={40}
                        height={40}
                        alt={t('intertwined-fate.title')}
                        draggable={false}
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
                        playSfxEffect('sounds/click-7.mp3');
                        setIsExchange(false);
                    }}
                />
            )}
        </>
    );
};
export default CurrentBalance;
