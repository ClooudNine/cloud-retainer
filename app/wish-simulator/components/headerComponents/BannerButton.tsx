import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/banner-button-background.png"
import bannerButtonBackgroundActive from "@/public/wish-simulator/banner-button-background-active.png"

const BannerButton = ({isSelected, setBannerCallback}: { isSelected: boolean, setBannerCallback: () => void }) => {
    return (
        <button className={`z-10
                            cursor-genshin  
                            transition-all
                            ${isSelected ? 'hover:scale-100' : 'hover:scale-[1.15]'}
                            `}
                onClick={setBannerCallback}>
            <Image
                src={isSelected ? bannerButtonBackgroundActive : bannerButtonBackground}
                alt={"Фон для кнопки баннера"}
                className={'w-full'}
            />
        </button>
    )
}

export default BannerButton