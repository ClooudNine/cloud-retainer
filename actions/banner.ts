'use server';
import { characterBanners, standardBanners, weaponBanners } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { BannerTypes } from '@/lib/types';
import { CharacterBannersSchema } from '@/lib/form-shemas';

export const deleteBanner = async (
    id: number | undefined,
    type: BannerTypes | undefined
) => {
    if (!id || !type) {
        return { error: 'Что-то пошло не так!' };
    }

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

export const editCharacterBanner = async (
    id: number,
    data: z.infer<typeof CharacterBannersSchema>,
    image: FormData
) => {
    try {
        const validatedFields = CharacterBannersSchema.safeParse(data);

        if (!validatedFields.success) {
            return { error: ['Поля некорректные!'] };
        }

        const {
            title,
            mainCharacterId,
            version,
            phase,
            rerunNumber,
            type,
            textParameters,
        } = validatedFields.data;

        const mainBannerData = {
            title,
            mainCharacterId,
            version,
            phase,
            rerunNumber,
            type,
            textParameters,
        };

        await db
            .update(characterBanners)
            .set(mainBannerData)
            .where(eq(characterBanners.id, id));

        revalidatePath('/admin/banners');
        return { success: 'Баннер отредактирован успешно!' };
    } catch {
        return { error: ['Что-то пошло не так!'] };
    }
};
