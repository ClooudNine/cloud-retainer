'use server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { UserRoles } from '@/lib/types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { minioClient } from '@/lib/minio';

export const setUserRole = async (userName: string, role: UserRoles) => {
    try {
        const maybeUser = await db.query.users.findFirst({ where: eq(users.name, userName) });

        if (!maybeUser) {
            return { status: 'error', message: 'Пользователя с таким именем не существует!' };
        }

        await db.update(users).set({ role: role }).where(eq(users.name, userName));

        const message =
            role === 'Admin'
                ? 'Пользователь успешно назначен на роль администратора!'
                : 'Пользователь успешно разжалован!';

        revalidatePath('/admin');

        return { status: 'success', message: message };
    } catch {
        return { status: 'error', message: 'Что-то пошло не так!' };
    }
};

export const saveProfileChanges = async (userId: string, formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const avatarFile = formData.get('avatar') as File;

        await db.update(users).set({ name: name }).where(eq(users.id, userId));

        if (avatarFile) {
            await minioClient.putObject(
                'avatars',
                userId,
                Buffer.from(await avatarFile.arrayBuffer()),
                avatarFile.size,
                {
                    'Content-Type': avatarFile.type,
                }
            );

            const avatarUrl = `https://content.retainer.cloud/avatars/${userId}`;

            await db.update(users).set({ image: avatarUrl }).where(eq(users.id, userId));
        }

        revalidatePath('/', 'layout');
        return { status: 'success', message: 'Изменения успешно применены' };
    } catch {
        return { status: 'error', message: 'Ошибка обновления профиля' };
    }
};
