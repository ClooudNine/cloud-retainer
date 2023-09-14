import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/banner-button-background.png"
import bannerButtonBackgroundActive from "@/public/wish-simulator/banner-button-background-active.png"
const BannerButton = ({isSelected, setBannerCallback}:
                          {isSelected: boolean, setBannerCallback: () => void}) => {
    return (
        <button className={`z-10
                            flex
                            justify-center
                            items-center
                            transition-all
                            hover:scale-110
                            ${isSelected ? 'scale-110' : 'scale-100'}
                            `}
                onClick={setBannerCallback}>
            <Image
                src={isSelected ? bannerButtonBackgroundActive : bannerButtonBackground}
                alt={"Фон для кнопки баннера"}
                className={'h-full'}
            />
        </button>
    )
}

export default BannerButton