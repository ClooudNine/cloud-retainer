import Image from 'next/image';
import confirmationModal from '@/public/wish-simulator/assets/confirmation-modal.webp';
import genesisCrystal from '@/public/wish-simulator/assets/genesis-crystal.webp';
import primogem from '@/public/wish-simulator/assets/primogems.webp';
import exchangerArrow from '@/public/wish-simulator/assets/exchanger-arrow.webp';
import { useCallback, useState } from 'react';
import { BalanceStats } from '@/lib/common';
import clsx from 'clsx';
import Cancel from '@/app/wish-simulator/components/actionButtons/Cancel';
import Confirm from '@/app/wish-simulator/components/actionButtons/Confirm';
import { useRouter } from 'next/navigation';
import { playSfxEffect } from '@/app/wish-simulator/utils';

const CurrencyExchanger = ({
    balance,
    setBalance,
    closeCurrencyExchanger,
}: {
    balance: BalanceStats;
    setBalance: (newBalance: BalanceStats) => void;
    closeCurrencyExchanger: () => void;
}) => {
    const router = useRouter();
    const [count, setCount] = useState<number>(1);
    const [receiptOffer, setReceiptOffer] = useState<boolean>(false);
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            playSfxEffect('/sounds/click-7.mp3');
            setReceiptOffer(true);
        } else {
            let newBalance = { ...balance };
            newBalance.primogems += count;
            newBalance['genesis-crystal'] -= count;
            setBalance(newBalance);
            localStorage.setItem('Balance', JSON.stringify(newBalance));
            closeCurrencyExchanger();
        }
    }, [balance, closeCurrencyExchanger, count, setBalance]);

    const priceClasses = clsx({
        'text-[#ed6652]': count > balance['genesis-crystal'],
    });

    return (
        <section
            className={
                'absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'
            }
        >
            <div
                style={{ containerType: 'inline-size' }}
                className={
                    'relative text-[#525a68] w-[110vh] animate-modal-appearance mx-[2vw]'
                }
            >
                <Image
                    src={confirmationModal}
                    alt={'Покупка предмета'}
                    quality={100}
                    className={'w-full'}
                    draggable={false}
                />
                <p className={'absolute w-full text-center text-[3.5cqw] top-[7%]'}>
                    Получить Камни Истока
                </p>
                <div
                    className={
                        'absolute flex top-[18%] w-full h-[23%] items-center justify-center text-[2cqw]'
                    }
                >
                    <div
                        className={
                            'flex flex-col h-full items-center w-2/5 bg-[#d3cbbe] bg-opacity-80'
                        }
                    >
                        <Image
                            src={genesisCrystal}
                            alt={'Кристалл Сотворения'}
                            quality={100}
                            draggable={false}
                            className={'h-4/5 w-auto'}
                        />
                        <p className={'-mt-2'}>Кристалл Сотворения ×1</p>
                    </div>
                    <Image
                        src={exchangerArrow}
                        alt={'Стрелка'}
                        quality={100}
                        draggable={false}
                        className={'absolute h-2/5 w-auto'}
                    />
                    <div
                        className={
                            'flex flex-col h-full items-center w-2/5 bg-[#ecd6a4] bg-opacity-80'
                        }
                    >
                        <Image
                            src={primogem}
                            alt={'Примогем'}
                            quality={100}
                            draggable={false}
                            className={'h-4/5 w-auto'}
                        />
                        <p className={'-mt-2'}>Камень Истока ×1</p>
                    </div>
                </div>
                <div
                    className={
                        'absolute w-full flex flex-col items-center gap-[2cqw] top-[44%] text-[2cqw] leading-none'
                    }
                >
                    <p>Количество</p>
                    <div className={'relative flex items-center justify-center w-2/5'}>
                        <button
                            onClick={() => {
                                playSfxEffect('/sounds/click-9.mp3');
                                setCount(count - 1);
                            }}
                            disabled={count === 0}
                            className={
                                'absolute left-0 size-[3cqw] rounded-full bg-[#5b5f71] text-[#f0e3da] transition disabled:opacity-50 active:opacity-50'
                            }
                        >
                            -
                        </button>
                        <input
                            type={'text'}
                            value={count}
                            onInput={handleInput}
                            className={
                                'h-[3.5cqw] w-full rounded-full text-center outline-4 outline-double outline-[#ebe8e5] selection:bg-[#fdf4d7]'
                            }
                        />
                        <button
                            onClick={() => {
                                playSfxEffect('/sounds/click-9.mp3');
                                setCount(count + 1);
                            }}
                            disabled={count === 320000}
                            className={
                                'absolute right-0 size-[3cqw] rounded-full bg-[#5b5f71] text-[#f0e3da] transition disabled:opacity-50 active:opacity-50'
                            }
                        >
                            +
                        </button>
                    </div>
                    <div className={'w-1/2 flex gap-[2cqw] h-[4cqw] text-[#eae3db]'}>
                        <button
                            onClick={() => {
                                playSfxEffect('/sounds/click-4.mp3');
                                handleButtonClick(-100);
                            }}
                            disabled={count === 0}
                            className={
                                'flex-1 bg-[#5b5f71] rounded-full transition hover:ring-[0.5cqw] hover:ring-[#f7e8c7] disabled:bg-opacity-0 disabled:ring-2 disabled:ring-[#d4d2d0] disabled:text-[#d3d0ca] active:bg-[#e7d0b1] active:ring-[#9d9a92]'
                            }
                        >
                            -100
                        </button>
                        <button
                            onClick={() => {
                                playSfxEffect('/sounds/click-4.mp3');
                                handleButtonClick(100);
                            }}
                            disabled={count === 320000}
                            className={
                                'flex-1 bg-[#5b5f71] rounded-full transition hover:ring-[0.5cqw] hover:ring-[#f7e8c7] disabled:bg-opacity-0 disabled:ring-2 disabled:ring-[#d4d2d0] disabled:text-[#d3d0ca] active:bg-[#e7d0b1] active:ring-[#9d9a92]'
                            }
                        >
                            +100
                        </button>
                        <button
                            onClick={() => {
                                playSfxEffect('/sounds/click-4.mp3');
                                setCount(balance['genesis-crystal']);
                            }}
                            className={
                                'flex-1 bg-[#5b5f71] rounded-full transition hover:ring-[0.5cqw] hover:ring-[#f7e8c7] active:bg-[#e7d0b1] active:ring-[#9d9a92]'
                            }
                        >
                            Максимум
                        </button>
                    </div>
                    <div className={'flex gap-[1.5cqw] items-center text-[2cqw]'}>
                        <p>Стоимость:</p>
                        <Image
                            src={genesisCrystal}
                            alt={'Кристалл Сотворения'}
                            quality={100}
                            draggable={false}
                            className={'h-[4cqw] w-auto'}
                        />
                        <p className={priceClasses}>{count}</p>
                    </div>
                </div>
                <div className={'absolute flex justify-evenly w-full h-[10%] top-[83%]'}>
                    <Cancel handler={closeCurrencyExchanger} />
                    <Confirm handler={confirmExchange} disabledCondition={count === 0} />
                </div>
                {receiptOffer && (
                    <div
                        className={
                            'absolute w-full h-full flex flex-col items-center top-0 text-[#525a68] animate-modal-appearance'
                        }
                    >
                        <Image
                            src={confirmationModal}
                            alt={
                                'Подтверждение перехода на экран получения Кристаллов Сотворения'
                            }
                            quality={100}
                            draggable={false}
                            className={'h-full w-auto'}
                        />
                        <p className={'absolute top-[6.5%] text-[4cqw] sm:text-[3.5cqw]'}>
                            Пополнение кристаллов
                        </p>
                        <p
                            className={
                                'absolute top-[38%] text-center leading-tight text-[3.2cqw]'
                            }
                        >
                            Недостаточно Кристаллов Сотворения.
                            <br />
                            Перейти на экран получения Кристаллов?
                        </p>
                        <div
                            className={
                                'absolute flex justify-evenly w-full h-[10%] top-[83%]'
                            }
                        >
                            <Cancel handler={closeCurrencyExchanger} />
                            <Confirm
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