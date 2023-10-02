import WishSimulatorFooter from "@/app/wish-simulator/components/WishSimulatorFooter";
import WishSimulatorHeader from "@/app/wish-simulator/components/WishSimulatorHeader";
import WishSimulatorBackground from "@/app/wish-simulator/components/WishSimulatorBackground";
import WishSimulatorBanner from "@/app/wish-simulator/components/WishSimulatorBanner";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
export const metadata = {
    title: 'Genshin World | Симулятор молитв',
    description: `Симулятор молитв из игры Genshin Impact. Который позволяет путешественникам
        совершать молитвы в неограниченном количестве для развлечения и сбора статистики.`
}

export default async function WishSimulator() {
    const supabase = createServerComponentClient({cookies});

    const { data, error} = await supabase
        .from("characters_banners")
        .select("*")
        .or("version.eq.4, title.eq.Wanderlust Invocation");

    console.log(data);
    return (
        <main className={'w-full h-full cursor-genshin grid grid-rows-[1fr_2.5fr_1fr] md:grid-rows-[1fr_5fr_1fr]'}>
            <WishSimulatorBackground/>
            <WishSimulatorHeader/>
            <WishSimulatorBanner/>
            <WishSimulatorFooter/>
        </main>
    )
}