import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';
import { New } from '@/lib/types';
import NewsButton from '@/components/admin/news/news-button';

const NewsList = ({ news }: { news: New[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новость</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {news.map((siteNew) => (
                        <NewsButton key={siteNew.title} siteNew={siteNew} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default NewsList;
