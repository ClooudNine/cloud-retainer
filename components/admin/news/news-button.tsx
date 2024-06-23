import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { New } from '@/lib/types';

const NewsButton = ({ siteNew }: { siteNew: New }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/news/${siteNew.id}.webp`}
                        alt={siteNew.title}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {siteNew.title}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default NewsButton;
