import Image from 'next/image';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import Cancel from '@/components/ui/cancel';
import Confirm from '@/components/ui/confirm';
import ObtainItemScreen from '@/components/wish-simulator/obtain-item-screen';
import { playSfxEffect } from '@/lib/wish-simulator';
import { BalanceStats, PullCurrency, PurchasesCurrency } from '@/lib/types';
import { useTranslations } from 'next-intl';

const PaymentModal = ({
    balance,
    shopItem,
    currency,
    price,
    setBalance,
    closePaymentModal,
}: {
    balance: BalanceStats;
    shopItem: PullCurrency;
    currency: PurchasesCurrency;
    price: number;
    setBalance: (balance: BalanceStats) => void;
    closePaymentModal: () => void;
}) => {
    const t = useTranslations();

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
        setIsSuccessful(true);
        playSfxEffect('sounds/click-7.mp3');
        playSfxEffect('sounds/obtain-item.mp3');
    }, [balance, currency, itemCount, price, setBalance, shopItem]);

    const closePaymentModalHandler = useCallback(() => {
        playSfxEffect('sounds/click-7.mp3');
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
                        src={'wish-simulator/assets/confirmation-modal.webp'}
                        width={1200}
                        height={675}
                        alt={t('image-alts.buy-item-background')}
                        draggable={false}
                        className={'w-[110vh]'}
                    />
                    <p className={'absolute top-[5%] text-3xl'}>{t('wish-simulator.get-item')}</p>
                    <div
                        className={
                            'absolute w-4/5 h-[30%] top-[18%] flex bg-[linear-gradient(170deg,_rgba(135,120,117,1)_0%,_rgba(229,185,114,1)_100%)]'
                        }
                    >
                        <Image
                            src={`wish-simulator/assets/${shopItem}.webp`}
                            alt={t(`common.${shopItem}.title`)}
                            width={150}
                            height={150}
                            draggable={false}
                            className={'h-full w-auto'}
                        />
                        <div
                            className={
                                'flex flex-col text-[#ece5d7] gap-2 pr-2 pt-2 overflow-y-auto genshin-scrollbar'
                            }
                        >
                            <p className={'text-xl'}>{t(`common.${shopItem}.title`)}</p>
                            <div className={'flex gap-1'}>
                                {Array.from(Array(5).keys()).map((number) => (
                                    <Image
                                        key={number}
                                        src={'common/star.webp'}
                                        width={40}
                                        height={40}
                                        alt={t('common.star')}
                                        draggable={false}
                                        className={'h-5 w-auto drop-shadow'}
                                    />
                                ))}
                            </div>
                            <p className={'text-base'}>{t(`common.${shopItem}.description`)}</p>
                        </div>
                    </div>
                    <p className={'absolute top-[49%] text-2xl'}>{t('wish-simulator.count')}</p>
                    <p className={'absolute top-[57%] text-2xl'}>{itemCount}</p>
                    <div className={'absolute w-full flex items-center justify-center gap-6 top-[63%]'}>
                        {valetCount >= price && (
                            <>
                                <button
                                    onClick={() => {
                                        playSfxEffect('sounds/click-8.mp3');
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
                            className={'w-[45%] h-2 rounded-full cursor-genshin payment-track'}
                        />
                        {valetCount >= price && (
                            <>
                                <p className={'text-2xl'}>{Math.floor(valetCount / price)}</p>
                                <button
                                    onClick={() => {
                                        playSfxEffect('sounds/click-8.mp3');
                                        setItemCount(itemCount + 1);
                                    }}
                                    disabled={itemCount === Math.floor(valetCount / price)}
                                    className={
                                        'cursor-genshin transition rounded-full size-8 bg-[#4a5366] text-[#eeefea] text-3xl/none disabled:opacity-40 disabled:hover:scale-100 active:opacity-40 active:scale-100 hover:scale-110'
                                    }
                                >
                                    +
                                </button>
                            </>
                        )}
                    </div>
                    <div className={'absolute w-full flex gap-4 items-center justify-center top-[69%]'}>
                        <p className={'text-xl'}>{t('wish-simulator.price')}</p>
                        <div className={'flex items-center gap-2 bg-[#4b526c] rounded-full'}>
                            <Image
                                src={`wish-simulator/assets/${currency}.webp`}
                                alt={t(`common.${currency}`, { count: 1 })}
                                width={50}
                                height={50}
                                draggable={false}
                                className={'h-8 w-auto'}
                            />
                            <p className={priceClasses}>{price * itemCount}</p>
                        </div>
                    </div>
                    <div className={'absolute flex justify-evenly w-full h-[10%] top-[83%]'}>
                        <Cancel handler={closePaymentModalHandler} />
                        <Confirm
                            title={t('wish-simulator.get')}
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
