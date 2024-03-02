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
                className={'pointer-events-none object-contain object-right-bottom'}
            />
            <h1 className={'ml-12 text-5xl/loose'}>
                ТВОЙ{' '}
                <em className={'px-4 text-white rotate-12 bg-red-300 not-italic'}>
                    ЛУЧШИЙ
                </em>{' '}
                ПОМОЩНИК
                <br /> В МИРЕ{' '}
                <em className={'px-8 text-white not-italic bg-emerald-300'}>
                    GENSHIN IMPACT
                </em>
            </h1>
        </section>
    );
}
