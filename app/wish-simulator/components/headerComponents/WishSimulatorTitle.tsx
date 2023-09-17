import Image from "next/image";
import wishIcon from "@/public/wish-simulator/wish-icon.png";
const WishSimulatorTitle = () => {
    return (
        <div className={"flex items-center gap-7 ml-12"}>
            <Image
                src={wishIcon}
                alt={"Иконка раздела молитв из игры Genshin Impact"}
                quality={100}
                className={"w-14"}
            />
            <p className={"font-genshin text-white text-2xl drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)]"}>Молитва</p>
        </div>
    )
}
export default WishSimulatorTitle;