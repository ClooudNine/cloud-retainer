'use client'
import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/banner-button-background.png"
import bannerButtonBackgroundActive from "@/public/wish-simulator/banner-button-background-active.png"
import {CharacterBanner, WeaponBanner} from "@/app/types/banner";
import {useBannerContext} from "@/app/wish-simulator/components/banner-provider";

type BannerButtonProps = {
    banner: CharacterBanner | WeaponBanner;
}
const BannerButton = ({banner}: BannerButtonProps) => {
    const { currentBanner, switchBanner } = useBannerContext();
    return (
        <button className={`z-10
                            cursor-genshin  
                            transition-all
                            w-1/4
                            md:w-[90%]
                            h-full
                            ${banner === currentBanner ? 'hover:scale-100' : 'hover:scale-[1.15]'}
                            `}
                onClick={() => switchBanner(banner)}>
            <Image
                src={banner === currentBanner ? bannerButtonBackgroundActive : bannerButtonBackground}
                alt={"Фон для кнопки выбора баннера"}
                className={`w-full ${banner === currentBanner ? 'scale-[1.15]' : 'scale-100'}`}
            />
        </button>
    )
}

export default BannerButton