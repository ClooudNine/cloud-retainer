import Image from 'next/image';
import confirmationModal from '@/public/wish-simulator/assets/confirmation-modal.webp';
import star from '@/public/common/star.webp';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import Cancel from '@/app/wish-simulator/components/actionButtons/Cancel';
import Confirm from '@/app/wish-simulator/components/actionButtons/Confirm';
import ObtainItemScreen from '@/app/wish-simulator/components/ObtainItemScreen';
import { purchasesCurrencies, pullCurrencyDescriptions } from '@/lib/shop';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { BalanceStats, PullCurrency, PurchasesCurrency } from '@/lib/banners';

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
        'relative flex flex-col items-center text-[#475467] mx-4 animate-modal-appearance',
        {
            'opacity-0': isSuccessful,
        }
    );
    const priceClasses = clsx('text-base pr-2', {
        'text-white': valetCount >= price,
        'text-[#ed6652]': valetCount < price,
    });

    const confirmPayment = useCallback(() => {
        let newBalance = { ...balance };
        newBalance[shopItem] += itemCount;
        newBalance[currency] -= itemCount * price;
        setBalance(newBalance);
        localStorage.setItem('balance', JSON.stringify(newBalance));
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
                    'absolute z-10 top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center'
                }
            >
                <div className={paymentModalClasses}>
                    <Image
                        src={confirmationModal}
                        alt={'Покупка предмета'}
                        quality={100}
                        draggable={false}
                        className={'w-[110vh]'}
                    />
                    <p className={'absolute top-[5%] text-3xl'}>Получить предмет</p>
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
                                'flex flex-col text-[#ece5d7] gap-2 pr-2 pt-2 overflow-y-scroll genshin-scrollbar lg:overflow-hidden'
                            }
                        >
                            <p className={'text-xl'}>
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
                                        className={'h-5 w-auto drop-shadow'}
                                    />
                                ))}
                            </div>
                            <p className={'text-base'}>
                                {pullCurrencyDescriptions[shopItem].description}
                            </p>
                        </div>
                    </div>
                    <p className={'absolute top-[49%] text-2xl'}>Количество</p>
                    <p className={'absolute top-[57%] text-2xl'}>{itemCount}</p>
                    <div
                        className={
                            'absolute w-full flex items-center justify-center gap-6 top-[63%]'
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
                                        'cursor-genshin transition rounded-full size-8 bg-[#4a5366] text-[#ece5d7] text-3xl/none disabled:opacity-40 disabled:hover:scale-100 hover:scale-110 active:opacity-40 active:scale-100'
                                    }
                                >
                                    -
                                </button>
                                <p className={'text-2xl'}>1</p>
                            </>
                        )}
                        <input
                            type={'range'}
                            value={itemCount}
                            min={1}
                            max={Math.trunc(valetCount / price)}
                            onChange={(e) => setItemCount(Number(e.currentTarget.value))}
                            className={
                                'w-[45%] h-2 rounded-full cursor-genshin payment-track'
                            }
                        />
                        {valetCount >= price && (
                            <>
                                <p className={'text-2xl'}>
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
                                        'cursor-genshin transition rounded-full size-8 bg-[#4a5366] text-[#eeefea] text-3xl/none disabled:opacity-40 disabled:hover:scale-100 active:opacity-40 active:scale-100 hover:scale-110'
                                    }
                                >
                                    +
                                </button>
                            </>
                        )}
                    </div>
                    <div
                        className={
                            'absolute w-full flex gap-4 items-center justify-center top-[69%]'
                        }
                    >
                        <p className={'text-xl'}>Стоимость</p>
                        <div
                            className={
                                'flex items-center gap-2 bg-[#4b526c] rounded-full'
                            }
                        >
                            <Image
                                src={`/wish-simulator/assets/${currency}.webp`}
                                alt={purchasesCurrencies[currency]}
                                quality={100}
                                width={50}
                                height={50}
                                draggable={false}
                                className={'h-8 w-auto'}
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
                            title={'Получить'}
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
