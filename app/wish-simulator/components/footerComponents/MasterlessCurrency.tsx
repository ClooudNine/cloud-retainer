import Image from "next/image";

const MasterlessCurrency = ({title, path}: {title: string, path: string}) => {
    return (
        <div className={'flex items-center gap-2 md:gap-4'}>
            <Image
                src={`/wish-simulator/${path}.webp`}
                alt={title}
                width={32}
                height={32}
                draggable={false}
                className={"h-3/4 w-auto select-none transition-all active:opacity-50"}
            ></Image>
            <p className={"font-genshin drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] text-white text-base md:text-xl"}>0</p>
        </div>
    )
}

export default MasterlessCurrency