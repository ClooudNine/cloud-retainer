import Image from "next/image";
import wishButton from "@/public/wish-simulator/wish-button.png";
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp"

const WishButton = ({count}: { count: number }) => {
    return (
        <button className={"relative max-w-xs max-h-20 w-1/3 h-4/5 transition-all select-none cursor-genshin duration-300 active:brightness-[0.85]"}>
            <Image
                src={wishButton}
                quality={100}
                fill
                alt={`Помолиться ${count} раз`}
                className={"-z-10"}
            />
            <p className={"font-genshin flex items-end justify-center h-1/2 text-sm text-[#b4a08c] md:text-base lg:text-lg"}>Помолиться {count} раз</p>
            <div className={"flex h-1/2 justify-center items-center"}>
                    <Image
                        src={intertwinedFate}
                        alt={"Переплетающиеся судьбы"}
                        width={32}
                        height={32}
                        className={"pointer-events-none"}
                    />
                <p className={"font-genshin text-sm text-[#ff5f40] md:text-base lg:text-lg"}>x {count}</p>
            </div>
        </button>
    )
}

export default WishButton