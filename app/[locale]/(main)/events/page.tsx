import { getAllEvents, getFavoriteEvents } from '@/data/events';
import { currentUser } from '@/lib/auth';
import EventsSection from '@/components/events/events-section';
import { unstable_setRequestLocale } from 'next-intl/server';

export const metadata = {
    title: 'Cloud Retainer | События',
    description: `Список всех текущих и прошедших игровых событий в игре Genshin Impact.
     Здесь вы можете узнать краткое описание события, его длительность и какие нагады вы можете получить`,
};

export default async function Events({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const user = await currentUser();

    const events = await getAllEvents();
    const favoriteEvents = await getFavoriteEvents(user?.id);

    if (!events) return <p>Events fetch error!</p>;

    return (
        <section className={'flex-1 overflow-hidden flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
            <EventsSection events={events} favoriteEvents={favoriteEvents} />
        </section>
    );
}
