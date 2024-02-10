'use client';
import Image from 'next/image';
import masterlessStarglitter from '@/public/wish-simulator/assets/masterless-starglitter.webp';
import masterlessStardust from '@/public/wish-simulator/assets/masterless-stardust.webp';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
const MasterlessCurrency = () => {
    const { balance } = useBannerContext();

    return (
        <div
            className={
                'absolute flex gap-4 bottom-52 left-4 text-3xl text-white xs:text-base xs:max-lg:left-auto xs:max-lg:bottom-auto xs:max-lg:gap-8 xs:max-lg:top-4 xs:max-lg:right-80 lg:left-16 lg:bottom-20'
            }
        >
            <div
                className={
                    'flex items-center gap-2 xs:max-lg:bg-black xs:max-lg:pl-1 xs:max-lg:pr-3 xs:max-lg:bg-opacity-40 xs:max-lg:rounded-full xs:max-lg:ring-2 xs:max-lg:ring-[#84a4c5]'
                }
            >
                <Image
                    src={masterlessStarglitter}
                    alt={'Блуждающий звёздный блеск'}
                    quality={100}
                    draggable={false}
                    className={'size-12 transition active:opacity-50 xs:size-6'}
                ></Image>
                <p className={'drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]'}>
                    {balance['masterless-starglitter']}
                </p>
            </div>
            <div
                className={
                    'flex items-center gap-2 xs:max-lg:bg-black xs:max-lg:bg-opacity-40 xs:max-lg:pl-1 xs:max-lg:pr-3 xs:max-lg:rounded-full xs:max-lg:ring-2 xs:max-lg:ring-[#84a4c5]'
                }
            >
                <Image
                    src={masterlessStardust}
                    alt={'Блуждающая звёздная пыль'}
                    quality={100}
                    draggable={false}
                    className={'size-12 transition active:opacity-50 xs:size-6'}
                ></Image>
                <p className={'drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]'}>
                    {balance['masterless-stardust']}
                </p>
            </div>
        </div>
    );
};

export default MasterlessCurrency;
