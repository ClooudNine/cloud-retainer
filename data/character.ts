import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';
import { isNotNull } from 'drizzle-orm';

export const getCharactersFromWishes = async () => {
    const allCharacters = await db
        .select()
        .from(characters)
        .where(isNotNull(characters.inStandardWish));

    return allCharacters;
};
