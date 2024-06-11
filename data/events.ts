import { db } from '@/lib/db';
import { events, userEvents } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const getAllEvents = async () => {
    try {
        const allEvents = await db.select().from(events);

        return allEvents;
    } catch {
        return null;
    }
};

export const getFavoriteEvents = async (userId: string | undefined) => {
    if (!userId) return [];

    try {
        const favoriteEvents = await db.query.userEvents.findMany({
            where: eq(userEvents.userId, userId),
        });

        return favoriteEvents;
    } catch {
        return [];
    }
};
