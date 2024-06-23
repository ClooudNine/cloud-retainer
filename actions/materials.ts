'use server';
import { z } from 'zod';
import { MaterialsSchema } from '@/lib/form-shemas';
import { db } from '@/lib/db';
import { materials } from '@/lib/db/schema';
import { MaterialTypes } from '@/lib/types';
import { eq } from 'drizzle-orm';
import { minioClient } from '@/lib/minio';
import { storagePaths } from '@/lib/constants';
import { revalidatePath } from 'next/cache';

export const editMaterial = async (values: z.infer<typeof MaterialsSchema>, formData: FormData) => {
    const validatedFields = MaterialsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors.map((error) => error.message) };
    }

    const { id, name, type } = validatedFields.data;

    const image = formData.get('image') as File;

    if (image) {
        await minioClient.putObject(
            `common`,
            `/${storagePaths[type as MaterialTypes]}/${name}.webp`,
            Buffer.from(await image.arrayBuffer()),
            image.size,
            {
                'Content-Type': image.type,
            }
        );
    }

    if (id) {
        await db
            .update(materials)
            .set({ name: name, type: type as MaterialTypes })
            .where(eq(materials.id, id));

        revalidatePath('/admin/materials');
        return { success: 'Материал успешно обновлён' };
    } else {
        await db.insert(materials).values({ name: name, type: type as MaterialTypes });

        revalidatePath('/admin/materials');
        return { success: 'Материал успешно добавлен' };
    }
};

export const deleteMaterial = async (id: number) => {
    await db.delete(materials).where(eq(materials.id, id));
    revalidatePath('/admin/materials');

    return { success: 'Материал успешно удалён' };
};
