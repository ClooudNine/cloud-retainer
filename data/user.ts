import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/db/schema';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.id, id),
        });

        return user;
    } catch {
        return null;
    }
};

export const getAdminUsers = async () => {
    try {
        const adminUsers = await db.query.users.findMany({
            where: eq(users.role, 'Admin'),
        });

        return adminUsers;
    } catch {
        return null;
    }
};
