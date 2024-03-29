import { getAllBanners } from '@/data/banner';
import BannersList from '@/components/admin/banners/banners-list';
import { getAllCharacters } from '@/data/character';

export default async function AdminBanners() {
    const allBanners = await getAllBanners();
    const characters = await getAllCharacters();

    return (
        <section className={'flex-1 h-screen'}>
            <h1
                className={
                    'text-2xl text-center mt-2 py-1 bg-emerald-200 rounded-2xl mx-4'
                }
            >
                Редактор баннеров
            </h1>
            <BannersList banners={allBanners} characters={characters} />
        </section>
    );
}
