'use client'
import Image from "next/image";
import {useState} from "react";
import FooterButton from "@/app/wish-simulator/components/FooterButton";
import WishButton from "@/app/wish-simulator/components/WishButton";
const WishSimulatorFooter = () => {

    const [starglitterCount, setStarglitterCount] = useState(0);
    const [stardustCount, setStardustCount] = useState(0);

    return (
        <footer className={'relative flex justify-between mx-16 z-10'}>
            <div className={"flex flex-col gap-y-3"}>
                <div className={"flex gap-x-8"}>
                    <div className={'flex place-items-center gap-3'}>
                        <Image
                            src={"/wish-simulator/masterless-starglitter.webp"}
                            alt={"Блуждающий звёздный блеск"}
                            width={36}
                            height={36}
                        ></Image>
                        <p className={"font-genshin text-white text-xl"}>{starglitterCount}</p>
                    </div>
                    <div className={'flex place-items-center gap-3'}>
                        <Image
                            src={"/wish-simulator/masterless-stardust.webp"}
                            alt={"Блуждающая звёздная пыль"}
                            width={36}
                            height={36}
                        ></Image>
                        <p className={"font-genshin text-white text-xl"}>{stardustCount}</p>
                    </div>
                </div>
                <div className={"flex flex-wrap gap-4"}>
                    <FooterButton title={"Магазин"} />
                    <FooterButton title={"Детали"} />
                    <FooterButton title={"История"} />
                </div>
            </div>
            <div className={"flex flex-wrap justify-end items-end gap-8"}>
                <WishButton count={1}/>
                <WishButton count={10}/>
            </div>
        </footer>
    )
}
export default WishSimulatorFooter