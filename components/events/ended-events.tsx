import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { GameEvent } from '@/lib/types';
import { Star } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EventModal from '@/components/events/event-modal';

const EndedEvents = ({ endedEvents }: { endedEvents: GameEvent[] }) => {
    return (
        <section
            className={
                'relative h-full bg-gray-200 event-scrollbar overflow-y-auto rounded-xl flex flex-wrap gap-2 p-4'
            }
        >
            {endedEvents.map((event) => (
                <Dialog key={event.id}>
                    <DialogTrigger asChild>
                        <Card className={'h-fit basis-1/3'}>
                            <CardHeader>
                                <CardTitle className={'relative'}>
                                    {event.title}
                                    <Star
                                        className={
                                            'absolute -top-1 right-0 size-9 transition hover:stroke-blue-400 hover:fill-blue-400'
                                        }
                                    />
                                </CardTitle>
                                <CardDescription>
                                    {event.startDate.toLocaleDateString()}-
                                    {event.endDate.toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    alt={event.title}
                                    src={`common/events/${event.title.replaceAll(':', '')}.webp`}
                                    width={500}
                                    height={200}
                                    className={'w-full rounded-xl'}
                                />
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <EventModal event={event} />
                </Dialog>
            ))}
        </section>
    );
};

export default EndedEvents;
