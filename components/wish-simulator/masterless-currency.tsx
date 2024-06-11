'use client';
import Image from 'next/image';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';

const MasterlessCurrency = () => {
    const { balance } = useBannerContext();

    return (
        <div
            className={
                'absolute flex gap-4 max-xs:bottom-52 max-xs:left-4 text-3xl text-white xs:text-base xs:max-lg:gap-8 xs:max-lg:top-4 xs:max-lg:right-72 lg:left-16 lg:bottom-20'
            }
        >
            <div
                className={
                    'flex items-center gap-2 xs:max-lg:bg-black/40 xs:max-lg:pl-1 xs:max-lg:pr-3 xs:max-lg:rounded-full xs:max-lg:ring-2 xs:max-lg:ring-[#84a4c5]'
                }
            >
                <Image
                    src={'wish-simulator/assets/masterless-starglitter.webp'}
                    width={40}
                    height={40}
                    alt={'Блуждающий звёздный блеск'}
                    draggable={false}
                    className={'size-12 xs:size-6'}
                />
                <p className={'drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]'}>{balance['masterless-starglitter']}</p>
            </div>
            <div
                className={
                    'flex items-center gap-2 xs:max-lg:bg-black/40 xs:max-lg:pl-1 xs:max-lg:pr-3 xs:max-lg:rounded-full xs:max-lg:ring-2 xs:max-lg:ring-[#84a4c5]'
                }
            >
                <Image
                    src={'wish-simulator/assets/masterless-stardust.webp'}
                    width={40}
                    height={40}
                    alt={'Блуждающая звёздная пыль'}
                    draggable={false}
                    className={'size-12 xs:size-6'}
                />
                <p className={'drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]'}>{balance['masterless-stardust']}</p>
            </div>
        </div>
    );
};

export default MasterlessCurrency;
