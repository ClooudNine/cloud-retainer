import { db } from '@/lib/db';
import { weapons } from '@/lib/db/schema';
import { isNotNull } from 'drizzle-orm';

export const getAllWeapons = async () => {
    const allWeapons = await db.select().from(weapons);

    return allWeapons;
};
export const getWeaponsFromWishes = async () => {
    const weaponsFromWishes = await db
        .select()
        .from(weapons)
        .where(isNotNull(weapons.inStandardWish));

    return weaponsFromWishes;
};
