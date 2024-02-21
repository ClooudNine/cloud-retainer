import { db } from '@/lib/db';
import { weapons } from '@/lib/db/schema';
import { isNotNull } from 'drizzle-orm';

export const getWeaponsFromWishes = async () => {
    const weaponsFromWishes = await db
        .select()
        .from(weapons)
        .where(isNotNull(weapons.inStandardWish));

    return weaponsFromWishes;
};
