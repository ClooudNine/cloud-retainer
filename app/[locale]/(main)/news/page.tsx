import BackButton from '@/components/main/back-button';
import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import { getAllNews } from '@/data/news';
import NewsList from '@/components/main/news-list';

export default async function News() {
    const allNews = await getAllNews();

    if (!allNews) return <p>News fetch error!</p>;

    return (
        <section className={'flex-1 overflow-hidden flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton className={''} />
                <Newspaper className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>Новости</h1>
                <Image
                    src={'common/charlotte-namecard.webp'}
                    alt={'Charlotte namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <NewsList news={allNews} />
        </section>
    );
}
