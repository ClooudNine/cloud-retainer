import primogem from "@/public/wish-simulator/primogem.webp"
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp"
import Image from "next/image";

const CurrentBalance = () => {
    return (
        <div className={"row-start-1 col-start-5 col-end-11 md:col-start-9 md:col-end-12 flex items-center justify-end gap-4 z-10 lg:col-start-10"}>
            <div className={`group min-w-max flex h-2/5 w-3/4 max-w-[120px] md:h-1/4 items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]`}>
                <Image
                    src={primogem}
                    alt={"Примогем"}
                    quality={100}
                    draggable={false}
                    width={32}
                    className={"h-full w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"}/>
                <p className={`font-genshin text-white text-base ml-2 md:text-xl`}>0</p>
                <button className={`font-genshin
                                    bg-[#ece5d8]
                                    text-[#3b4354]
                                    ml-auto
                                    mr-1
                                    w-1/4
                                    h-[90%]
                                    text-lg
                                    md:text-2xl
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
            <div className={"group max-w-[120px] flex h-2/5 md:h-1/4 w-1/2 md:w-1/4 min-w-max items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]"}>
                <Image
                    src={intertwinedFate}
                    alt={"Переплетающиеся судьбы"}
                    quality={100}
                    draggable={false}
                    width={32}
                    className={"h-full w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"}/>
                <p className={`font-genshin text-white text-base ml-2 md:text-xl`}>0</p>
            </div>
        </div>
    )
}
export default CurrentBalance