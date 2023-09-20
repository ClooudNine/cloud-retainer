import primogem from "@/public/wish-simulator/primogem.webp"
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp"
import Image from "next/image";

const CurrentBalance = () => {
    return (
        <div className={"col-start-5 col-end-11 flex items-center gap-4 ml-2 z-10"}>
            <div className={`group flex h-2/5 w-3/4 max-w-[120px] items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]`}>
                <Image
                    src={primogem}
                    alt={"Примогем"}
                    quality={100}
                    draggable={false}
                    width={32}
                    className={"h-full w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"}/>
                <p className={`font-genshin text-white text-base ml-2`}>0</p>
                <button className={`font-genshin
                                    bg-[#ece5d8]
                                    text-[#3b4354]
                                    ml-auto
                                    mr-1
                                    w-1/4
                                    h-[90%]
                                    text-lg
                                    font-bold
                                    flex
                                    justify-center
                                    items-center
                                    rounded-full
                                    transition-all
                                    active:opacity-50
                                    active:scale-95
                                    hover:scale-110`}>+</button>
            </div>
            <div className={"group max-w-[120px] flex h-2/5  w-1/2 items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]"}>
                <Image
                    src={intertwinedFate}
                    alt={"Переплетающиеся судьбы"}
                    quality={100}
                    draggable={false}
                    width={32}
                    className={"h-full w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"}/>
                <p className={`font-genshin text-white text-base ml-2`}>0</p>
            </div>
        </div>
    )
}
export default CurrentBalance