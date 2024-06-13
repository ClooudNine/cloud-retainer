import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';
import { New } from '@/lib/types';
import { Link } from '@/navigation';

const News = ({ lastNews }: { lastNews: New[] | null }) => {
    if (!lastNews) {
        return <div>Cannot load news!</div>;
    }

    return (
        <Card className={'w-[70%]'}>
            <CardHeader>
                <CardTitle className={'flex gap-2'}>
                    <Newspaper />
                    Последние новости
                    <Newspaper />
                </CardTitle>
                <CardDescription>
                    Три последние новости на сайте. Для перехода ко всем новостям нажмите «Все новости»
                </CardDescription>
            </CardHeader>
            <CardContent>
                {lastNews.map((lastNew) => (
                    <div key={lastNew.title}>{lastNew.title}</div>
                ))}
                <Link href={'/news'}>Все новости</Link>
            </CardContent>
        </Card>
    );
};

export default News;
