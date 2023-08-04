import Image from "next/image";
import wishButton from "@/public/wish-simulator/wish-button.png";
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp"

const WishButton = ({count}: { count: number }) => {
    return (
        <button className={"relative max-w-xs w-full transition-all select-none cursor-genshin duration-300 md:h-4/5 active:brightness-[0.85]"}>
            <Image
                src={wishButton}
                quality={100}
                fill
                alt={`Помолиться ${count} раз`}
                className={"-z-10"}
            />
            <p className={"font-genshin h-1/2 pt-2 text-base text-[#b4a08c] md:text-[90%] lg:text-xl"}>Помолиться {count} раз</p>
            <div className={"flex h-1/2 justify-center items-center"}>
                    <Image
                        src={intertwinedFate}
                        alt={"Переплетающиеся судьбы"}
                        width={32}
                        height={32}
                        className={"h-full w-auto pointer-events-none"}
                    />
                <p className={"font-genshin text-lg text-[#ff5f40] md:text-[90%] lg:text-xl"}>x {count}</p>
            </div>
        </button>
    )
}

export default WishButton