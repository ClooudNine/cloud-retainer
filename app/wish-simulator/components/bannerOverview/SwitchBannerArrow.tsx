import Image from 'next/image';
import arrow from '@/public/wish-simulator/assets/switch-banner-arrow.webp';
import { useCallback } from 'react';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import clsx from 'clsx';

const SwitchBannerArrow = ({ isForward }: { isForward: boolean }) => {
    const { currentBanners, selectedBanner, switchBanner } = useBannerContext();

    const switchBannerArrowClasses = clsx('w-8 hidden lg:block', {
        'rotate-180': !isForward,
    });

    const handleSwitchBanner = useCallback(() => {
        const currentBannerIndex = currentBanners.indexOf(selectedBanner);
        const targetBannerIndex = isForward
            ? (currentBannerIndex + 1) % currentBanners.length
            : (currentBannerIndex - 1 + currentBanners.length) % currentBanners.length;
        playSfxEffect('/sounds/click-1.mp3');
        switchBanner(currentBanners[targetBannerIndex]);
    }, [currentBanners, isForward, selectedBanner, switchBanner]);

    return (
        <Image
            src={arrow}
            alt={`Переключить баннер ${isForward ? 'вперёд' : 'назад'}`}
            onClick={handleSwitchBanner}
            className={switchBannerArrowClasses}
        />
    );
};

export default SwitchBannerArrow;
