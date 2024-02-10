import { db } from '@/lib/db';
import {
    characters,
    featuredCharactersInBanners,
    featuredWeaponsInBanners,
    weapons,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    let res;
    if (type === 'Weapon Event Wish') {
        const weaponsId = await db
            .select({ id: featuredWeaponsInBanners.weaponId })
            .from(featuredWeaponsInBanners)
            .where(eq(featuredWeaponsInBanners.bannerId, Number(id)));

        res = await db
            .select()
            .from(weapons)
            .where(
                inArray(
                    weapons.id,
                    weaponsId.map((weaponId) => weaponId.id)
                )
            );
    } else {
        const charactersId = await db
            .select({ id: featuredCharactersInBanners.characterId })
            .from(featuredCharactersInBanners)
            .where(eq(featuredCharactersInBanners.bannerId, Number(id)));

        res = await db
            .select()
            .from(characters)
            .where(
                inArray(
                    characters.id,
                    charactersId.map((characterId) => characterId.id)
                )
            );
    }

    return Response.json({ res });
}
