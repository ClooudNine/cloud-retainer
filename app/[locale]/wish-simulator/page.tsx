import Background from '@/components/wish-simulator/background';
import Banner from '@/components/wish-simulator/banner';
import BannerProvider from '@/components/wish-simulator/banner-provider';
import Title from '@/components/wish-simulator/title';
import BannerList from '@/components/wish-simulator/banner-list';
import CurrentBalance from '@/components/wish-simulator/current-balance';
import MasterlessCurrency from '@/components/wish-simulator/masterless-currency';
import Footer from '@/components/wish-simulator/footer';
import { getCharactersFromWishes } from '@/data/character';
import { getWeaponsFromWishes } from '@/data/weapon';
import { getAllBanners } from '@/data/banner';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.wish-simulator' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export const dynamic = 'force-dynamic';

export default async function WishSimulator({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const [allBanners, charactersFromWishes, weaponsFromWishes] = await Promise.all([
        getAllBanners(),
        getCharactersFromWishes(),
        getWeaponsFromWishes(),
    ]);

    if (!allBanners || !charactersFromWishes || !weaponsFromWishes) {
        return notFound();
    }

    return (
        <main className={'size-full overflow-hidden shadow-[0_-50px_100px_50px_rgba(0,0,0,0.25)_inset]'}>
            <Background isBlurred={false} />
            <Title />
            <BannerProvider
                banners={allBanners}
                characters={charactersFromWishes}
                weapons={weaponsFromWishes}
            >
                <BannerList />
                <CurrentBalance />
                <Banner />
                <MasterlessCurrency />
                <Footer />
            </BannerProvider>
        </main>
    );
}
