import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { GameEvent } from '@/lib/types';
import { CSSProperties, useEffect, useState } from 'react';
import EventModal from '@/components/events/event-modal';

function getRandomColor() {
    return (
        '#' +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')
    );
}

const EventBlock = ({
    event,
    dates,
    row,
    isFavorite,
}: {
    event: GameEvent;
    dates: Date[];
    row: number;
    isFavorite: boolean;
}) => {
    const [color, setColor] = useState<string>('');
    const startIndex = dates.findIndex((date) => date.toDateString() === event.startDate.toDateString());
    const endIndex = dates.findIndex((date) => date.toDateString() === event.endDate.toDateString());

    useEffect(() => {
        setColor(getRandomColor());
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    style={
                        {
                            top: `${row * 15 + 10}%`,
                            left: `${startIndex * 2.5 + 2.3}rem`,
                            width: `${(endIndex - startIndex) * 2.5}rem`,
                            '--event-color': color,
                        } as CSSProperties
                    }
                    className="absolute flex items-center bg-[var(--event-color)] justify-between overflow-hidden h-10 text-white rounded-xl transition hover:bg-green-500"
                >
                    <p className={'p-2 truncate drop-shadow-[0_2px_1px_#000000]'}>{event.title}</p>
                    <div className={'w-32 h-full overflow-hidden'}>
                        <Image
                            alt={event.title}
                            src={`common/events/${event.title.replaceAll(':', '')}.webp`}
                            width={200}
                            height={50}
                            className={'w-full h-auto scale-[2]'}
                        />
                    </div>
                </div>
            </DialogTrigger>
            <EventModal event={event} isFavorite={isFavorite} />
        </Dialog>
    );
};

export default EventBlock;
