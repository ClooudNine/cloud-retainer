import Image from "next/image";
import wishButton from "@/public/wish-simulator/wish-button.png";
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp"

const WishButton = ({count}: { count: number }) => {
    return (
        <button className={"relative w-[20rem] h-5/6 transition-all duration-300 active:brightness-[0.85]"}>
            <Image
                src={wishButton}
                quality={100}
                fill
                alt={`Помолиться ${count} раз`}
                className={"relative -z-10"}
            />
            <p className={"font-genshin text-[1.4rem] text-[#b4a08c]"}>Помолиться {count} раз</p>
            <div className={"flex justify-center items-center -mt-1"}>
                    <Image
                        src={intertwinedFate}
                        alt={"Переплетающиеся судьбы"}
                        width={35}
                        className={"pointer-events-none"}
                    />
                <p className={"font-genshin mt-1 text-xl text-[#ff5f40]"}>x {count}</p>
            </div>
        </button>
    )
}

export default WishButton