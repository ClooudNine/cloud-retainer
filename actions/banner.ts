'use server';

import {
    BannerTypes,
    characterBanners,
    standardBanners,
    weaponBanners,
} from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteBanner = async (id: number, type: BannerTypes) => {
    try {
        if (type === 'Weapon Event Wish') {
            await db.delete(weaponBanners).where(eq(weaponBanners.id, id));
        } else if (type === 'Standard Wish') {
            await db.delete(standardBanners).where(eq(standardBanners.id, id));
        } else {
            await db.delete(characterBanners).where(eq(characterBanners.id, id));
        }
        revalidatePath('/admin/banners');
        return { success: 'Баннер успешно удалён!' };
    } catch {
        return { error: 'Ошибка при удалении баннера!' };
    }
};
