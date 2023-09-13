import WishSimulatorFooter from "@/app/wish-simulator/components/WishSimulatorFooter";
import WishSimulatorHeader from "@/app/wish-simulator/components/WishSimulatorHeader";
import WishSimulatorBackground from "@/app/wish-simulator/components/WishSimulatorBackground";
export const metadata = {
    title: 'Genshin World | Симулятор молитв',
    description: `Симулятор молитв из игры Genshin Impact. Который позволяет путешественникам
        совершать молитвы в неограниченном количестве для развлечения и сбора статистики.`
}
export default function WishSimulator() {
    return (
        <main className={'w-full h-full cursor-genshin grid grid-rows-[1fr_4fr_1fr] lg:grid-rows-[1fr_6fr_1fr]'}>
            <WishSimulatorBackground />
            <section></section>
            <section></section>
            <WishSimulatorFooter />
        </main>
    )
}