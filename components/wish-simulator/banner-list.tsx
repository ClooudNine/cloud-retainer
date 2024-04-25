'use client';
import BannerButton from '@/components/wish-simulator/banner-button';
import { useBannerContext } from '@/app/wish-simulator/banner-provider';
import Image from 'next/image';

const BannerList = () => {
    const { currentBanners } = useBannerContext();
    return (
        <div
            className={
                'absolute top-40 w-full h-16 px-3 flex items-center gap-1 xs:max-lg:flex-col xs:top-0 xs:gap-3 xs:pt-28 xs:h-full xs:w-44 lg:left-1/2 lg:-translate-x-1/2 lg:pt-10 lg:h-auto lg:w-auto'
            }
        >
            <Image
                src={'wish-simulator/assets/wish-buttons-background.webp'}
                fill
                alt={'Фон кнопок выбора баннера'}
                draggable={false}
                className={'-z-10 hidden xs:max-lg:block'}
            />
            {currentBanners.map((banner) => {
                return <BannerButton key={banner.title + '-' + banner.id} banner={banner} />;
            })}
        </div>
    );
};

export default BannerList;
