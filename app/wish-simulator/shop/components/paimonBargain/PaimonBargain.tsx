'use client';
import CloseButton from '@/app/wish-simulator/components/headerComponents/CloseButton';
import { useRouter } from 'next/navigation';
import Balance from '@/app/wish-simulator/shop/components/paimonBargain/Balance';
import Navbar from '@/app/wish-simulator/shop/components/paimonBargain/Navbar';
import { useState } from 'react';
import Image from 'next/image';
import intertwinedFate from '@/public/wish-simulator/assets/intertwined-fate.webp';
import acquaintFate from '@/public/wish-simulator/assets/acquaint-fate.webp';
import fiveStarItemCard from '@/public/wish-simulator/assets/5-star-shop-card.webp';
import PaymentModal from '@/app/wish-simulator/shop/components/PaymentModal';
import { PullCurrency, PurchasesCurrency } from '@/lib/common';

export const currencies: { [key in PurchasesCurrency]: string } = {
    'masterless-starglitter': 'Звёздный блеск',
    'masterless-stardust': 'Звёздная пыль',
    primogems: 'Камни Истока',
};

const priceOfFate: { [key in PurchasesCurrency]: number } = {
    'masterless-starglitter': 5,
    'masterless-stardust': 75,
    primogems: 160,
};
const PaimonBargain = () => {
    const router = useRouter();
    const [currentCurrency, setCurrentCurrency] = useState<PurchasesCurrency>(
        'masterless-starglitter'
    );
    const [purchasedItem, setPurchasedItem] = useState<PullCurrency | null>(null);
    return (
        <section className={'z-10 flex-1'}>
            <header
                className={
                    'flex text-white items-center justify-around h-20 lg:pr-10 lg:justify-end lg:gap-10'
                }
            >
                <Balance />
                <CloseButton handler={() => router.replace('/wish-simulator')} />
            </header>
            <Navbar currentCurrency={currentCurrency} setCurrency={setCurrentCurrency} />
            <div
                className={
                    'mt-12 flex flex-wrap justify-center md:ml-28 md:justify-start gap-6 text-[#f7f5f6]'
                }
            >
                <div
                    className={
                        'relative transition hover:scale-105 hover:drop-shadow-shop-item'
                    }
                    onClick={() => {
                        setPurchasedItem('intertwined-fate');
                    }}
                >
                    <Image
                        src={fiveStarItemCard}
                        alt={'Фон пятизвёздочного предмета в магазине'}
                        quality={100}
                    />
                    <Image
                        src={intertwinedFate}
                        alt={'Переплетающиеся судьбы'}
                        quality={100}
                        className={'absolute top-0 left-[18%] w-[65%]'}
                    />
                    <p
                        className={
                            'absolute top-[55%] w-full drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] text-2xl text-center'
                        }
                    >
                        Переплетающиеся <br /> судьбы
                    </p>
                    <div
                        className={
                            'absolute bottom-2 w-full flex items-center justify-center gap-1'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${currentCurrency}.webp`}
                            alt={currencies[currentCurrency]}
                            quality={100}
                            width={40}
                            height={40}
                        />
                        <p className={'text-xl'}>{priceOfFate[currentCurrency]}</p>
                    </div>
                </div>
                <div
                    className={
                        'relative transition hover:scale-105 hover:drop-shadow-shop-item'
                    }
                    onClick={() => {
                        setPurchasedItem('acquaint-fate');
                    }}
                >
                    <Image
                        src={fiveStarItemCard}
                        alt={'Фон пятизвёздочного предмета в магазине'}
                        quality={100}
                    />
                    <Image
                        src={acquaintFate}
                        alt={'Судьбоносные встречи'}
                        className={'absolute top-0 left-[18%] w-[65%]'}
                    />
                    <p
                        className={
                            'absolute top-[55%] w-full drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] text-2xl text-center'
                        }
                    >
                        Cудьбоносные <br /> встречи
                    </p>
                    <div
                        className={
                            'absolute bottom-2 w-full flex items-center justify-center gap-1'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${currentCurrency}.webp`}
                            alt={currencies[currentCurrency]}
                            quality={100}
                            width={40}
                            height={40}
                        />
                        <p className={'text-xl'}>{priceOfFate[currentCurrency]}</p>
                    </div>
                </div>
            </div>
            {purchasedItem && (
                <PaymentModal
                    shopItem={purchasedItem}
                    closePaymentModal={() => setPurchasedItem(null)}
                />
            )}
        </section>
    );
};

export default PaimonBargain;
