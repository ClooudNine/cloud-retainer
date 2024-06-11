import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import ObtainItemScreen from '@/components/wish-simulator/obtain-item-screen';
import clsx from 'clsx';
import { playSfxEffect } from '@/lib/wish-simulator';

import { BalanceStats } from '@/lib/types';
import { useTranslations } from 'next-intl';

const ObtainModal = ({
    balance,
    setBalance,
    count,
    closeObtainModal,
}: {
    balance: BalanceStats;
    setBalance: (balance: BalanceStats) => void;
    count: number;
    closeObtainModal: () => void;
}) => {
    const t = useTranslations();
    const convertToPrimogems = useRef<HTMLInputElement | null>(null);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const confirmObtain = useCallback(() => {
        let newBalance = { ...balance };

        playSfxEffect('sounds/click-7.mp3');
        playSfxEffect('sounds/obtain-item.mp3');

        if (convertToPrimogems.current?.checked) {
            newBalance['primogem'] += count;
            closeObtainModal();
        } else {
            newBalance['genesis-crystal'] += count;
            setIsSuccessful(true);
        }

        setBalance(newBalance);
        localStorage.setItem('balance', JSON.stringify(newBalance));
    }, [balance, closeObtainModal, convertToPrimogems, count, setBalance]);

    const closeObtainModalHandler = useCallback(() => {
        playSfxEffect('sounds/click-7.mp3');
        closeObtainModal();
    }, [closeObtainModal]);

    const obtainModalClasses = clsx(
        'flex flex-col justify-around items-center text-black w-[80vh] h-[50vmin] bg-white rounded-xl mx-4 animate-modal-appearance',
        {
            'opacity-0': isSuccessful,
        }
    );

    return (
        <>
            <section
                className={
                    'absolute z-10 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'
                }
            >
                <div className={obtainModalClasses}>
                    <Image
                        src={`wish-simulator/assets/shop/genesis-crystals/${count}-crystals.webp`}
                        alt={count + ` ${t('common.genesis-crystal.title', { count: count })}`}
                        width={300}
                        height={300}
                        draggable={false}
                        className={'h-1/2 w-auto'}
                    />
                    <p className={'text-2xl'}> {t('common.genesis-crystal.title', { count: count })}</p>
                    <label className={'flex items-center gap-2 text-lg cursor-genshin'}>
                        <input
                            type={'checkbox'}
                            ref={convertToPrimogems}
                            onClick={() => playSfxEffect('sounds/click-1.mp3')}
                            className={'size-4 cursor-genshin'}
                        />
                        {t('wish-simulator.convert-to-primogems')}
                    </label>
                    <div className={'w-full flex justify-center text-white gap-4 text-xl'}>
                        <button
                            onClick={closeObtainModalHandler}
                            className={
                                'w-[30%] bg-red-600 rounded-2xl py-2 cursor-genshin transition-colors hover:bg-red-700'
                            }
                        >
                            {t('wish-simulator.cancel')}
                        </button>
                        <button
                            onClick={confirmObtain}
                            className={
                                'w-[30%] bg-green-600 rounded-2xl py-2 cursor-genshin transition-colors hover:bg-green-700'
                            }
                        >
                            {t('wish-simulator.get')}
                        </button>
                    </div>
                </div>
            </section>
            {isSuccessful && (
                <ObtainItemScreen
                    item={'genesis-crystal'}
                    count={count}
                    closeSuccessfulPurchase={closeObtainModal}
                />
            )}
        </>
    );
};

export default ObtainModal;
