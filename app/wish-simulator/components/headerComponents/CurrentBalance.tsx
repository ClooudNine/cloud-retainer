import primogem from "@/public/wish-simulator/primogem.webp"
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp"
import Image from "next/image";

const CurrentBalance = () => {
    return (
        <div className={"flex h-full w-1/6 items-center gap-10 z-10"}>
            <div className={`group flex w-[45%] h-1/4 items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]`}>
                <Image
                    src={primogem}
                    alt={"Примогем"}
                    quality={100}
                    width={40}
                    draggable={false}
                    className={"drop-shadow-lg select-none transition-all group-active:opacity-50"}/>
                <p className={`font-genshin text-white text-2xl ml-2`}>0</p>
                <button className={`font-genshin
                                    bg-[#ece5d8]
                                    text-[#3b4354]
                                    ml-auto
                                    mr-1
                                    w-1/5
                                    h-[88%]
                                    text-3xl
                                    font-bold
                                    pb-8
                                    rounded-full
                                    transition-all
                                    active:opacity-50
                                    active:scale-95
                                    hover:scale-110`}>+</button>
            </div>
            <div className={"group flex w-[28%] h-1/4 items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]"}>
                <Image
                    src={intertwinedFate}
                    alt={"Переплетающиеся судьбы"}
                    quality={100}
                    width={40}
                    draggable={false}
                    className={"drop-shadow-lg select-none transition-all group-active:opacity-50"}/>
                <p className={`font-genshin text-white text-2xl ml-2`}>0</p>
            </div>
        </div>
    )
}
export default CurrentBalance