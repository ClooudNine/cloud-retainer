import { db } from '@/lib/db';
import {
    bosses,
    characters,
    charactersConstellations,
    charactersTalents,
    gameUpdates,
    materials,
    weapons,
} from '@/lib/db/schema';
import { and, eq, isNotNull } from 'drizzle-orm';

export const getAllCharacters = async (language: string) => {
    try {
        const allCharacters = await db.query.characters.findMany({
            where: eq(characters.language, language),
        });

        return allCharacters;
    } catch {
        return null;
    }
};

export const getCharactersFromWishes = async () => {
    try {
        const charactersFromWishes = await db
            .select()
            .from(characters)
            .where(isNotNull(characters.inStandardWish));

        return charactersFromWishes;
    } catch {
        return null;
    }
};

export const getCharacterBySlug = async (slug: string, locale: string) => {
    try {
        const characterBySlug = await db.query.characters.findFirst({
            where: and(eq(characters.slug, slug), eq(characters.language, locale)),
            with: {
                boss: { with: { drop: true } },
                talentMaterial: true,
                talents: true,
                localSpecialty: true,
                enhancementMaterial: true,
                constellations: true,
                weapons: { with: { weapon: true } },
                appearanceVersion: true,
                artifacts: { with: { firstArtifactSet: true, secondArtifactSet: true } },
            },
        });

        const cbs = await db
            .select()
            .from(characters)
            .where(and(eq(characters.slug, slug), eq(characters.language, locale)))
            .leftJoin(bosses, eq(characters.bossId, bosses.id))
            .leftJoin(materials, eq(characters.talentMaterialId, materials.id))
            .leftJoin(materials, eq(characters.localSpecialtyId, materials.id))
            .leftJoin(materials, eq(characters.enhancementMaterialId, materials.id))
            .leftJoin(gameUpdates, eq(characters.appearanceVersion, gameUpdates.version));

        console.log(cbs[0]);
        return cbs[0];
    } catch (e) {
        return e;
    }
};
