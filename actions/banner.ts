'use server';
import {
    BannerTypes,
    CharacterBanner,
    characterBanners,
    CharacterBannersSchema,
    standardBanners,
    weaponBanners,
} from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getBannerByIdAndType } from '@/data/banner';
import { minioClient } from '@/lib/minio';
import { AuthState } from '@/actions/register';
import { z } from 'zod';

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

        if (image) {
            await minioClient.putObject('wish-simulator', 'test1.jpg', image);
        }

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
