'use client';
import Navbar from '@/app/wish-simulator/shop/paimon-bargain/Navbar';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import intertwinedFate from '@/public/wish-simulator/assets/intertwined-fate.webp';
import acquaintFate from '@/public/wish-simulator/assets/acquaint-fate.webp';
import fiveStarItemCard from '@/public/wish-simulator/assets/shop/5-star-shop-card.webp';
import PaymentModal from '@/app/wish-simulator/shop/paimon-bargain/PaymentModal';
import { BalanceStats, PullCurrency, PurchasesCurrency } from '@/lib/common';
import { useRouter } from 'next/navigation';
import Balance from '@/app/wish-simulator/shop/components/Balance';
import CloseButton from '@/app/wish-simulator/components/headerComponents/CloseButton';
import { purchasesCurrencies, priceOfFate } from '@/lib/shop';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { useAudioContext } from '@/app/wish-simulator/AudioProvider';

export default function PaimonBargain() {
    const { audio } = useAudioContext();
    const router = useRouter();

    const [balance, setBalance] = useState<BalanceStats>({
        'intertwined-fate': 0,
        'acquaint-fate': 20,
        primogems: 3200,
        'masterless-stardust': 0,
        'masterless-starglitter': 0,
        'genesis-crystal': 0,
    });
    const [currentCurrency, setCurrentCurrency] = useState<PurchasesCurrency>(
        'masterless-starglitter'
    );
    const [purchasedItem, setPurchasedItem] = useState<PullCurrency | null>(null);
    const [balanceInModal, setBalanceInModal] = useState<boolean>(false);

    const buyItem = useCallback((item: PullCurrency) => {
        playSfxEffect('/sounds/click-6.mp3');
        setPurchasedItem(item);
        setBalanceInModal(true);
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
                    section={'paimon-bargain'}
                    inModal={balanceInModal}
                    balance={balance}
                    setInModal={() => setBalanceInModal(false)}
                    setBalance={(newBalance) => setBalance(newBalance)}
                    closePaymentModal={() => setPurchasedItem(null)}
                />
                <CloseButton
                    handler={() => {
                        playSfxEffect('/sounds/return.mp3');
                        router.replace('/wish-simulator');
                    }}
                    styles={
                        'size-6 rounded-full transition bg-[#ede6d6] ring-4 ring-[rgba(237,230,214,0.5)] sm:size-4 lg:ring-8 lg:size-10'
                    }
                />
            </header>
            <Navbar
                currentCurrency={currentCurrency}
                setCurrency={(currency) => setCurrentCurrency(currency)}
            />
            <div
                className={
                    'flex flex-wrap justify-center gap-2 mt-4 text-[#f7f5f6] text-sm sm:justify-start sm:ml-7 sm:gap-6 lg:ml-28 lg:mt-12 lg:text-2xl'
                }
            >
                <div
                    className={
                        'relative size-52 flex flex-col items-center transition hover:scale-105 hover:drop-shadow-shop-item sm:size-44 lg:size-80'
                    }
                    onClick={() => buyItem('intertwined-fate')}
                >
                    <Image
                        src={fiveStarItemCard}
                        alt={'Фон пятизвёздочного предмета в магазине'}
                        quality={100}
                        draggable={false}
                    />
                    <Image
                        src={intertwinedFate}
                        alt={'Переплетающиеся судьбы'}
                        quality={100}
                        draggable={false}
                        className={'absolute top-0 w-[65%]'}
                    />
                    <p
                        className={
                            'absolute top-[55%] drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] text-center'
                        }
                    >
                        Переплетающиеся <br /> судьбы
                    </p>
                    <div
                        className={
                            'absolute bottom-[8%] flex items-center justify-center gap-1 lg:bottom-[10%]'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${currentCurrency}.webp`}
                            alt={purchasesCurrencies[currentCurrency]}
                            quality={100}
                            width={40}
                            height={40}
                            draggable={false}
                            className={'size-5 lg:size-9'}
                        />
                        <p>{priceOfFate[currentCurrency]}</p>
                    </div>
                </div>
                <div
                    className={
                        'relative size-52 flex flex-col items-center transition hover:scale-105 hover:drop-shadow-shop-item sm:size-44 lg:size-80'
                    }
                    onClick={() => buyItem('acquaint-fate')}
                >
                    <Image
                        src={fiveStarItemCard}
                        alt={'Фон пятизвёздочного предмета в магазине'}
                        quality={100}
                        draggable={false}
                    />
                    <Image
                        src={acquaintFate}
                        alt={'Судьбоносные встречи'}
                        quality={100}
                        className={'absolute top-0 w-[65%]'}
                        draggable={false}
                    />
                    <p
                        className={
                            'absolute top-[55%] drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] text-center'
                        }
                    >
                        Cудьбоносные <br /> встречи
                    </p>
                    <div
                        className={
                            'absolute bottom-[8%] flex items-center justify-center gap-1 lg:bottom-[10%]'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${currentCurrency}.webp`}
                            alt={purchasesCurrencies[currentCurrency]}
                            quality={100}
                            width={40}
                            height={40}
                            draggable={false}
                            className={'size-5 lg:size-9'}
                        />
                        <p>{priceOfFate[currentCurrency]}</p>
                    </div>
                </div>
            </div>
            {purchasedItem && (
                <PaymentModal
                    balance={balance}
                    shopItem={purchasedItem}
                    currency={currentCurrency}
                    price={priceOfFate[currentCurrency]}
                    setBalance={setBalance}
                    setBalanceInModal={() => setBalanceInModal(false)}
                    closePaymentModal={() => {
                        setBalanceInModal(false);
                        setPurchasedItem(null);
                    }}
                />
            )}
        </>
    );
}
