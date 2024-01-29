import Image from 'next/image';
import confirmationModal from '@/public/wish-simulator/assets/confirmation-modal.webp';
import star from '@/public/common/star.webp';
import { useCallback, useState } from 'react';
import { BalanceStats, PullCurrency, PurchasesCurrency } from '@/lib/common';
import clsx from 'clsx';
import Cancel from '@/app/wish-simulator/components/actionButtons/Cancel';
import Confirm from '@/app/wish-simulator/components/actionButtons/Confirm';
import ObtainItemScreen from '@/app/wish-simulator/components/ObtainItemScreen';
import { purchasesCurrencies, pullCurrencyDescriptions } from '@/lib/shop';
import { playSfxEffect } from '@/app/wish-simulator/utils';

const PaymentModal = ({
    balance,
    shopItem,
    currency,
    price,
    setBalance,
    setBalanceInModal,
    closePaymentModal,
}: {
    balance: BalanceStats;
    shopItem: PullCurrency;
    currency: PurchasesCurrency;
    price: number;
    setBalance: (balance: BalanceStats) => void;
    setBalanceInModal: () => void;
    closePaymentModal: () => void;
}) => {
    const valetCount = balance[currency];
    const [itemCount, setItemCount] = useState<number>(1);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const paymentModalClasses = clsx(
        'flex flex-col items-center text-[#475467] w-[110vh] mx-[2vw] animate-modal-appearance',
        {
            'opacity-0': isSuccessful,
        }
    );
    const priceClasses = clsx('text-[2cqw] pr-2', {
        'text-white': valetCount >= price,
        'text-[#ed6652]': valetCount < price,
    });

    const confirmPayment = useCallback(() => {
        let newBalance = { ...balance };
        newBalance[shopItem] += itemCount;
        newBalance[currency] -= itemCount * price;
        setBalance(newBalance);
        localStorage.setItem('Balance', JSON.stringify(newBalance));
        setBalanceInModal();
        setIsSuccessful(true);
        playSfxEffect('/sounds/click-7.mp3');
        playSfxEffect('/sounds/obtain-item.mp3');
    }, [balance, currency, itemCount, price, setBalance, setBalanceInModal, shopItem]);

    const closePaymentModalHandler = useCallback(() => {
        playSfxEffect('/sounds/click-7.mp3');
        closePaymentModal();
    }, [closePaymentModal]);

    return (
        <>
            <section
                className={
                    'absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'
                }
            >
                <div
                    style={{ containerType: 'inline-size' }}
                    className={paymentModalClasses}
                >
                    <Image
                        src={confirmationModal}
                        alt={'Покупка предмета'}
                        quality={100}
                        draggable={false}
                        className={'w-full'}
                    />
                    <p className={'absolute top-[4%] text-[4cqw]'}>Получить предмет</p>
                    <div
                        className={
                            'absolute w-4/5 h-[30%] top-[18%] flex bg-[linear-gradient(170deg,_rgba(135,120,117,1)_0%,_rgba(229,185,114,1)_100%)]'
                        }
                    >
                        <Image
                            src={`/wish-simulator/assets/${shopItem}.webp`}
                            alt={shopItem}
                            width={150}
                            height={150}
                            draggable={false}
                            className={'h-full w-auto'}
                        />
                        <div
                            className={
                                'flex flex-col text-[#ece5d7] gap-[1cqw] pr-2 pt-2 overflow-y-scroll genshin-scrollbar lg:overflow-hidden'
                            }
                        >
                            <p className={'text-[4cqw] sm:text-[2.5cqw]'}>
                                {pullCurrencyDescriptions[shopItem].translate}
                            </p>
                            <div className={'flex gap-1'}>
                                {Array.from(Array(5).keys()).map((number) => (
                                    <Image
                                        key={number}
                                        src={star}
                                        alt={'Звезда'}
                                        quality={100}
                                        draggable={false}
                                        className={'h-[2.5cqw] w-auto drop-shadow'}
                                    />
                                ))}
                            </div>
                            <p className={'text-[3cqw] sm:text-[2cqw]'}>
                                {pullCurrencyDescriptions[shopItem].description}
                            </p>
                        </div>
                    </div>
                    <p className={'absolute top-[49%] text-[2cqw]'}>Количество</p>
                    <p className={'absolute top-[54%] text-[3.5cqw]'}>{itemCount}</p>
                    <div
                        className={
                            'absolute w-full flex items-center justify-center gap-[2.5cqw] top-[62%]'
                        }
                    >
                        {valetCount >= price && (
                            <>
                                <button
                                    onClick={() => {
                                        playSfxEffect('/sounds/click-8.mp3');
                                        setItemCount(itemCount - 1);
                                    }}
                                    disabled={itemCount === 1}
                                    className={
                                        'cursor-genshin leading-none transition rounded-full size-[4cqw] bg-[#4a5366] text-[#ece5d7] text-[2vw] disabled:opacity-40 disabled:hover:scale-100 hover:scale-110 active:opacity-40 active:scale-100'
                                    }
                                >
                                    -
                                </button>
                                <p className={'text-[3cqw]'}>1</p>
                            </>
                        )}
                        <input
                            type={'range'}
                            value={itemCount}
                            min={1}
                            max={Math.trunc(valetCount / price)}
                            onChange={(e) => setItemCount(Number(e.currentTarget.value))}
                            className={'w-[45%] h-[1cqw] rounded-full cursor-genshin'}
                        />
                        {valetCount >= price && (
                            <>
                                <p className={'text-[3cqw]'}>
                                    {Math.floor(valetCount / price)}
                                </p>
                                <button
                                    onClick={() => {
                                        playSfxEffect('/sounds/click-8.mp3');
                                        setItemCount(itemCount + 1);
                                    }}
                                    disabled={
                                        itemCount === Math.floor(valetCount / price)
                                    }
                                    className={
                                        'cursor-genshin transition rounded-full leading-none size-[4cqw] bg-[#4a5366] text-[#eeefea] text-[2vw] disabled:opacity-40 disabled:hover:scale-100 active:opacity-40 active:scale-100 hover:scale-110'
                                    }
                                >
                                    +
                                </button>
                            </>
                        )}
                    </div>
                    <div
                        className={
                            'absolute w-full flex gap-[2cqw] items-center justify-center top-[69%]'
                        }
                    >
                        <p className={'text-[2.3cqw]'}>Стоимость</p>
                        <div
                            className={
                                'flex items-center gap-[0.8cqw] bg-[#4b526c] rounded-full'
                            }
                        >
                            <Image
                                src={`/wish-simulator/assets/${currency}.webp`}
                                alt={purchasesCurrencies[currency]}
                                quality={100}
                                width={50}
                                height={50}
                                draggable={false}
                                className={'h-[3.5cqw] w-auto'}
                            />
                            <p className={priceClasses}>{price * itemCount}</p>
                        </div>
                    </div>
                    <div
                        className={
                            'absolute flex justify-evenly w-full h-[10%] top-[83%]'
                        }
                    >
                        <Cancel handler={closePaymentModalHandler} />
                        <Confirm
                            handler={confirmPayment}
                            disabledCondition={valetCount < price}
                        />
                    </div>
                </div>
            </section>
            {isSuccessful && (
                <ObtainItemScreen
                    item={shopItem}
                    count={itemCount}
                    closeSuccessfulPurchase={closePaymentModal}
                />
            )}
        </>
    );
};

export default PaymentModal;
