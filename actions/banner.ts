'use server';
import {
    BannerTypes,
    characterBanners,
    CharacterBannersSchema,
    standardBanners,
    weaponBanners,
} from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import path from 'node:path';
import * as fs from 'fs';
import striptags from 'striptags';
import { z } from 'zod';

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

export const editCharacterBanner = async (id: number, values: FormData) => {
    try {
        console.log(values);
        const validatedFields = CharacterBannersSchema.safeParse(values);

        if (!validatedFields.success) {
            return { message: 'Поля некорректные!' };
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

        const publicDir = path.resolve(
            process.cwd(),
            'public',
            'wish-simulator',
            'banners'
        );

        const fileName = `${striptags(title)} ${rerunNumber}.webp`;
        const imagePath = path.join(publicDir, fileName);

        fs.writeFile(imagePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error('Ошибка при записи файла:', err);
            } else {
                console.log('Файл успешно записан');
            }
        });

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
        return null;
    }
};
