import { Character } from '@/lib/types';

export const getCharacterById = (id: number, characters: Character[]) => {
    const character = characters.find((character) => character.id === id);

    return character;
};

export const getCharacterAsset = (name: string) => {
    if (name.startsWith('Traveler')) {
        return 'Traveler';
    }

    return name;
};
