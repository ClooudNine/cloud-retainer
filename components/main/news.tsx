import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import { New } from '@/lib/types';
import { Link } from '@/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const News = ({ lastNews }: { lastNews: New[] | null }) => {
    if (!lastNews) {
        return <div>Cannot load news!</div>;
    }

    return (
        <Card className={'w-[70%]'}>
            <CardHeader className={'py-2'}>
                <CardTitle className={'relative text-xl flex items-center gap-2'}>
                    <Newspaper />
                    Последние новости
                    <Newspaper />
                    <Link
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                size: 'default',
                                className:
                                    'absolute top-0 right-0 max-xs:p-8 max-xs:text-2xl max-xs:rounded-xl',
                            })
                        )}
                        href={'/news'}
                    >
                        Все новости
                    </Link>
                </CardTitle>
                <CardDescription>
                    Три последние новости на сайте. Для перехода ко всем новостям нажмите «Все новости»
                </CardDescription>
            </CardHeader>
            <CardContent className={'py-2 flex gap-2'}>
                {lastNews.map((lastNew) => (
                    <Link
                        href={`/news/${lastNew.id}`}
                        key={lastNew.title}
                        className={
                            'group space-y-1 bg-gray-300 rounded-xl p-2 transition hover:bg-blue-300 hover:text-white'
                        }
                    >
                        <h3>{lastNew.title}</h3>
                        <Image
                            alt={lastNew.title}
                            src={`common/news/${lastNew.id}.webp`}
                            width={300}
                            height={150}
                            className={'h-40 rounded-xl object-cover transition group-hover:scale-105'}
                        />
                        <p className={'text-xs text-right'}>{lastNew.publishDate.toLocaleDateString()}</p>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
};

export default News;
