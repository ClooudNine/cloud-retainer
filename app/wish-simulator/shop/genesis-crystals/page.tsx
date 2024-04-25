'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Balance from '@/components/wish-simulator/shop/balance';
import CloseButton from '@/components/wish-simulator/close-button';
import ObtainModal from '@/components/wish-simulator/shop/genesis-crystals/obtain-modal';
import { playSfxEffect } from '@/lib/wish-simulator';
import { useAudioContext } from '@/app/wish-simulator/audio-provider';
import { initialBalance } from '@/lib/constants';
import { BalanceStats } from '@/lib/types';

export default function GenesisCrystals() {
    const { audio } = useAudioContext();
    const router = useRouter();

    const crystalsCount = [60, 300, 980, 1980, 3280, 6480];

    const [obtainedCrystals, setObtainedCrystals] = useState<number | null>(null);
    const [balance, setBalance] = useState<BalanceStats>(initialBalance);

    const closeObtainModal = useCallback(() => setObtainedCrystals(null), []);
    const chooseCrystals = (count: number) => {
        playSfxEffect('sounds/click-6.mp3');
        setObtainedCrystals(count);
    };

    useEffect(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        const balance = localStorage.getItem('balance');
        if (balance) setBalance(JSON.parse(balance));

        return () => {
            audio?.play();
        };
    }, [audio]);

    return (
        <>
            <header
                className={
                    'flex items-center justify-end gap-8 px-6 py-6 text-2xl xs:py-4 lg:text-base'
                }
            >
                <Balance
                    section={'genesis-crystals'}
                    inModal={Boolean(obtainedCrystals)}
                    balance={balance}
                    setBalance={setBalance}
                    closePaymentModal={closeObtainModal}
                />
                <CloseButton
                    handler={() => {
                        playSfxEffect('sounds/return.mp3');
                        router.replace('/wish-simulator');
                    }}
                    styles={'size-12 xs:size-10'}
                />
            </header>
            <div
                className={
                    'flex flex-wrap justify-center gap-2 text-[#f7f5f6] text-2xl/none xs:justify-start xs:text-lg xs:ml-28 lg:mt-12 lg:gap-x-4'
                }
            >
                {crystalsCount.map((count) => (
                    <div
                        key={count}
                        onClick={() => chooseCrystals(count)}
                        className={
                            'relative size-72 flex flex-col items-center transition hover:scale-105 hover:drop-shadow-shop-item xs:size-52'
                        }
                    >
                        <Image
                            src={'wish-simulator/assets/shop/genesis-crystals-card.webp'}
                            alt={'Фон карточки товара магазина кристаллов'}
                            fill
                            priority
                            draggable={false}
                        />
                        <Image
                            src={`wish-simulator/assets/shop/genesis-crystals/${count}-crystals.webp`}
                            alt={count + ' кристаллов'}
                            width={300}
                            height={300}
                            priority
                            draggable={false}
                            className={'absolute top-0 w-3/5'}
                        />
                        <p className={'absolute top-[55%] text-[#585f6b] text-center'}>
                            {count} Кристаллов Сотворения
                        </p>
                        <p className={'absolute top-[84%] text-[#585f6b]'}>Бесплатно!</p>
                    </div>
                ))}
                {obtainedCrystals && (
                    <ObtainModal
                        balance={balance}
                        setBalance={setBalance}
                        count={obtainedCrystals}
                        closeObtainModal={closeObtainModal}
                    />
                )}
            </div>
        </>
    );
}
