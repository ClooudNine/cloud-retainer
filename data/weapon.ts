import { db } from '@/lib/db';
import { weapons } from '@/lib/db/schema';
import { eq, isNotNull } from 'drizzle-orm';

export const getAllWeapons = async () => {
    try {
        const allWeapons = await db.select().from(weapons);

        return allWeapons;
    } catch {
        return null;
    }
};
export const getWeaponsFromWishes = async () => {
    try {
        const weaponsFromWishes = await db
            .select()
            .from(weapons)
            .where(isNotNull(weapons.inStandardWish));

        return weaponsFromWishes;
    } catch {
        return null;
    }
};

export const getWeaponByTitle = async (title: string) => {
    try {
        const weaponByTitle = await db.query.weapons.findFirst({
            where: eq(weapons.title, title),
            with: {
                ascensionMaterial: true,
                firstEnhancementMaterial: true,
                secondEnhancementMaterial: true,
                characters: { with: { character: true } },
            },
        });

        return weaponByTitle;
    } catch {
        return null;
    }
};
