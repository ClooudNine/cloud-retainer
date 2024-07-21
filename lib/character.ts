import { Character } from '@/lib/types';

export const getCharacterById = (id: number, characters: Character[]) => {
    return characters.find((character) => character.id === id);
};

export const getCharacterAsset = (slug: string) => {
    if (slug.startsWith('traveler')) {
        return 'traveler';
    }

    return slug;
};
