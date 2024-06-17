'use server';
import { db } from '@/lib/db';
import { userEvents } from '@/lib/db/schema';
import { currentUser } from '@/lib/auth';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const addEventToFavorite = async (eventId: number) => {
    try {
        const user = await currentUser();

        if (!user?.id)
            return {
                status: 'warning',
                message: 'Вы должны быть авторизованы для добавления событий в избранное!',
            };

        await db.insert(userEvents).values({ userId: user.id, eventId: eventId });
        revalidatePath('/events');

        return {
            status: 'success',
            message: 'Событие успешно добавлено в избранное!',
        };
    } catch {
        return {
            status: 'error',
            message: 'Произошла непредвиденная ошибка!',
        };
    }
};

export const removeEventsFromFavorite = async (eventId: number) => {
    try {
        const user = await currentUser();

        if (!user?.id)
            return {
                status: 'warning',
                message: 'Вы должны быть авторизованы для удаления событий из избранного!',
            };

        await db
            .delete(userEvents)
            .where(and(eq(userEvents.userId, user.id), eq(userEvents.eventId, eventId)));
        revalidatePath('/events');

        return {
            status: 'success',
            message: 'Событие успешно удалено из избранного!',
        };
    } catch {
        return {
            status: 'error',
            message: 'Произошла непредвиденная ошибка!',
        };
    }
};
