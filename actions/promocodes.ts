'use server';
import { db } from '@/lib/db';
import { promocodes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { PromocodesSchema } from '@/lib/form-shemas';

export const editPromocode = async (values: z.infer<typeof PromocodesSchema>) => {
    const validatedFields = PromocodesSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors.map((error) => error.message) };
    }

    const { id, value, rewards, date } = validatedFields.data;

    if (id) {
        await db.update(promocodes).set({ value: value, rewards: rewards }).where(eq(promocodes.id, id));
        revalidatePath('/admin/promocodes');
        return { success: 'Промокод успешно обновлён' };
    }

    await db.insert(promocodes).values({ value: value, rewards: rewards, startDate: date });
    revalidatePath('/admin/promocodes');
    return { success: 'Промокод успешно добавлен' };
};

export const deletePromocode = async (id: number) => {
    await db.delete(promocodes).where(eq(promocodes.id, id));
    revalidatePath('/admin/promocodes');

    return { success: 'Промокод успешно удалён' };
};
