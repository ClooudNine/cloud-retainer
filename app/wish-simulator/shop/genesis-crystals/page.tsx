'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { BalanceStats } from '@/lib/common';
import { useRouter } from 'next/navigation';
import Balance from '@/app/wish-simulator/shop/components/Balance';
import CloseButton from '@/app/wish-simulator/components/headerComponents/CloseButton';
import genesisCrystalsCard from '@/public/wish-simulator/assets/shop/genesis-crystals-card.webp';
import ObtainModal from '@/app/wish-simulator/shop/genesis-crystals/ObtainModal';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { useAudioContext } from '@/app/wish-simulator/AudioProvider';

export default function GenesisCrystals() {
    const { audio } = useAudioContext();
    const router = useRouter();
    const crystalsCount = [60, 300, 980, 1980, 3280, 6480];

    const [obtainedCrystals, setObtainedCrystals] = useState<number | null>(null);
    const [balance, setBalance] = useState<BalanceStats>({
        'intertwined-fate': 0,
        'acquaint-fate': 20,
        primogems: 3200,
        'masterless-stardust': 0,
        'masterless-starglitter': 0,
        'genesis-crystal': 0,
    });
    const [balanceInModal, setBalanceInModal] = useState<boolean>(false);

    const chooseCrystals = useCallback((count: number) => {
        playSfxEffect('/sounds/click-6.mp3');
        setBalanceInModal(true);
        setObtainedCrystals(count);
    }, []);

    useEffect(() => {
        const currentAudio = audio.current;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        const balance = localStorage.getItem('Balance');
        if (balance) {
            setBalance(JSON.parse(balance));
        }

        return () => {
            if (currentAudio) {
                currentAudio.play();
            }
        };
    }, [audio]);

    return (
        <>
            <header
                className={
                    'flex items-center justify-end gap-4 px-4 py-3 text-sm lg:pr-10 lg:gap-10 lg:text-xl lg:py-5'
                }
            >
                <Balance
                    section={'genesis-crystals'}
                    inModal={balanceInModal}
                    balance={balance}
                    setInModal={() => setBalanceInModal(false)}
                    setBalance={(newBalance) => setBalance(newBalance)}
                    closePaymentModal={() => setObtainedCrystals(null)}
                />
                <CloseButton
                    handler={() => {
                        playSfxEffect('/sounds/return.mp3');
                        router.replace('/wish-simulator');
                    }}
                    styles={'size-6 sm:size-4 lg:size-10'}
                />
            </header>
            <div
                className={
                    'flex flex-wrap justify-center gap-x-2 gap-y-0 text-[#f7f5f6] leading-none text-sm sm:text-[0.7rem] sm:justify-start sm:ml-7 lg:ml-28 lg:mt-12 lg:text-2xl lg:gap-x-4'
                }
            >
                {crystalsCount.map((count) => (
                    <div
                        key={count}
                        onClick={() => chooseCrystals(count)}
                        className={
                            'relative size-40 flex flex-col items-center transition hover:scale-105 hover:drop-shadow-shop-item sm:size-28 lg:size-80'
                        }
                    >
                        <Image
                            src={genesisCrystalsCard}
                            alt={'Фон карточки товара магазина кристаллов'}
                            quality={100}
                            draggable={false}
                        />
                        <Image
                            src={`/wish-simulator/assets/shop/genesis-crystals/${count}-crystals.webp`}
                            alt={count + ' кристаллов'}
                            width={300}
                            height={300}
                            quality={100}
                            draggable={false}
                            className={'absolute top-0 w-3/5'}
                        />
                        <p className={'absolute top-[55%] text-[#585f6b] text-center'}>
                            {count} Кристаллов Сотворения
                        </p>
                        <p className={'absolute top-[80%] text-[#585f6b]'}>Бесплатно!</p>
                    </div>
                ))}
                {obtainedCrystals && (
                    <ObtainModal
                        balance={balance}
                        setBalance={setBalance}
                        count={obtainedCrystals}
                        setBalanceInModal={() => setBalanceInModal(false)}
                        closeObtainModal={() => {
                            setBalanceInModal(false);
                            setObtainedCrystals(null);
                        }}
                    />
                )}
            </div>
        </>
    );
}
