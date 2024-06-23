import Background from '@/components/wish-simulator/background';
import Image from 'next/image';
import { Link } from '@/navigation';
import UserSelect from '@/components/wish-simulator/history/user-select';
import HistoryTable from '@/components/wish-simulator/history/history-table';
import WishCrossIcon from '@/components/icons/wish-cross';
import { WishHistoryTypes } from '@/lib/types';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.wish-simulator-history' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function WishHistory({
    params: { locale },
    searchParams,
}: {
    params: { locale: string };
    searchParams: {
        type: WishHistoryTypes;
    };
}) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('wish-simulator');

    return (
        <main className={'size-full flex items-center justify-center'}>
            <Background isBlurred={true} />
            <div
                className={
                    'relative flex justify-center items-center h-[85vh] w-[45vh] xs:w-[150vh] xs:h-auto'
                }
            >
                <Image
                    src={'wish-simulator/assets/book-background.webp'}
                    width={1400}
                    height={761}
                    alt={'История молитв'}
                    draggable={false}
                    className={
                        'max-w-none w-[85vh] -rotate-90 -scale-y-100 xs:rotate-0 xs:scale-y-100 xs:max-w-full xs:w-[150vh] xs:h-auto'
                    }
                />
                <p
                    className={
                        'absolute text-[#595252] top-[8%] left-[12.5%] text-3xl xs:top-[5%] xs:left-[14%]'
                    }
                >
                    {t('wish-journal')}
                </p>
                <UserSelect type={searchParams['type']} />
                <Link
                    href={'/wish-simulator'}
                    className={'absolute cursor-genshin top-[2.5%] right-[7%] xs:top-[6.2%] xs:right-[2.4%]'}
                >
                    <WishCrossIcon fillColor={'#e9d5af'} />
                </Link>
                <HistoryTable type={searchParams['type']} />
            </div>
        </main>
    );
}
