'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const NavigationButton = ({
    title,
    param,
}: {
    title: string;
    param: 'increased-chance' | 'more-info' | 'items-list';
}) => {
    const t = useTranslations('image-alts');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectSection = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('section', param);
        router.replace(pathname + '?' + params.toString());
    }, [param, pathname, router, searchParams]);

    const buttonClasses = clsx(
        'group relative flex-1 h-full flex justify-center items-center hover:text-white',
        {
            'text-white': searchParams.get('section') === param,
        }
    );

    const backgroundButtonClasses = clsx('absolute h-full w-auto', {
        'hidden group-hover:block group-hover:brightness-110': searchParams.get('section') !== param,
    });

    return (
        <button className={buttonClasses} onClick={selectSection}>
            <Image
                src={'wish-simulator/assets/details-button.webp'}
                width={384}
                height={59}
                alt={t('choose-details-section') + ' ' + title}
                draggable={false}
                className={backgroundButtonClasses}
            />
            <p className={'relative'}>{title}</p>
        </button>
    );
};
export default NavigationButton;
