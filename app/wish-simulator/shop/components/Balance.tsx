import Image from 'next/image';
import masterlessStarglitter from '@/public/wish-simulator/assets/masterless-starglitter.webp';
import masterlessStardust from '@/public/wish-simulator/assets/masterless-stardust.webp';
import primogem from '@/public/wish-simulator/assets/primogems.webp';
import genesisCrystal from '@/public/wish-simulator/assets/genesis-crystal.webp';
import { BalanceStats } from '@/lib/common';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import CurrencyExchanger from '@/app/wish-simulator/components/CurrencyExchanger';
import { playSfxEffect } from '@/app/wish-simulator/utils';

const Balance = ({
    section,
    inModal,
    balance,
    setInModal,
    setBalance,
    closePaymentModal,
}: {
    section: 'paimon-bargain' | 'genesis-crystals';
    inModal: boolean;
    balance: BalanceStats;
    setInModal: () => void;
    setBalance: (newBalance: BalanceStats) => void;
    closePaymentModal: () => void;
}) => {
    const [isExchange, setIsExchange] = useState<boolean>(false);

    const balanceClasses = clsx('flex gap-4 text-white', {
        'z-20 absolute w-full justify-end top-0 right-0 bg-black bg-opacity-60 px-4 py-3 lg:pr-10 lg:py-5':
            inModal || isExchange,
    });
    const openExchangerClasses = clsx(
        'bg-[#ece5d8] text-[#3b4354] size-5 leading-none font-bold rounded-full transition cursor-genshin active:opacity-50 active:scale-95 hover:scale-110 sm:size-4 lg:size-7',
        {
            hidden: isExchange,
        }
    );

    const openExchanger = useCallback(() => {
        playSfxEffect('/sounds/click-8.mp3');
        setIsExchange(true);
        closePaymentModal();
    }, [closePaymentModal]);

    const closeExchanger = useCallback(() => {
        playSfxEffect('/sounds/click-7.mp3');
        setInModal();
        setIsExchange(false);
    }, [setInModal]);

    return (
        <>
            <div className={balanceClasses}>
                {section === 'paimon-bargain' && !isExchange && (
                    <>
                        <div
                            className={
                                'flex h-6 items-center gap-2 px-2 bg-black bg-opacity-40 rounded-full ring-2 ring-[#84a4c5] min-w-max sm:h-4 lg:h-8'
                            }
                        >
                            <Image
                                src={masterlessStarglitter}
                                alt={'Блуждающий звёздный блеск'}
                                quality={100}
                                draggable={false}
                                className={'h-[95%] w-auto'}
                            />
                            <p>{balance['masterless-starglitter']}</p>
                        </div>
                        <div
                            className={
                                'flex h-6 items-center gap-2 px-2 bg-black bg-opacity-40 rounded-full ring-2 ring-[#84a4c5] min-w-max sm:h-4 lg:h-8'
                            }
                        >
                            <Image
                                src={masterlessStardust}
                                alt={'Блуждающая звёздная пыль'}
                                quality={100}
                                draggable={false}
                                className={'h-[95%] w-auto'}
                            />
                            <p>{balance['masterless-stardust']}</p>
                        </div>
                    </>
                )}
                <div
                    className={
                        'h-6 flex gap-2 pl-2 pr-0.5 items-center bg-black bg-opacity-40 rounded-full ring-2 ring-[#84a4c5] min-w-max sm:h-4 lg:h-8'
                    }
                >
                    <Image
                        src={primogem}
                        alt={'Примогемы'}
                        quality={100}
                        draggable={false}
                        className={'h-[95%] w-auto'}
                    />
                    <p>{balance.primogems}</p>
                    <button onClick={openExchanger} className={openExchangerClasses}>
                        +
                    </button>
                </div>
                {(section === 'genesis-crystals' || isExchange) && (
                    <div
                        className={
                            'flex h-6 items-center gap-2 px-2 bg-black bg-opacity-40 rounded-full ring-2 ring-[#84a4c5] min-w-max sm:h-4 lg:h-8'
                        }
                    >
                        <Image
                            src={genesisCrystal}
                            alt={'Кристалл сотворения'}
                            quality={100}
                            draggable={false}
                            className={'h-full w-auto'}
                        />
                        <p>{balance['genesis-crystal']}</p>
                    </div>
                )}
            </div>
            {isExchange && (
                <CurrencyExchanger
                    balance={balance}
                    setBalance={setBalance}
                    closeCurrencyExchanger={closeExchanger}
                />
            )}
        </>
    );
};

export default Balance;
