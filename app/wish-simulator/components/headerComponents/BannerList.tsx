'use client'
import BannerButton from "@/app/wish-simulator/components/headerComponents/BannerButton";
import {useCallback, useState} from "react";
const BannerList = () => {
    const [selectedBanner, setSelectedBanner] = useState<number>(1);
    const setBanner = useCallback((bannerNumber: number) => {
        setSelectedBanner(bannerNumber);
    }, [])
    return (
        <div className={"flex flex-wrap gap-8"}>
            <BannerButton isSelected={selectedBanner === 1} setBannerCallback={() => setBanner(1)}/>
            <BannerButton isSelected={selectedBanner === 2} setBannerCallback={() => setBanner(2)}/>
            <BannerButton isSelected={selectedBanner === 3} setBannerCallback={() => setBanner(3)}/>
            <BannerButton isSelected={selectedBanner === 4} setBannerCallback={() => setBanner(4)}/>
        </div>
    )
}

export default BannerList