import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';
import { eq, isNotNull } from 'drizzle-orm';

export const getAllCharacters = async () => {
    try {
        const allCharacters = await db.select().from(characters);

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

export const getCharacterByName = async (name: string) => {
    try {
        const characterByName = await db.query.characters.findFirst({
            where: eq(characters.name, name),
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

        return characterByName;
    } catch {
        return null;
    }
};
