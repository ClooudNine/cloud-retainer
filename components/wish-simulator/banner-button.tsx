'use client';
import Image from 'next/image';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';
import { getButtonPortraitUrl, getMainItemsName, playSfxEffect } from '@/lib/wish-simulator';
import { useMemo } from 'react';
import clsx from 'clsx';
import { Banners } from '@/lib/types';
import { useTranslations } from 'next-intl';

const BannerButton = ({ banner }: { banner: Banners }) => {
    const t = useTranslations();
    const { selectedBanner, switchBanner } = useBannerContext();

    const portrait = useMemo(() => getButtonPortraitUrl(banner), [banner]);
    const itemNames = useMemo(() => getMainItemsName(banner), [banner]);

    const bannerButtonClasses = clsx(
        'relative transition cursor-genshin flex-1 h-full hover:scale-110 xs:flex-none xs:w-36 xs:h-16 lg:w-28 lg:h-10',
        {
            'scale-110': banner === selectedBanner,
        }
    );

    const portraitClasses = clsx('h-4/5 w-auto mt-7 object-contain object-bottom transition', {
        '-translate-y-1': banner === selectedBanner,
        '-mx-4 -rotate-12': banner.type === 'Weapon Event Wish',
    });

    const handleSwitchBanner = () => {
        playSfxEffect('sounds/click-2.mp3');
        switchBanner(banner);
    };

    return (
        <button className={bannerButtonClasses}>
            <Image
                src={
                    banner === selectedBanner
                        ? 'wish-simulator/assets/banner-button-background-active.webp'
                        : 'wish-simulator/assets/banner-button-background.webp'
                }
                alt={t('image-alts.wish-button-background')}
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
                        alt={t(`characters.${itemNames[index]}`)}
                        draggable={false}
                        width={150}
                        height={70}
                        className={portraitClasses}
                    />
                ))}
            </div>
            {banner.type === 'Novice Wish' && (
                <div
                    className={
                        'text-white text-xs left-1/2 -translate-x-1/2 rounded-full absolute bg-[#90ab63] w-10 -bottom-0.5 pointer-events-none'
                    }
                >
                    -20%
                </div>
            )}
        </button>
    );
};

export default BannerButton;
