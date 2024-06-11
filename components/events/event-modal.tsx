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

const EventModal = ({ event }: { event: GameEvent }) => {
    return (
        <DialogContent className={'max-w-2xl'}>
            <DialogHeader>
                <DialogTitle>{event.title}</DialogTitle>
                <DialogDescription>
                    {event.startDate.toLocaleDateString()}-{event.endDate.toLocaleDateString()}
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
                    <Button type="button">Назад</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default EventModal;
