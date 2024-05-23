import Image from 'next/image';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

export default async function Main({ params }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(params.lang);

    return (
        <section
            className={'flex-1 overflow-y-auto space-y-2 max-xs:pt-8 max-xs:text-center xs:pl-4'}
        >
            <Image
                src={'common/xianyun-main.webp'}
                alt={'Xianyun'}
                fill
                className={'-z-10 object-right-bottom object-contain'}
            />
            <h1
                dangerouslySetInnerHTML={{ __html: dictionary['main'].title }}
                className={
                    'text-[2.8rem]/relaxed [&_em]:not-italic [&_em]:text-white [&_em]:rounded-xl [&_em]:px-4 [&_em:nth-of-type(1)]:bg-red-300 [&_em:nth-of-type(2)]:bg-emerald-300'
                }
            ></h1>
            <h3 className={'text-destructive text-4xl xs:text-2xl'}>Последние обновления</h3>
            <em className={'underline text-3xl xs:text-xl'}>Главные изменения:</em>
            <ul className={'list-disc list-inside text-2xl xs:text-lg'}>
                <li>Новый раздел «Персонажи»</li>
                <li>Новый раздел «Оружие»</li>
                <li>Новый раздел «Помощь»</li>
                <li>Аватары (Google)</li>
                <li>Адаптация для мобильных устройств</li>
            </ul>
            <em className={'underline text-3xl xs:text-xl'}>В разработке:</em>
            <ul className={'list-disc list-inside text-2xl xs:text-lg'}>
                <li>Лента событий</li>
                <li>Раздел «Достижения»</li>
            </ul>
            <h4 className={'text-destructive max-xs:text-2xl'}>
                Более подробное описание обновления в Telegram-канале
                <br />
                <a
                    className={'underline'}
                    target="_blank"
                    href="https://t.me/cloud_retainer_community"
                >
                    Cloud Retainer | Community
                </a>
            </h4>
        </section>
    );
}
