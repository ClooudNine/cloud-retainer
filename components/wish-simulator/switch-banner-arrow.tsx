import Image from 'next/image';
import { useCallback } from 'react';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';
import { playSfxEffect } from '@/lib/wish-simulator';
import clsx from 'clsx';

const SwitchBannerArrow = ({ isForward }: { isForward: boolean }) => {
    const { currentBanners, selectedBanner, switchBanner } = useBannerContext();

    const switchBannerArrowClasses = clsx('w-8 hidden drop-shadow-lg lg:block', {
        'rotate-180': !isForward,
    });

    const handleSwitchBanner = useCallback(() => {
        const currentIndex = currentBanners.indexOf(selectedBanner);
        const newIndex =
            (currentIndex + (isForward ? 1 : -1) + currentBanners.length) % currentBanners.length;
        playSfxEffect('sounds/click-1.mp3');
        switchBanner(currentBanners[newIndex]);
    }, [currentBanners, isForward, selectedBanner, switchBanner]);

    return (
        <Image
            src={'wish-simulator/assets/switch-banner-arrow.webp'}
            width={34}
            height={45}
            draggable={false}
            alt={`Переключить баннер ${isForward ? 'вперёд' : 'назад'}`}
            onClick={handleSwitchBanner}
            className={switchBannerArrowClasses}
        />
    );
};

export default SwitchBannerArrow;
