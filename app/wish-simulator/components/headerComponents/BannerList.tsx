'use client'
import BannerButton from "@/app/wish-simulator/components/headerComponents/BannerButton";
import {useCallback, useState} from "react";

const BannerList = () => {

    const [selectedBanner, setSelectedBanner] = useState<number>(1);

    const setBanner = useCallback((bannerNumber: number) => {
        setSelectedBanner(bannerNumber);
    }, [])

    return (
        <div
            className={"col-span-full row-start-2 mx-2 md:mx-0 md:row-start-1 md:col-start-4 md:col-end-9 flex md:grid md:grid-rows-2 md:grid-cols-2 gap-1 md:gap-6 lg:flex lg:col-start-4 xl:col-start-5"}>
            <BannerButton isSelected={selectedBanner === 1} setBannerCallback={() => setBanner(1)}/>
            <BannerButton isSelected={selectedBanner === 2} setBannerCallback={() => setBanner(2)}/>
            <BannerButton isSelected={selectedBanner === 3} setBannerCallback={() => setBanner(3)}/>
            <BannerButton isSelected={selectedBanner === 4} setBannerCallback={() => setBanner(4)}/>
        </div>
    )
}

export default BannerList
