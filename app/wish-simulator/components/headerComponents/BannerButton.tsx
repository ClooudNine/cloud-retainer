import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/banner-button-background.png"
import bannerButtonBackgroundActive from "@/public/wish-simulator/banner-button-background-active.png"
const BannerButton = ({isSelected, setBannerCallback}:
                          {isSelected: boolean, setBannerCallback: () => void}) => {
    return (
        <button className={`relative
                            w-1/5
                            h-1/2
                            z-10
                            flex
                            justify-center
                            items-center
                            rounded
                            transition-all
                            hover:scale-110
                            `}
                onClick={setBannerCallback}>
            <Image
                src={isSelected ? bannerButtonBackgroundActive : bannerButtonBackground}
                alt={"Фон для кнопки баннера"}
            />
        </button>
    )
}

export default BannerButton