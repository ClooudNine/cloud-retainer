'use client';
import Image from 'next/image';
import bannerButtonBackground from '@/public/wish-simulator/assets/banner-button-background.webp';
import bannerButtonBackgroundActive from '@/public/wish-simulator/assets/banner-button-background-active.webp';
import { Banners } from '@/lib/banners';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import {
    getButtonPortraitUrl,
    getMainItemsName,
    playSfxEffect,
} from '@/app/wish-simulator/utils';
import { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

const BannerButton = ({ banner }: { banner: Banners }) => {
    const { selectedBanner, characters, weapons, switchBanner } = useBannerContext();

    const [portrait, setPortrait] = useState<string[]>(() =>
        getButtonPortraitUrl(banner, characters, weapons)
    );

    const bannerButtonClasses = clsx(
        'relative h-2/5 w-1/4 select-none transition-all cursor-genshin hover:scale-110 sm:h-3/5 md:h-[30%] lg:h-2/5',
        {
            'scale-110': banner === selectedBanner,
        }
    );

    const portraitClasses = clsx('mt-[30%] w-auto h-4/5 transition', {
        '-translate-y-[10%]': banner === selectedBanner,
        '-mx-[15%] -rotate-12': banner.type === 'Weapon Event Wish',
    });

    const itemNames = useMemo(
        () => getMainItemsName(banner, characters, weapons),
        [banner, characters, weapons]
    );

    const handleSwitchBanner = useCallback(() => {
        playSfxEffect('/sounds/click-2.mp3');
        switchBanner(banner);
    }, [banner, switchBanner]);

    return (
        <button className={bannerButtonClasses}>
            <Image
                src={
                    banner === selectedBanner
                        ? bannerButtonBackgroundActive
                        : bannerButtonBackground
                }
                alt={'Фон кнопки выбора баннера'}
                draggable={false}
                fill
                onClick={handleSwitchBanner}
            />
            <div
                className={
                    'absolute bottom-1 flex justify-center overflow-hidden w-full h-[215%] pointer-events-none'
                }
            >
                {portrait.map((url, index) => (
                    <Image
                        key={url}
                        src={url}
                        alt={itemNames[index]}
                        quality={100}
                        draggable={false}
                        width={200}
                        height={200}
                        className={portraitClasses}
                    />
                ))}
            </div>
        </button>
    );
};

export default BannerButton;
