import Image from 'next/image';
import { useCallback, useState } from 'react';
import { BalanceStats } from '@/lib/common';
import ObtainItemScreen from '@/app/wish-simulator/components/ObtainItemScreen';
import clsx from 'clsx';
import { playSfxEffect } from '@/app/wish-simulator/utils';

const ObtainModal = ({
    balance,
    setBalance,
    count,
    setBalanceInModal,
    closeObtainModal,
}: {
    balance: BalanceStats;
    setBalance: (balance: BalanceStats) => void;
    count: number;
    setBalanceInModal: () => void;
    closeObtainModal: () => void;
}) => {
    const [convertToPrimogems, setConvertToPrimogems] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const confirmObtain = useCallback(() => {
        playSfxEffect('/sounds/click-7.mp3');
        let newBalance = { ...balance };
        playSfxEffect('/sounds/obtain-item.mp3');
        if (convertToPrimogems) {
            newBalance['primogems'] += count;
            closeObtainModal();
        } else {
            newBalance['genesis-crystal'] += count;
            setBalanceInModal();
            setIsSuccessful(true);
        }
        setBalance(newBalance);
        localStorage.setItem('Balance', JSON.stringify(newBalance));
    }, [
        balance,
        closeObtainModal,
        convertToPrimogems,
        count,
        setBalance,
        setBalanceInModal,
    ]);

    const closeObtainModalHandler = useCallback(() => {
        playSfxEffect('/sounds/click-7.mp3');
        closeObtainModal();
    }, [closeObtainModal]);

    const obtainModalClasses = clsx(
        'flex flex-col justify-around items-center text-black w-[75vh] h-[50vmin] bg-white rounded-xl mx-[2vw] animate-modal-appearance',
        {
            'opacity-0': isSuccessful,
        }
    );

    return (
        <>
            <section
                className={
                    'absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'
                }
            >
                <div
                    style={{ containerType: 'inline-size' }}
                    className={obtainModalClasses}
                >
                    <Image
                        src={`/wish-simulator/assets/shop/genesis-crystals/${count}-crystals.webp`}
                        alt={count + ' Кристаллов Сотворения'}
                        width={300}
                        height={300}
                        quality={100}
                        draggable={false}
                        className={'h-1/2 w-auto'}
                    />
                    <p className={'text-[4cqw]'}>{count} Кристаллов Сотворения</p>
                    <div className={'flex items-center gap-2 text-[3cqw]'}>
                        <input
                            type={'checkbox'}
                            name={'convertToPrimogems'}
                            checked={convertToPrimogems}
                            onChange={(e) => {
                                playSfxEffect('/sounds/click-1.mp3');
                                setConvertToPrimogems(e.target.checked);
                            }}
                            className={'size-[3cqw] cursor-genshin'}
                        />
                        <label htmlFor={'convertToPrimogems'}>
                            Автоматически конвертировать в примогемы
                        </label>
                    </div>
                    <div
                        className={
                            'w-full flex justify-center text-white gap-4 text-[3.5cqw]'
                        }
                    >
                        <button
                            onClick={closeObtainModalHandler}
                            className={
                                'w-[30%] bg-red-600 rounded-2xl py-[1.5cqw] cursor-genshin transition hover:bg-red-700'
                            }
                        >
                            Отмена
                        </button>
                        <button
                            onClick={confirmObtain}
                            className={
                                'w-[30%] bg-green-600 rounded-2xl py-[1.5cqw] cursor-genshin transition hover:bg-green-700'
                            }
                        >
                            Получить
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
