import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';
import { isNotNull } from 'drizzle-orm';

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
