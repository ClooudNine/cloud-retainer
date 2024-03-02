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
import path from 'node:path';
import striptags from 'striptags';
import * as z from 'zod';
import { writeFile } from 'node:fs/promises';
import { getBannerByIdAndType } from '@/data/banner';
import * as fs from 'fs';

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

export const editCharacterBanner = async (
    id: number,
    values: z.infer<typeof CharacterBannersSchema>,
    image: FormData
) => {
    try {
        const validatedFields = CharacterBannersSchema.safeParse(values);

        if (!validatedFields.success) {
            return { message: 'Поля некорректные!' };
        }

        const prevBanner = (await getBannerByIdAndType(
            id,
            'Character Event Wish'
        )) as CharacterBanner;

        const {
            title,
            mainCharacterId,
            version,
            phase,
            rerunNumber,
            type,
            textParameters,
        } = validatedFields.data;

        if (image.get('image')) {
            const uploadDir = path.join(process.cwd(), 'public/wish-simulator/banners/');
            const fileName = `${striptags(title)} ${rerunNumber}.webp`;
            const filePath = path.join(uploadDir, fileName);

            const bytes = await (image.get('image') as File).arrayBuffer();
            const buffer = Buffer.from(bytes);

            await writeFile(filePath, buffer);
        } else {
            const uploadDir = path.join(process.cwd(), 'public/wish-simulator/banners/');
            const oldFileName = `${striptags(prevBanner.title)} ${
                prevBanner.rerunNumber
            }.webp`;
            const newFileName = `${striptags(title)} ${rerunNumber}.webp`;
            const oldFilePath = path.join(uploadDir, oldFileName);
            const newFilePath = path.join(uploadDir, newFileName);

            fs.rename(oldFilePath, newFilePath, (err) => {
                if (err) {
                    console.error('Ошибка при переименовании файла:', err);
                } else {
                    console.log('Файл успешно переименован.');
                }
            });
        }

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
