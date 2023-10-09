'use client'
import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/banner-button-background.png"
import bannerButtonBackgroundActive from "@/public/wish-simulator/banner-button-background-active.png"
import {CharacterBanner, WeaponBanner} from "@/app/types/banner";
import {useBannerContext} from "@/app/wish-simulator/components/banner-provider";

type BannerButtonProps = {
    banner: CharacterBanner | WeaponBanner;
    bannerPortraitUrl: string;
}
const BannerButton = ({banner, bannerPortraitUrl}: BannerButtonProps) => {
    const { currentBanner, switchBanner } = useBannerContext();
    return (
        <button className={`z-10
                            relative
                            cursor-genshin  
                            transition-all
                            w-1/4
                            md:w-[90%]
                            md:h-[50%]
                            h-full
                            ${banner === currentBanner ? 'hover:scale-100' : 'hover:scale-[1.15]'}
                            `}
                onClick={() => switchBanner(banner)}>
            <Image
                src={banner === currentBanner ? bannerButtonBackgroundActive : bannerButtonBackground}
                alt={"Фон для кнопки выбора баннера"}
                fill
            />
            <Image
                src={bannerPortraitUrl}
                alt={"Портрет"}
                width={500}
                height={500}
                className={"absolute w-full h-auto"}
            />
        </button>
    )
}

export default BannerButton