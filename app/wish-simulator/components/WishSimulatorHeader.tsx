import Image from "next/image";
import wishIcon from "@/public/wish-simulator/wish-icon.png"
import BannerList from "@/app/wish-simulator/components/headerComponents/BannerList";

const WishSimulatorHeader = async () => {
    return (
        <header className={"flex"}>
            <div className={"flex items-center gap-10 ml-12 mt-4"}>
                <Image
                    src={wishIcon}
                    alt={"Иконка раздела молитв из игры Genshin Impact"}
                    quality={100}
                    width={60}
                />
                <p className={"font-genshin text-white text-lg drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)]"}>Молитва</p>
            </div>
            <BannerList/>
        </header>
    )
}
export default  WishSimulatorHeader