import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/db/schema';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        return user;
    } catch (e) {
        console.log(e);
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
