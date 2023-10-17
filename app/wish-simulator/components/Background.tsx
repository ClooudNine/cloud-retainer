import Image from "next/image";
import wishSimulatorBackground from "@/public/wish-simulator/wish-simulator-bg.png";
const Background = () => {
    return (
        <div className={'absolute w-full h-full shadow-[0_-50px_100px_50px_rgba(0,0,0,0.26)_inset]'}>
            <Image
                src={wishSimulatorBackground}
                alt={'Фоновое изображение раздела молитв из игры Genshin Impact'}
                quality={100}
                fill
                className={'select-none object-cover object-left brightness-90 -z-10'}/>
        </div>
    )
}
export default Background