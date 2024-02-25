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
import React from 'react';
import Link from 'next/link';
import CloseButton from '@/components/wish-simulator/close-button';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв',
    description:
        'Симулятор молитв из игры Genshin Impact, который позволяет путешественникам совершать молитвы в неограниченном количестве для развлечения и сбора статистики.',
};
export const dynamic = 'force-dynamic';

export default async function WishSimulator() {
    const [allBanners, charactersFromWishes, weaponsFromWishes] = await Promise.all([
        getAllBanners(),
        getCharactersFromWishes(),
        getWeaponsFromWishes(),
    ]);

    if (allBanners === null) {
        return (
            <div className={'w-full h-full flex justify-center items-center text-5xl'}>
                Banners fetch error!
            </div>
        );
    }

    if (charactersFromWishes === null || weaponsFromWishes === null) {
        return (
            <div className={'w-full h-full flex justify-center items-center text-5xl'}>
                Characters or weapons fetch error!
            </div>
        );
    }

    return (
        <main className={'w-full h-full flex flex-col justify-between overflow-hidden'}>
            <Background isBlurred={false} />
            <Title />
            <Link href={'/'}>
                <CloseButton
                    handler={undefined}
                    styles={
                        'absolute top-12 right-5 size-8 xs:max-lg:top-4 lg:top-11 lg:right-8'
                    }
                />
            </Link>
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
