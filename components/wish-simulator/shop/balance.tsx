import Image from 'next/image';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import CurrencyExchanger from '@/components/wish-simulator/currency-exchanger';
import { playSfxEffect } from '@/lib/wish-simulator';

import { BalanceStats } from '@/lib/types';
import { useTranslations } from 'next-intl';

const Balance = ({
    section,
    inModal,
    balance,
    setBalance,
    closePaymentModal,
}: {
    section: 'paimon-bargain' | 'genesis-crystals';
    inModal: boolean;
    balance: BalanceStats;
    setBalance: (newBalance: BalanceStats) => void;
    closePaymentModal: () => void;
}) => {
    const t = useTranslations();

    const [isExchange, setIsExchange] = useState<boolean>(false);

    const balanceClasses = clsx('flex gap-4 text-white', {
        'z-20 absolute w-full justify-end top-0 right-0 bg-black/60 px-4 py-3 lg:pr-10 lg:py-5':
            inModal || isExchange,
    });

    const openExchangerClasses = clsx(
        'bg-[#ece5d8] text-[#3b4354] size-10 font-bold rounded-full leading-none transition cursor-genshin active:opacity-50 active:scale-95 hover:scale-110 xs:size-7',
        {
            hidden: isExchange,
        }
    );

    const openExchanger = useCallback(() => {
        playSfxEffect('sounds/click-8.mp3');
        setIsExchange(true);
        closePaymentModal();
    }, [closePaymentModal]);

    const closeExchanger = useCallback(() => {
        playSfxEffect('sounds/click-7.mp3');
        setIsExchange(false);
    }, []);

    return (
        <>
            <div className={balanceClasses}>
                {section === 'paimon-bargain' && !isExchange && (
                    <>
                        <div
                            className={
                                'flex h-12 items-center gap-2 px-2 bg-black/40 rounded-full ring-2 ring-[#84a4c5] min-w-max xs:h-8'
                            }
                        >
                            <Image
                                src={'wish-simulator/assets/masterless-starglitter.webp'}
                                width={40}
                                height={40}
                                alt={t('common.masterless-starglitter')}
                                draggable={false}
                                className={'h-[95%] w-auto'}
                            />
                            <p>{balance['masterless-starglitter']}</p>
                        </div>
                        <div
                            className={
                                'flex h-12 items-center gap-2 px-2 bg-black/40 rounded-full ring-2 ring-[#84a4c5] min-w-max xs:h-8'
                            }
                        >
                            <Image
                                src={'wish-simulator/assets/masterless-stardust.webp'}
                                width={40}
                                height={40}
                                alt={t('common.masterless-stardust')}
                                draggable={false}
                                className={'h-[95%] w-auto'}
                            />
                            <p>{balance['masterless-stardust']}</p>
                        </div>
                    </>
                )}
                <div
                    className={
                        'flex h-12 gap-2 pl-2 pr-0.5 items-center bg-black/40 rounded-full ring-2 ring-[#84a4c5] min-w-max xs:h-8'
                    }
                >
                    <Image
                        src={'wish-simulator/assets/primogem.webp'}
                        width={40}
                        height={40}
                        alt={t('common.primogem', { count: 1 })}
                        draggable={false}
                        className={'h-[95%] w-auto'}
                    />
                    <p className={'pr-1'}>{balance.primogem}</p>
                    <button onClick={openExchanger} className={openExchangerClasses}>
                        +
                    </button>
                </div>
                {(section === 'genesis-crystals' || isExchange) && (
                    <div
                        className={
                            'flex h-12 items-center gap-2 px-2 bg-black/40 rounded-full ring-2 ring-[#84a4c5] min-w-max xs:h-8'
                        }
                    >
                        <Image
                            src={'wish-simulator/assets/genesis-crystal.webp'}
                            width={40}
                            height={40}
                            alt={t('common.genesis-crystal.title', { count: 1 })}
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
