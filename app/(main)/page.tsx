import Image from 'next/image';

export default async function Main() {
    return (
        <section className={'flex-1'}>
            <Image
                src={'common/xianyun-main.webp'}
                alt={'Xianyun'}
                fill
                className={'pointer-events-none object-contain object-right-bottom'}
            />
            <h1 className={'ml-12 text-5xl/relaxed'}>
                ТВОЙ <em className={'px-4 rounded-xl text-white bg-red-300 not-italic'}>ЛУЧШИЙ</em>{' '}
                ПОМОЩНИК
                <br /> В МИРЕ{' '}
                <em className={'px-4 rounded-xl text-white bg-emerald-300 not-italic'}>
                    GENSHIN IMPACT
                </em>
            </h1>
        </section>
    );
}
