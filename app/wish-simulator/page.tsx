import Background from '@/app/wish-simulator/components/Background';
import Banner from '@/app/wish-simulator/components/bannerOverview/Banner';
import BannerProvider from '@/app/wish-simulator/BannerProvider';
import Title from '@/app/wish-simulator/components/headerComponents/Title';
import BannerList from '@/app/wish-simulator/components/headerComponents/BannerList';
import CurrentBalance from '@/app/wish-simulator/components/headerComponents/CurrentBalance';
import MasterlessCurrency from '@/app/wish-simulator/components/footerComponents/MasterlessCurrency';
import Footer from '@/app/wish-simulator/components/footerComponents/Footer';
import { getCharactersFromWishes } from '@/data/character';
import { getWeaponsFromWishes } from '@/data/weapon';
import { getAllBanners } from '@/data/banner';
import React from 'react';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв',
    description:
        'Симулятор молитв из игры Genshin Impact, который позволяет путешественникам совершать молитвы в неограниченном количестве для развлечения и сбора статистики.',
};
export const dynamic = 'force-dynamic';

export default async function WishSimulator() {
    const allBanners = await getAllBanners();

    const charactersFromWishes = await getCharactersFromWishes();

    const weaponsFromWishes = await getWeaponsFromWishes();

    if (allBanners === null) {
        return (
            <div
                className={
                    'w-full h-full flex justify-center items-center text-5xl font-genshin'
                }
            >
                Banners fetch error!
            </div>
        );
    }

    if (charactersFromWishes === null || weaponsFromWishes === null) {
        return (
            <div
                className={
                    'w-full h-full flex justify-center items-center text-5xl font-genshin'
                }
            >
                Characters or weapons fetch error!
            </div>
        );
    }

    return (
        <main
            className={
                'w-full h-full cursor-genshin font-genshin flex flex-col justify-between overflow-hidden'
            }
        >
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
