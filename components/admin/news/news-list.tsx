import { ScrollArea } from '@/components/ui/scroll-area';
import { New } from '@/lib/types';
import NewsButton from '@/components/admin/news/news-button';

const NewsList = ({ news }: { news: New[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {news.map((siteNew) => (
                    <NewsButton key={siteNew.title} siteNew={siteNew} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default NewsList;
