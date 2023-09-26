import Image from "next/image";
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from "next/headers";
const WishSimulatorBanner = () => {
    const supabase = createServerComponentClient({cookies});
    const bannerUrl = supabase.storage.from('wish banners').getPublicUrl('Gentry of Hermitage 5.png').data.publicUrl;
    return (
        <section className={"w-full h-full flex items-center justify-center"}>
            <Image
                src={bannerUrl}
                width={1100}
                height={1100}
                alt={"Баннер"}
            className={"rounded-xl"}/>
        </section>
    )
}

export default WishSimulatorBanner