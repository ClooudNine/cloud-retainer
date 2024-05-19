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
        const weaponsFromWishes = await db.select().from(weapons).where(isNotNull(weapons.inStandardWish));

        return weaponsFromWishes;
    } catch {
        return null;
    }
};

export const getWeaponBySlug = async (slug: string) => {
    try {
        const weaponBySlug = await db.query.weapons.findFirst({
            where: eq(weapons.slug, slug),
            with: {
                ascensionMaterial: true,
                firstEnhancementMaterial: true,
                secondEnhancementMaterial: true,
                characters: { with: { character: true } },
            },
        });

        return weaponBySlug;
    } catch {
        return null;
    }
};
