import { db } from '@/lib/db';
import {
    characterBanners,
    characters,
    featuredCharactersInBanners,
    featuredWeaponsInBanners,
    weaponBanners,
    weapons,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    let res;
    if (type === 'Weapon Event Wish') {
        res = await db
            .select()
            .from(featuredWeaponsInBanners)
            .leftJoin(weapons, eq(featuredWeaponsInBanners.weaponId, weapons.id))
            .leftJoin(
                weaponBanners,
                eq(featuredWeaponsInBanners.bannerId, weaponBanners.id)
            )
            .where(eq(weaponBanners.id, Number(id)));
    } else {
        res = await db
            .select()
            .from(featuredCharactersInBanners)
            .leftJoin(
                characters,
                eq(featuredCharactersInBanners.characterId, characters.id)
            )
            .leftJoin(
                characterBanners,
                eq(featuredCharactersInBanners.bannerId, characterBanners.id)
            )
            .where(eq(characterBanners.id, Number(id)));
    }

    return Response.json({ res });
}
