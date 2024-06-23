import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { GameEvent } from '@/lib/types';
import EventForm from '@/components/admin/events/event-form';

const EventButton = ({ event }: { event: GameEvent }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'h-40 w-56 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/events/${event.title}.webp`}
                        alt={event.title}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {event.title}
                </div>
            </DialogTrigger>
            <EventForm event={event} />
        </Dialog>
    );
};

export default EventButton;
