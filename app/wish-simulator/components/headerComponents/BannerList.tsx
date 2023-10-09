'use client'
import BannerButton from "@/app/wish-simulator/components/headerComponents/BannerButton";
import {useBannerContext} from "@/app/wish-simulator/components/banner-provider";

const BannerList = () => {
    const { banners, bannersPortraits } = useBannerContext();
    return (
        <div className={"col-span-full row-start-2 mx-2 md:mx-0 md:row-start-1 md:col-start-4 md:col-end-9 flex md:grid md:grid-rows-2 md:grid-cols-2 gap-1 md:gap-6 lg:flex lg:col-start-4 xl:col-start-5"}>
            {banners.map((banner, index) => {
                return <BannerButton
                    key={banner.type + "-" + banner.id}
                    banner={banner}
                    bannerPortraitUrl={bannersPortraits[index]}/>
            })}
        </div>
    )
}

export default BannerList