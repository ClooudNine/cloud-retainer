import Image from 'next/image';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import Cancel from '@/components/ui/cancel';
import Confirm from '@/components/ui/confirm';
import { useRouter } from '@/navigation';
import { playSfxEffect } from '@/lib/wish-simulator';

import { BalanceStats } from '@/lib/types';
import { useTranslations } from 'next-intl';

const CurrencyExchanger = ({
    balance,
    setBalance,
    closeCurrencyExchanger,
}: {
    balance: BalanceStats;
    setBalance: (newBalance: BalanceStats) => void;
    closeCurrencyExchanger: () => void;
}) => {
    const t = useTranslations();
    const router = useRouter();

    const [count, setCount] = useState<number>(1);
    const [redirectModal, setRedirectModal] = useState<boolean>(false);

    const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        const newCount = Math.min(parseInt(inputValue) || 0, 320000);
        setCount(newCount);
    };

    const handleButtonClick = (amount: number) => {
        const newValue = Math.min(Math.max(count + amount, 0), 320000);
        setCount(newValue);
    };

    const confirmExchange = useCallback(() => {
        if (count > balance['genesis-crystal']) {
            playSfxEffect('sounds/click-7.mp3');
            setRedirectModal(true);
        } else {
            let newBalance = { ...balance };
            newBalance.primogem += count;
            newBalance['genesis-crystal'] -= count;
            setBalance(newBalance);
            localStorage.setItem('balance', JSON.stringify(newBalance));
            closeCurrencyExchanger();
        }
    }, [balance, closeCurrencyExchanger, count, setBalance]);

    const priceClasses = clsx({
        'text-[#ed6652]': count > balance['genesis-crystal'],
    });

    return (
        <section
            className={
                'absolute z-10 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'
            }
        >
            <div className={'relative text-[#525a68] animate-modal-appearance mx-4'}>
                <Image
                    src={'wish-simulator/assets/confirmation-modal.webp'}
                    width={930}
                    height={594}
                    alt={t('image-alts.buy-item-background')}
                    draggable={false}
                    className={'w-[120vh]'}
                />
                <p className={'absolute w-full text-center text-3xl top-[6%]'}>
                    {t('wish-simulator.get')} {t('common.primogem', { count: 2 })}
                </p>
                <div className={'absolute flex top-[18%] w-full h-[23%] items-center justify-center text-lg'}>
                    <div className={'flex flex-col h-full items-center w-2/5 bg-[#d3cbbe]/80'}>
                        <Image
                            src={'wish-simulator/assets/genesis-crystal.webp'}
                            width={256}
                            height={256}
                            alt={t('common.genesis-crystal.title', { count: 1 })}
                            draggable={false}
                            className={'h-4/5 w-auto'}
                        />
                        <p className={'-mt-2'}>{t('common.genesis-crystal.title', { count: 1 })} ×1</p>
                    </div>
                    <Image
                        src={'wish-simulator/assets/exchanger-arrow.webp'}
                        width={50}
                        height={57}
                        alt={t('wish-simulator.arrow')}
                        draggable={false}
                        className={'absolute h-2/5 w-auto'}
                    />
                    <div className={'flex flex-col h-full items-center w-2/5 bg-[#ecd6a4]/80'}>
                        <Image
                            src={'wish-simulator/assets/primogem.webp'}
                            width={256}
                            height={256}
                            alt={t('common.primogem', { count: 1 })}
                            draggable={false}
                            className={'h-4/5 w-auto'}
                        />
                        <p className={'-mt-2'}>{t('common.primogem', { count: 1 })} ×1</p>
                    </div>
                </div>
                <div
                    className={
                        'absolute w-full h-[33%] flex flex-col items-center justify-between gap-2.5 top-[44%] text-lg/none xs:gap-4'
                    }
                >
                    <p>{t('wish-simulator.count')}</p>
                    <div className={'relative flex items-center justify-center w-2/5'}>
                        <button
                            onClick={() => {
                                playSfxEffect('sounds/click-9.mp3');
                                setCount(count - 1);
                            }}
                            disabled={count === 0}
                            className={
                                'absolute left-0 size-7 rounded-full bg-[#5b5f71] text-[#f0e3da] transition-opacity disabled:opacity-50 active:opacity-50'
                            }
                        >
                            -
                        </button>
                        <input
                            type={'text'}
                            value={count}
                            onInput={handleCountInput}
                            className={
                                'h-8 w-full rounded-full text-center outline-2 outline-double outline-[#ebe8e5] selection:bg-[#fdf4d7] lg:outline-4'
                            }
                        />
                        <button
                            onClick={() => {
                                playSfxEffect('sounds/click-9.mp3');
                                setCount(count + 1);
                            }}
                            disabled={count === 320000}
                            className={
                                'absolute right-0 size-7 rounded-full bg-[#5b5f71] text-[#f0e3da] transition-opacity disabled:opacity-50 active:opacity-50'
                            }
                        >
                            +
                        </button>
                    </div>
                    <div className={'w-1/2 flex gap-4 h-6 text-[#eae3db]'}>
                        <button
                            onClick={() => {
                                playSfxEffect('sounds/click-4.mp3');
                                handleButtonClick(-100);
                            }}
                            disabled={count === 0}
                            className={
                                'flex-1 bg-[#5b5f71] flex justify-center items-center py-5 rounded-full transition hover:ring-2 hover:ring-[#f7e8c7] disabled:bg-opacity-0 disabled:ring-2 disabled:ring-[#d4d2d0] disabled:text-[#d3d0ca] active:bg-[#e7d0b1] active:ring-[#9d9a92] lg:hover:ring-4'
                            }
                        >
                            -100
                        </button>
                        <button
                            onClick={() => {
                                playSfxEffect('sounds/click-4.mp3');
                                handleButtonClick(100);
                            }}
                            disabled={count === 320000}
                            className={
                                'flex-1 bg-[#5b5f71] flex justify-center items-center py-5 rounded-full transition hover:ring-2 hover:ring-[#f7e8c7] disabled:bg-opacity-0 disabled:ring-2 disabled:ring-[#d4d2d0] disabled:text-[#d3d0ca] active:bg-[#e7d0b1] active:ring-[#9d9a92] lg:hover:ring-4'
                            }
                        >
                            +100
                        </button>
                        <button
                            onClick={() => {
                                playSfxEffect('sounds/click-4.mp3');
                                setCount(balance['genesis-crystal']);
                            }}
                            className={
                                'flex-1 bg-[#5b5f71] flex justify-center items-center py-5 rounded-full transition hover:ring-2 hover:ring-[#f7e8c7] active:bg-[#e7d0b1] active:ring-[#9d9a92] lg:hover:ring-4'
                            }
                        >
                            {t('wish-simulator.max')}
                        </button>
                    </div>
                    <div className={'flex gap-3 items-center text-xl'}>
                        <p> {t('wish-simulator.price')}</p>
                        <Image
                            src={'wish-simulator/assets/genesis-crystal.webp'}
                            width={60}
                            height={60}
                            alt={t('common.genesis-crystal.title', { count: 1 })}
                            draggable={false}
                            className={'h-10 w-auto'}
                        />
                        <p className={priceClasses}>{count}</p>
                    </div>
                </div>
                <div className={'absolute flex justify-evenly w-full h-[10%] top-[83%]'}>
                    <Cancel handler={closeCurrencyExchanger} />
                    <Confirm
                        title={t('wish-simulator.exchange')}
                        handler={confirmExchange}
                        disabledCondition={count === 0}
                    />
                </div>
                {redirectModal && (
                    <div
                        className={
                            'absolute w-full h-full flex flex-col items-center top-0 text-[#525a68] animate-modal-appearance'
                        }
                    >
                        <Image
                            src={'wish-simulator/assets/confirmation-modal.webp'}
                            fill
                            alt={t('image-alts.go-to-genesis-crystal-shop')}
                            draggable={false}
                        />
                        <p className={'absolute top-[5.5%] text-3xl'}>
                            {t('wish-simulator.genesis-crystals')}
                        </p>
                        <p
                            className={'absolute top-[38%] text-center text-2xl/tight'}
                            dangerouslySetInnerHTML={{ __html: t.raw('wish-simulator.crystals-not-enough') }}
                        ></p>
                        <div className={'absolute flex justify-evenly w-full h-[10%] top-[83%]'}>
                            <Cancel handler={closeCurrencyExchanger} />
                            <Confirm
                                title={t('wish-simulator.go-over')}
                                handler={() => {
                                    closeCurrencyExchanger();
                                    router.push('/wish-simulator/shop/genesis-crystals');
                                }}
                                disabledCondition={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CurrencyExchanger;
