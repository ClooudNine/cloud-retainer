'use client';
import { ExternalLink, Gift } from 'lucide-react';
import { Promocode } from '@/lib/types';
import { useState } from 'react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

const PromocodeInfo = ({ promocode, locale }: { promocode: Promocode; locale: string }) => {
    const [isShowRewards, setIsShowRewards] = useState<boolean>(false);
    const t = useTranslations('main');

    const infoClasses = clsx(
        'absolute size-full flex flex-col items-center justify-between bg-gray-300 rounded-xl py-1 px-2 transition duration-500',
        {
            'scale-y-0': isShowRewards,
        }
    );

    const rewardsClasses = clsx(
        'absolute size-full flex flex-col items-center gap-2 justify-between bg-gray-300 rounded-xl py-1 px-2 transition duration-500 overflow-y-auto event-scrollbar',
        {
            'scale-y-0': !isShowRewards,
        }
    );

    return (
        <div className={'relative h-44 max-xs:text-2xl xs:h-32'}>
            <div className={infoClasses}>
                {promocode.value}
                <br />
                <span className={'text-lg text-accent-foreground xs:text-sm'}>
                    {t('valid-from')}: {promocode.startDate.toLocaleDateString()}
                </span>
                <a
                    href={`https://genshin.hoyoverse.com/${locale}/gift?code=${promocode.value}`}
                    target={'_blank'}
                    className={
                        'w-full flex justify-between items-center rounded-lg bg-green-300 py-0.5 px-2 transition hover:bg-black hover:text-white'
                    }
                >
                    {t('activate')}
                    <ExternalLink className={'size-5'} />
                </a>
                <button
                    className={
                        'w-full flex justify-between items-center rounded-lg bg-blue-300 py-0.5 px-2 transition hover:bg-black hover:text-white'
                    }
                    onClick={() => setIsShowRewards(true)}
                >
                    {t('rewards')} <Gift className={'size-5'} />
                </button>
            </div>
            <div className={rewardsClasses}>
                {t(`promocodes.${promocode.value}`)}
                <button
                    className={
                        'w-full text-center rounded-lg bg-white py-0.5 px-2 transition hover:bg-black hover:text-white'
                    }
                    onClick={() => setIsShowRewards(false)}
                >
                    {t('back')}
                </button>
            </div>
        </div>
    );
};

export default PromocodeInfo;
