import {
    CharacterBanner,
    characterBanners,
    StandardBanner,
    standardBanners,
    WeaponBanner,
    weaponBanners,
} from '@/lib/db/schema';
import { db } from '@/lib/db';

export const getAllBanners = async () => {
    const allCharactersBanners: CharacterBanner[] = await db
        .select()
        .from(characterBanners);

    const allWeaponBanners: WeaponBanner[] = await db.select().from(weaponBanners);

    const allStandardBanners: StandardBanner[] = await db.select().from(standardBanners);

    return [...allCharactersBanners, ...allWeaponBanners, ...allStandardBanners];
};
