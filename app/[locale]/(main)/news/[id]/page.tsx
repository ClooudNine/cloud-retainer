import BackButton from '@/components/main/back-button';
import { Frown, Newspaper } from 'lucide-react';
import { Metadata } from 'next';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNewById } from '@/data/news';

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
    const newById = await getNewById(params.id);

    if (!newById) {
        return {
            title: `Cloud Retainer | Новости - Новость не найдена!`,
            description: `Новость не найдена! Проверьте правильность написания запроса.`,
        };
    }

    return {
        title: `Cloud Retainer | Новости - ${newById.title}`,
        description: `${newById.title}.`,
    };
}

export default async function NewPage({
    params: { locale, id },
}: {
    params: { locale: string; id: number };
}) {
    const newById = await getNewById(id);

    if (!newById) {
        return (
            <section className={'space-y-4 text-center m-auto'}>
                <Frown className={'mx-auto size-44 xs:size-28'} />
                <h1 className={'text-5xl xs:text-3xl'}>Новость не найдена!</h1>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'max-xs:p-8 max-xs:text-2xl max-xs:rounded-xl',
                        })
                    )}
                    href={'/characters'}
                >
                    Назад к списку новостей
                </Link>
            </section>
        );
    }

    return (
        <section
            className={
                'overflow-y-auto event-scrollbar flex flex-col gap-2 px-4 pt-8 max-xs:h-3/4 xs:pt-4 max-xl:items-center xl:flex-1'
            }
        >
            <div className={'relative flex items-center gap-4'}>
                <BackButton className={''} />
                <Newspaper className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>{newById.title}</h1>
                <h2 className={'w-fit bg-black text-white rounded-lg p-2 ml-auto'}>
                    Дата публикации: {newById.publishDate.toLocaleDateString()}
                </h2>
            </div>
            <div
                className={
                    'mt-2 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_ul]:list-disc [&_ul]:list-inside'
                }
                dangerouslySetInnerHTML={{ __html: newById.content }}
            ></div>
        </section>
    );
}
