import { Character } from '@/lib/db/schema';

export const getCharacterById = (id: number, characters: Character[]) => {
    const character = characters.find((character) => character.id === id);

    return character;
};
