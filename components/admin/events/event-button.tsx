import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { GameEvent } from '@/lib/types';
import { useTranslations } from 'next-intl';
import EventForm from '@/components/admin/events/event-form';

const EventButton = ({ event }: { event: GameEvent }) => {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'h-40 w-56 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/events/${event.title}.webp`}
                        alt={t(`events.${event.title}.title`)}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {t(`events.${event.title}.title`)}
                </div>
            </DialogTrigger>
            <EventForm event={event} />
        </Dialog>
    );
};

export default EventButton;
