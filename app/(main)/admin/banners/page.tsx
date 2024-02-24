import { getAllBanners } from '@/data/banner';
import BannersList from '@/components/admin/banners/banners-list';
import { getAllCharacters } from '@/data/character';

export default async function AdminBanners() {
    const allBanners = await getAllBanners();
    const characters = await getAllCharacters();

    return (
        <section className={'flex-1 h-full'}>
            <h1
                className={
                    'text-2xl text-center mt-2 h-[5%] bg-emerald-200 rounded-3xl mx-4'
                }
            >
                Редактор баннеров
            </h1>
            <BannersList banners={allBanners} characters={characters} />
        </section>
    );
}
