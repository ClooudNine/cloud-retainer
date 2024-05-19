import Background from '@/components/wish-simulator/background';
import Banner from '@/components/wish-simulator/banner';
import BannerProvider from '@/app/wish-simulator/banner-provider';
import Title from '@/components/wish-simulator/title';
import BannerList from '@/components/wish-simulator/banner-list';
import CurrentBalance from '@/components/wish-simulator/current-balance';
import MasterlessCurrency from '@/components/wish-simulator/masterless-currency';
import Footer from '@/components/wish-simulator/footer';
import { getCharactersFromWishes } from '@/data/character';
import { getWeaponsFromWishes } from '@/data/weapon';
import { getAllBanners } from '@/data/banner';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв',
    description: `Симулятор молитв из игры Genshin Impact, который позволяет 
    путешественникам совершать молитвы в неограниченном количестве для 
    развлечения и сбора статистики. Доступны последние баннеры.`,
};

export const dynamic = 'force-dynamic';

export default async function WishSimulator() {
    const [allBanners, charactersFromWishes, weaponsFromWishes] = await Promise.all([
        getAllBanners(),
        getCharactersFromWishes(),
        getWeaponsFromWishes(),
    ]);

    if (!allBanners || !charactersFromWishes || !weaponsFromWishes) {
        return <div className={'size-full flex justify-center items-center text-5xl'}>Data fetch error!</div>;
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
