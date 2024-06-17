'use client';
import Day from '@/components/events/day';
import EventBlock from '@/components/events/event-block';
import { GameEvent } from '@/lib/types';
import { useEffect, useMemo, useRef } from 'react';
import CurrentTimeLine from '@/components/events/current-time-line';

const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

const Timeline = ({ events, favoriteEvents }: { events: GameEvent[]; favoriteEvents: number[] }) => {
    const timelineRef = useRef<HTMLElement>(null);

    const today = useMemo(() => new Date(), []);

    const minDate = useMemo(() => {
        const date = new Date(today);
        date.setDate(date.getDate() - 30);
        return date;
    }, [today]);

    const maxDate = useMemo(() => {
        const date = new Date(today);
        date.setDate(date.getDate() + 45);
        return date;
    }, [today]);

    const timelineDates = useMemo(() => getDatesBetween(minDate, maxDate), [minDate, maxDate]);

    const eventRows = useMemo(() => {
        const rows: GameEvent[][] = [[]];
        events.forEach((event) => {
            let placed = false;
            for (const row of rows) {
                if (!row.some((e) => event.startDate <= e.endDate && event.endDate >= e.startDate)) {
                    row.push(event);
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                rows.push([event]);
            }
        });
        return rows;
    }, [events]);

    useEffect(() => {
        const todayIndex = timelineDates.findIndex((date) => date.toDateString() === today.toDateString());

        if (todayIndex !== -1 && timelineRef.current) {
            const dayWidth = timelineRef.current.scrollWidth / timelineDates.length;
            const scrollPosition = todayIndex * dayWidth - timelineRef.current.clientWidth / 2 + dayWidth / 2;
            timelineRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }, [timelineDates, today]);

    const todayIndex = timelineDates.findIndex((date) => date.toDateString() === today.toDateString());

    return (
        <section
            ref={timelineRef}
            className={'relative h-full bg-gray-200 event-scrollbar flex overflow-x-auto rounded-xl p-4'}
        >
            {timelineDates.map((date) => (
                <Day key={date.toISOString()} date={date} />
            ))}
            {eventRows.map((row, rowIndex) => {
                return row.map((event) => (
                    <EventBlock
                        key={event.id}
                        event={event}
                        dates={timelineDates}
                        row={rowIndex}
                        isFavorite={favoriteEvents.includes(event.id)}
                    />
                ));
            })}
            <CurrentTimeLine todayIndex={todayIndex} />
        </section>
    );
};

export default Timeline;
