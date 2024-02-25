'use client';
import Navbar from '@/components/wish-simulator/shop/paimon-bargain/navbar';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import intertwinedFate from '@/public/wish-simulator/assets/intertwined-fate.webp';
import acquaintFate from '@/public/wish-simulator/assets/acquaint-fate.webp';
import fiveStarItemCard from '@/public/wish-simulator/assets/shop/5-star-shop-card.webp';
import PaymentModal from '@/components/wish-simulator/shop/paimon-bargain/payment-modal';
import { useRouter } from 'next/navigation';
import Balance from '@/components/wish-simulator/shop/balance';
import CloseButton from '@/components/wish-simulator/close-button';
import { priceOfFate, purchasesCurrencies } from '@/lib/shop';
import { playSfxEffect } from '@/lib/wish-simulator';
import { useAudioContext } from '@/app/wish-simulator/audio-provider';
import { BalanceStats, PullCurrency, PurchasesCurrency } from '@/lib/banners';
import { initialBalance } from '@/lib/constants';

export default function PaimonBargain() {
    const { audio } = useAudioContext();
    const router = useRouter();

    const [balance, setBalance] = useState<BalanceStats>(initialBalance);
    const [currentCurrency, setCurrentCurrency] = useState<PurchasesCurrency>(
        'masterless-starglitter'
    );
    const [purchasedItem, setPurchasedItem] = useState<PullCurrency | null>(null);

    const closePaymentModal = useCallback(() => setPurchasedItem(null), []);
    const setCurrencyHandler = useCallback((currency: PurchasesCurrency) => {
        playSfxEffect('/sounds/click-3.mp3');
        setCurrentCurrency(currency);
    }, []);
    const buyItem = (item: PullCurrency) => {
        playSfxEffect('/sounds/click-6.mp3');
        setPurchasedItem(item);
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
                    'flex items-center justify-end gap-8 pr-6 py-6 text-2xl xs:py-4 lg:text-base'
                }
            >
                <Balance
                    section={'paimon-bargain'}
                    inModal={Boolean(purchasedItem)}
                    balance={balance}
                    setBalance={setBalance}
                    closePaymentModal={closePaymentModal}
                />
                <CloseButton
                    handler={() => {
                        playSfxEffect('/sounds/return.mp3');
                        router.replace('/wish-simulator');
                    }}
                    styles={'size-12 xs:size-10'}
                />
            </header>
            <Navbar currentCurrency={currentCurrency} setCurrency={setCurrencyHandler} />
            <div
                className={
                    'flex flex-wrap justify-center gap-4 mt-10 text-[#f7f5f6] text-3xl xs:justify-start xs:text-xl xs:ml-7 lg:ml-28'
                }
            >
                <button
                    className={
                        'relative size-96 flex flex-col items-center transition cursor-genshin hover:scale-105 hover:drop-shadow-shop-item xs:size-64'
                    }
                    onClick={() => buyItem('intertwined-fate')}
                >
                    <Image
                        src={fiveStarItemCard}
                        alt={'Фон пятизвёздочного предмета в магазине'}
                        quality={100}
                        draggable={false}
                        priority
                        className={'w-full'}
                    />
                    <Image
                        src={intertwinedFate}
                        alt={'Переплетающиеся судьбы'}
                        quality={100}
                        draggable={false}
                        priority
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
                            'absolute bottom-[8%] flex items-center justify-center gap-1'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${currentCurrency}.webp`}
                            alt={purchasesCurrencies[currentCurrency]}
                            quality={100}
                            width={40}
                            height={40}
                            draggable={false}
                            priority
                            className={'size-12 xs:size-7'}
                        />
                        <p>{priceOfFate[currentCurrency]}</p>
                    </div>
                </button>
                <button
                    className={
                        'relative size-96 flex flex-col items-center transition hover:scale-105 hover:drop-shadow-shop-item xs:size-64'
                    }
                    onClick={() => buyItem('acquaint-fate')}
                >
                    <Image
                        src={fiveStarItemCard}
                        alt={'Фон пятизвёздочного предмета в магазине'}
                        quality={100}
                        draggable={false}
                        className={'w-full'}
                    />
                    <Image
                        src={acquaintFate}
                        alt={'Судьбоносные встречи'}
                        quality={100}
                        draggable={false}
                        className={'absolute top-0 w-[65%]'}
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
                            'absolute bottom-[8%] flex items-center justify-center gap-1'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${currentCurrency}.webp`}
                            alt={purchasesCurrencies[currentCurrency]}
                            quality={100}
                            width={40}
                            height={40}
                            draggable={false}
                            className={'size-12 xs:size-7'}
                        />
                        <p>{priceOfFate[currentCurrency]}</p>
                    </div>
                </button>
            </div>
            {purchasedItem && (
                <PaymentModal
                    balance={balance}
                    shopItem={purchasedItem}
                    currency={currentCurrency}
                    price={priceOfFate[currentCurrency]}
                    setBalance={setBalance}
                    closePaymentModal={closePaymentModal}
                />
            )}
        </>
    );
}
