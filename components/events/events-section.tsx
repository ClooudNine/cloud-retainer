'use client';
import BackButton from '@/components/main/back-button';
import { CalendarRange } from 'lucide-react';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Timeline from '@/components/events/timeline';
import EndedEvents from '@/components/events/ended-events';
import { GameEvent } from '@/lib/types';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const EventsSection = ({ events, favoriteEvents }: { events: GameEvent[]; favoriteEvents: number[] }) => {
    const t = useTranslations();

    const [showFavorites, setShowFavorites] = useState(false);
    const today = new Date();

    const endedEvents = events.filter((event) => event.endDate < today);

    const filteredEvents = showFavorites
        ? events.filter((event) => favoriteEvents.some((fav) => fav === event.id))
        : events;

    const filteredEndedEvents = showFavorites
        ? endedEvents.filter((event) => favoriteEvents.some((fav) => fav === event.id))
        : endedEvents;

    return (
        <>
            <div className={'relative flex items-center gap-4'}>
                <BackButton />
                <CalendarRange className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>{t('main.event-feed')}</h1>
                <Image
                    src={'common/shenhe-namecard.webp'}
                    alt={'Shenhe namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
                <div className="flex items-center space-x-2">
                    <Switch
                        id="favorite-mode"
                        checked={showFavorites}
                        onCheckedChange={() => setShowFavorites(!showFavorites)}
                    />
                    <Label htmlFor="favorite-mode" className={'max-xl:text-xl max-xs:text-white'}>
                        {t('main.only-favorites')}
                    </Label>
                </div>
            </div>
            <Tabs defaultValue="active" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 bg-gray-200 max-xl:h-fit">
                    <TabsTrigger value="active" className={'max-xl:text-xl'}>
                        {t('main.active')}
                    </TabsTrigger>
                    <TabsTrigger value="ended" className={'max-xl:text-xl'}>
                        {t('main.ended')}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="active" className={'flex-1'}>
                    <Timeline events={filteredEvents} favoriteEvents={favoriteEvents} />
                </TabsContent>
                <TabsContent value="ended" className={'flex-1'}>
                    <EndedEvents endedEvents={filteredEndedEvents} favoriteEvents={favoriteEvents} />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default EventsSection;
