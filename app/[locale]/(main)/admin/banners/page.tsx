import { getAllBanners } from '@/data/banner';
import BannersList from '@/components/admin/banners/banners-list';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function AdminBanners({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const allBanners = await getAllBanners();

    if (allBanners === null) {
        return <h1>Banners fetch error!</h1>;
    }

    return (
        <section className={'flex-1 h-screen'}>
            <h1 className={'text-2xl text-center mt-2 py-1 text-white bg-black rounded-2xl mx-4'}>
                Редактор баннеров
            </h1>
            <BannersList banners={allBanners} />
        </section>
    );
}
