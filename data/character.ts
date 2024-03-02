import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';
import { eq, isNotNull } from 'drizzle-orm';

export const getAllCharacters = async () => {
    const allCharacters = await db.select().from(characters);

    return allCharacters;
};

export const getCharactersFromWishes = async () => {
    const charactersFromWishes = await db
        .select()
        .from(characters)
        .where(isNotNull(characters.inStandardWish));

    return charactersFromWishes;
};

export const getCharacterByName = async (name: string) => {
    const characterByName = await db.query.characters.findFirst({
        where: eq(characters.name, name),
    });

    return characterByName;
};
