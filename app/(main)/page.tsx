import Image from 'next/image';
import xianyun from '@/public/common/Xianyun_Profile.webp';

export default async function Main() {
    return (
        <section className={'flex-1'}>
            <Image
                src={xianyun}
                alt={'Xianyun'}
                fill
                quality={100}
                className={'-z-10 object-contain object-right-bottom'}
            />
            <h1 className={'text-5xl/loose'}>
                ТВОЙ ЛУЧШИЙ ПОМОЩНИК В МИРЕ GENSHIN IMPACT
            </h1>
        </section>
    );
}
