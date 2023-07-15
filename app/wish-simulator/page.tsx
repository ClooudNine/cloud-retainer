import Image from "next/image";
import WishSimulatorFooter from "@/app/wish-simulator/components/WishSimulatorFooter";
import wishSimulatorBackground from "@/public/wish-simulator/wish-simulator-bg.png"
export const metadata = {
    title: 'Genshin World | Симулятор молитв',
    description: 'Симулятор молитв из игры Genshin Impact. Который позволяет путешественникам' +
        ' совершать молитвы в неограниченном количестве для развлечения и сборка статистики.'
}
export default async function WishSimulator() {
    return (
        <main className={'w-full h-full'}>
            <div className={'absolute w-full h-full shadow-[0_-50px_100px_50px_rgba(0,0,0,0.26)_inset]'}>
                <Image
                    src={wishSimulatorBackground}
                    alt={'Фоновое изображение раздела молитв из игры Genshin Impact'}
                    quality={100}
                    fill
                    className={'object-cover brightness-90 -z-10'}
                />
            </div>
            <section className={"h-1/5"}></section>
            <section className={"h-2/3"}></section>
            <WishSimulatorFooter />
        </main>
    )
}