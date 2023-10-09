'use client'
import { useBannerContext } from "@/app/wish-simulator/components/banner-provider";
import Image from "next/image";

const Banner = () => {
    const { currentBannerPreviewUrl } = useBannerContext();

    return (
        <section className={"w-full h-full flex items-center justify-center"}>
            <Image
                src={currentBannerPreviewUrl}
                alt={"Картинка баннера"}
                width={1100}
                height={1100}
            >
            </Image>
        </section>
    )
}

export default Banner