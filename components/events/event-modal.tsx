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

const EventModal = ({ event, isFavorite }: { event: GameEvent; isFavorite: boolean }) => {
    return (
        <DialogContent className={'max-w-2xl'}>
            <DialogHeader>
                <DialogTitle>{event.title}</DialogTitle>
                <DialogDescription>
                    {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                </DialogDescription>
            </DialogHeader>
            <Image
                alt={event.title}
                src={`common/events/${event.title.replaceAll(':', '')}.webp`}
                width={500}
                height={200}
                className={'w-full'}
            />
            {event.description}
            <DialogFooter>
                <DialogClose asChild>
                    <Button>Назад</Button>
                </DialogClose>
                {isFavorite ? (
                    <Button
                        onClick={async () => await removeFromFavorite(event.id)}
                        className={'bg-red-400 gap-2'}
                    >
                        Удалить из избранного <CircleX />
                    </Button>
                ) : (
                    <Button
                        onClick={async () => await addToFavorite(event.id)}
                        className={'bg-green-400 gap-2'}
                    >
                        Добавить в избранное <CirclePlus />
                    </Button>
                )}
            </DialogFooter>
        </DialogContent>
    );
};

export default EventModal;
