import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { GameEvent } from '@/lib/types';
import { Star } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EventModal from '@/components/events/event-modal';
import { clsx } from 'clsx';
import { addToFavorite, removeFromFavorite } from '@/lib/achievements';

const EndedEvents = ({
    endedEvents,
    favoriteEvents,
}: {
    endedEvents: GameEvent[];
    favoriteEvents: number[];
}) => {
    return (
        <section
            className={
                'relative h-full bg-gray-200 event-scrollbar overflow-y-auto rounded-xl flex flex-wrap gap-2 p-4'
            }
        >
            {endedEvents.map((event) => {
                const isFavorite = favoriteEvents.includes(event.id);
                const starClasses = clsx('peer mx-auto size-9 transition hover:stroke-blue-400', {
                    'stroke-blue-400 fill-blue-400 hover:fill-red-400 hover:stroke-red-400': isFavorite,
                    'hover:fill-blue-400': !isFavorite,
                });

                return (
                    <Dialog key={event.id}>
                        <DialogTrigger asChild>
                            <Card className={'relative h-fit basis-1/3'}>
                                <CardHeader>
                                    <CardTitle>
                                        {event.title}
                                        <div className={'absolute w-[20%] top-4 right-2'}>
                                            <Star
                                                onClick={
                                                    isFavorite
                                                        ? async (e) => {
                                                              e.stopPropagation();
                                                              await removeFromFavorite(event.id);
                                                          }
                                                        : async (e) => {
                                                              e.stopPropagation();
                                                              await addToFavorite(event.id);
                                                          }
                                                }
                                                className={starClasses}
                                            />
                                            {isFavorite && (
                                                <span
                                                    className={
                                                        'text-xs text-blue-400 transition peer-hover:text-red-400'
                                                    }
                                                >
                                                    Избранное!
                                                </span>
                                            )}
                                        </div>
                                    </CardTitle>
                                    <CardDescription>
                                        {event.startDate.toLocaleDateString()} -{' '}
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
                        <EventModal event={event} isFavorite={isFavorite} />
                    </Dialog>
                );
            })}
        </section>
    );
};

export default EndedEvents;
