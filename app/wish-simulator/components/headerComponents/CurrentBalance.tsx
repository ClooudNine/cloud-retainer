import primogem from "@/public/wish-simulator/primogem.webp"
import Image from "next/image";
const CurrentBalance = () => {
    return (
       <div className={`flex w-1/5 items-center`}>
            <div className={`flex w-1/2 h-1/2 items-center justify-between bg-[rgba(0,0,0,0.5)] rounded-full`}>
                <Image
                    src={primogem}
                    alt={"Иконка примогема из игры Genhsin Impact"}
                    quality={100}
                    width={44}/>
                <p className={`font-genshin text-white text-xl`}>0</p>
                <button className={`font-genshin bg-[#ece5d8] text-[#3b4354] text-2xl rounded-full`}>+</button>
            </div>
           <div>

           </div>
       </div>
    )
}
export default  CurrentBalance