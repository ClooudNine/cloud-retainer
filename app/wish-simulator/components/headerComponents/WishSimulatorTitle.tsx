import Image from "next/image";
import wishIcon from "@/public/wish-simulator/wish-icon.png";
const WishSimulatorTitle = () => {
    return (
        <div className={"col-start-1 col-end-3 flex items-center gap-3 lg:gap-6 ml-2 md:ml-4 lg:ml-12"}>
            <Image
                src={wishIcon}
                alt={"Иконка раздела молитв из игры Genshin Impact"}
                quality={100}
                className={"h-1/4 md:h-[30%] lg:h-2/5 w-auto "}
            />
            <p className={"font-genshin text-white text-base md:text-lg lg:text-2xl drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)]"}>Молитва</p>
        </div>
    )
}
export default WishSimulatorTitle;