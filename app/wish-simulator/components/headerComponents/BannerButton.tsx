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
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';

const BannerButton = ({ banner }: { banner: Banners }) => {
    const { selectedBanner, characters, weapons, switchBanner } = useBannerContext();

    const portrait = getButtonPortraitUrl(banner, characters, weapons);

    const bannerButtonClasses = clsx(
        'relative transition cursor-genshin flex-1 h-full hover:scale-110 xs:flex-none xs:w-36 xs:h-16 lg:w-28 lg:h-10',
        {
            'scale-110': banner === selectedBanner,
        }
    );

    const portraitClasses = clsx('mt-7 h-4/5 w-auto object-contain transition', {
        '-translate-y-1': banner === selectedBanner,
        '-mx-4 -rotate-12': banner.type === 'Weapon Event Wish',
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
                quality={100}
                draggable={false}
                fill
                onClick={handleSwitchBanner}
            />
            <div
                className={
                    'absolute bottom-0.5 flex justify-center overflow-hidden w-full h-32 pointer-events-none xs:h-24'
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
