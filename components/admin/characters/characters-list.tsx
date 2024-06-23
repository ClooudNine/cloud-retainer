import { ScrollArea } from '@/components/ui/scroll-area';
import { Character } from '@/lib/types';
import CharacterButton from '@/components/admin/characters/character-button';

const CharactersList = ({ characters }: { characters: Character[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {characters.map((character) => (
                    <CharacterButton key={character.name} character={character} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default CharactersList;
