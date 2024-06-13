'use client';
import { ExternalLink, Gift } from 'lucide-react';
import { Promocode } from '@/lib/types';
import { useState } from 'react';
import { clsx } from 'clsx';

const PromocodeInfo = ({ promocode, locale }: { promocode: Promocode; locale: string }) => {
    const [isShowRewards, setIsShowRewards] = useState<boolean>(false);

    const infoClasses = clsx(
        'absolute size-full flex flex-col items-center justify-between bg-gray-300 rounded-xl py-1 px-2 transition duration-500',
        {
            'scale-y-0': isShowRewards,
        }
    );

    const rewardsClasses = clsx(
        'absolute size-full flex flex-col items-center justify-between bg-gray-300 rounded-xl py-1 px-2 transition duration-500 overflow-y-auto event-scrollbar',
        {
            'scale-y-0': !isShowRewards,
        }
    );

    return (
        <div className={'relative h-32'}>
            <div className={infoClasses}>
                {promocode.value}
                <br />
                <span className={'text-sm text-accent-foreground'}>
                    Действует с: {promocode.startDate.toLocaleDateString()}
                </span>
                <a
                    href={`https://genshin.hoyoverse.com/${locale}/gift?code=${promocode.value}`}
                    target={'_blank'}
                    className={
                        'w-full flex justify-between items-center rounded-lg bg-green-300 py-0.5 px-2 transition hover:bg-black hover:text-white'
                    }
                >
                    Активировать
                    <ExternalLink className={'size-5'} />
                </a>
                <button
                    className={
                        'w-full flex justify-between items-center rounded-lg bg-blue-300 py-0.5 px-2 transition hover:bg-black hover:text-white'
                    }
                    onClick={() => setIsShowRewards(true)}
                >
                    Награды <Gift className={'size-5'} />
                </button>
            </div>
            <div className={rewardsClasses}>
                {promocode.rewards}
                <button
                    className={
                        'w-full text-center rounded-lg bg-white py-0.5 px-2 transition hover:bg-black hover:text-white'
                    }
                    onClick={() => setIsShowRewards(false)}
                >
                    Назад
                </button>
            </div>
        </div>
    );
};

export default PromocodeInfo;
