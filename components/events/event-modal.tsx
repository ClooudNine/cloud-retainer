import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GameEvent } from '@/lib/types';
import { CirclePlus, CircleX } from 'lucide-react';
import { addToFavorite, removeFromFavorite } from '@/lib/achievements';
import { useTranslations } from 'next-intl';

const EventModal = ({ event, isFavorite }: { event: GameEvent; isFavorite: boolean }) => {
    const t = useTranslations();

    return (
        <DialogContent className={'max-w-2xl max-h-[80%] overflow-y-auto'}>
            <DialogHeader>
                <DialogTitle>{t(`events.${event.title}.title`)}</DialogTitle>
                <DialogDescription>
                    {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                </DialogDescription>
            </DialogHeader>
            <Image
                alt={t(`events.${event.title}.title`)}
                src={`common/events/${event.title.replaceAll(':', '')}.webp`}
                width={500}
                height={200}
                className={'w-full'}
            />
            {t(`events.${event.title}.description`)}
            <DialogFooter>
                <DialogClose asChild>
                    <Button>{t('main.back')}</Button>
                </DialogClose>
                {isFavorite ? (
                    <Button
                        onClick={async () => await removeFromFavorite(event.id)}
                        className={'bg-red-400 gap-2'}
                    >
                        {t('main.remove-from-favorite')} <CircleX />
                    </Button>
                ) : (
                    <Button
                        onClick={async () => await addToFavorite(event.id)}
                        className={'bg-green-400 gap-2'}
                    >
                        {t('main.add-to-favorite')} <CirclePlus />
                    </Button>
                )}
            </DialogFooter>
        </DialogContent>
    );
};

export default EventModal;
