'use client'
import Image from "next/image";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const WishSimulatorBanner = () => {
    const supabase = createClientComponentClient();
    const url = supabase.storage.from('wish banners').getPublicUrl('Gentry of Hermitage 5.png')
    return (
        <section className={"w-full h-full flex items-center justify-center"}>
            <Image
                loader={() => url.data.publicUrl}
                src={url.data.publicUrl}
                width={1200}
                height={1200}
                alt={"Баннер"}
            className={"rounded-xl"}/>
        </section>
    )
}

export default WishSimulatorBanner