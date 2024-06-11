import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getCurrentPromocodes } from '@/data/promocodes';
import Promocodes from '@/components/main/promocodes';

export default async function Main({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('main');
    const promocodes = await getCurrentPromocodes();

    return (
        <section className={'flex-1 overflow-y-auto space-y-2 max-xs:pt-8 max-xs:text-center xs:pl-4'}>
            <Image
                src={'common/xianyun-main.webp'}
                alt={'Xianyun'}
                fill
                className={'-z-10 object-right-bottom object-contain'}
            />
            <h1
                dangerouslySetInnerHTML={{ __html: t.raw('title') }}
                className={
                    'text-[2.8rem]/relaxed [&_em]:not-italic [&_em]:text-white [&_em]:rounded-xl [&_em]:px-4 [&_em:nth-of-type(1)]:bg-red-300 [&_em:nth-of-type(2)]:bg-emerald-300'
                }
            ></h1>
            <Promocodes promocodes={promocodes} />
        </section>
    );
}
