import { db } from '@/lib/db';

export const getAllBosses = async () => {
    const allBosses = await db.query.bosses.findMany({
        with: { drop: true },
    });

    return allBosses;
};
