import { db } from '@/lib/db';

export const getCurrentPromocodes = async () => {
    try {
        const currentPromocodes = await db.query.promocodes.findMany();

        return currentPromocodes;
    } catch {
        return null;
    }
};
