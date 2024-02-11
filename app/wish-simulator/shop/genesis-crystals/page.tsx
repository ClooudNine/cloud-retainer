'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Balance from '@/app/wish-simulator/shop/components/Balance';
import CloseButton from '@/app/wish-simulator/components/headerComponents/CloseButton';
import genesisCrystalsCard from '@/public/wish-simulator/assets/shop/genesis-crystals-card.webp';
import ObtainModal from '@/app/wish-simulator/shop/genesis-crystals/ObtainModal';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { useAudioContext } from '@/app/wish-simulator/AudioProvider';
import { BalanceStats } from '@/lib/banners';
import { initialBalance } from '@/lib/constants';

export default function GenesisCrystals() {
    const { audio } = useAudioContext();
    const router = useRouter();
    const crystalsCount = [60, 300, 980, 1980, 3280, 6480];

    const [obtainedCrystals, setObtainedCrystals] = useState<number | null>(null);
    const [balance, setBalance] = useState<BalanceStats>(initialBalance);
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
        const balance = localStorage.getItem('balance');
        if (balance) setBalance(JSON.parse(balance));

        return () => {
            if (currentAudio) currentAudio.play();
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
                    styles={'size-12 xs:size-10'}
                />
            </header>
            <div
                className={
                    'flex flex-wrap justify-center gap-x-2 gap-y-0 text-[#f7f5f6] text-2xl/none xs:justify-start xs:text-lg xs:ml-28 lg:mt-12 lg:gap-x-4'
                }
            >
                {crystalsCount.map((count) => (
                    <div
                        key={count}
                        onClick={() => chooseCrystals(count)}
                        className={
                            'relative size-72 flex flex-col items-center transition hover:scale-105 hover:drop-shadow-shop-item xs:size-56'
                        }
                    >
                        <Image
                            src={genesisCrystalsCard}
                            alt={'Фон карточки товара магазина кристаллов'}
                            quality={100}
                            draggable={false}
                            className={'w-full'}
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
                        <p className={'absolute top-[52%] text-[#585f6b] text-center'}>
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
