'use server';
import { db } from '@/lib/db';
import { events, materials, userEvents } from '@/lib/db/schema';
import { currentUser } from '@/lib/auth';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { EventsSchema } from '@/lib/form-shemas';
import { minioClient } from '@/lib/minio';

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

export const editEvent = async (values: z.infer<typeof EventsSchema>, formData: FormData) => {
    const validatedFields = EventsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors.map((error) => error.message) };
    }

    const { id, title, description, startDate, endDate } = validatedFields.data;

    const image = formData.get('image') as File;

    if (image) {
        await minioClient.putObject(
            `common`,
            `/events/${title}.webp`,
            Buffer.from(await image.arrayBuffer()),
            image.size,
            {
                'Content-Type': image.type,
            }
        );
    }

    if (id) {
        await db
            .update(events)
            .set({ title: title, description: description, startDate: startDate, endDate: endDate })
            .where(eq(materials.id, id));

        revalidatePath('/admin/events');
        return { success: 'Событие успешно обновлено' };
    } else {
        await db
            .insert(events)
            .values({ title: title, description: description, startDate: startDate, endDate: endDate });

        revalidatePath('/admin/events');
        return { success: 'Событие успешно добавлено' };
    }
};

export const deleteEvent = async (id: number) => {
    await db.delete(events).where(eq(events.id, id));
    revalidatePath('/admin/events');

    return { success: 'Событие успешно удалено' };
};
