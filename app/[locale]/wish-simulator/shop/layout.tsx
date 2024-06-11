import Background from '@/components/wish-simulator/background';
import Sidebar from '@/components/wish-simulator/shop/sidebar';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.wish-simulator-shop' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function ShopLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);

    return (
        <main className={'size-full flex'}>
            <Background isBlurred={true} />
            <Sidebar />
            <section className={'flex-1'}>{children}</section>
        </main>
    );
}
