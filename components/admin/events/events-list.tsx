import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameEvent } from '@/lib/types';
import EventButton from '@/components/admin/events/event-button';
import EventForm from '@/components/admin/events/event-form';

const EventsList = ({ events }: { events: GameEvent[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новое событие</Button>
                </DialogTrigger>
                <EventForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {events.map((event) => (
                        <EventButton key={event.title} event={event} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default EventsList;
