import {
    BannerTypes,
    CharacterBanner,
    characterBanners,
    StandardBanner,
    standardBanners,
    WeaponBanner,
    weaponBanners,
} from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export const getAllBanners = async () => {
    const allCharactersBanners: CharacterBanner[] = await db
        .select()
        .from(characterBanners);

    const allWeaponBanners: WeaponBanner[] = await db.select().from(weaponBanners);

    const allStandardBanners: StandardBanner[] = await db.select().from(standardBanners);

    return [...allCharactersBanners, ...allWeaponBanners, ...allStandardBanners];
};

export const getBannerByIdAndType = async (id: number, type: BannerTypes) => {
    if (type === 'Weapon Event Wish') {
        const weaponBanner = await db.query.weaponBanners.findFirst({
            where: eq(weaponBanners.id, id),
        });
        return weaponBanner;
    }

    if (type === 'Standard Wish') {
        const standardBanner = await db.query.standardBanners.findFirst({
            where: eq(standardBanners.id, id),
        });
        return standardBanner;
    }

    const characterBanner = await db.query.characterBanners.findFirst({
        where: eq(characterBanners.id, id),
    });
    return characterBanner;
};

export const getFeaturedItemsForCharacterBanner = async (id: number) => {};
