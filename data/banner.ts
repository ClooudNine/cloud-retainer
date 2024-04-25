import { characterBanners, standardBanners, weaponBanners } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { BannerTypes } from '@/lib/types';

export const getAllBanners = async () => {
    try {
        const [allCharactersBanners, allWeaponBanners, allStandardBanners] = await Promise.all([
            db.query.characterBanners.findMany({
                with: {
                    character: true,
                    featuredCharactersInBanners: {
                        columns: { bannerId: false, characterId: false },
                        with: { character: true },
                    },
                },
            }),

            db.query.weaponBanners.findMany({
                with: {
                    firstMainWeapon: true,
                    secondMainWeapon: true,
                    featuredWeaponsInBanners: {
                        columns: { bannerId: false, weaponId: false },
                        with: { weapon: true },
                    },
                },
            }),

            db.query.standardBanners.findMany({
                with: {
                    character: true,
                },
            }),
        ]);

        return [...allCharactersBanners, ...allWeaponBanners, ...allStandardBanners];
    } catch {
        return null;
    }
};

export const getBannerByIdAndType = async (id: number, type: BannerTypes) => {
    try {
        if (type === 'Weapon Event Wish') {
            const weaponBanner = await db.query.weaponBanners.findFirst({
                where: eq(weaponBanners.id, id),
                with: {
                    firstMainWeapon: true,
                    secondMainWeapon: true,
                    featuredWeaponsInBanners: {
                        columns: { bannerId: false, weaponId: false },
                        with: { weapon: true },
                    },
                },
            });

            return weaponBanner;
        }

        if (type === 'Standard Wish') {
            const standardBanner = await db.query.standardBanners.findFirst({
                where: eq(standardBanners.id, id),
                with: {
                    character: true,
                },
            });

            return standardBanner;
        }

        const characterBanner = await db.query.characterBanners.findFirst({
            where: eq(characterBanners.id, id),
            with: {
                character: true,
                featuredCharactersInBanners: {
                    columns: { bannerId: false, characterId: false },
                    with: { character: true },
                },
            },
        });

        return characterBanner;
    } catch {
        return null;
    }
};
