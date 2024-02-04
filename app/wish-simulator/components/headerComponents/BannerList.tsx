'use client';
import BannerButton from '@/app/wish-simulator/components/headerComponents/BannerButton';
import wishButtonsBackground from '@/public/wish-simulator/assets/wish-buttons-background.webp';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import Image from 'next/image';

const BannerList = () => {
    const { currentBanners } = useBannerContext();
    return (
        <div
            className={
                'z-10 absolute top-40 w-full h-16 px-3 flex items-center gap-1 xs:max-lg:flex-col xs:top-0 xs:gap-4 xs:pt-28 xs:h-full xs:w-44 lg:left-1/2 lg:-translate-x-1/2 lg:pt-6 lg:top-4 lg:h-auto lg:w-auto'
            }
        >
            <Image
                src={wishButtonsBackground}
                alt={'Фон кнопок молитв на мобильных устройствах'}
                draggable={false}
                quality={100}
                className={'absolute top-0 h-full w-auto lg:hidden'}
            />
            {currentBanners.map((banner) => {
                return (
                    <BannerButton key={banner.title + '-' + banner.id} banner={banner} />
                );
            })}
        </div>
    );
};

export default BannerList;
