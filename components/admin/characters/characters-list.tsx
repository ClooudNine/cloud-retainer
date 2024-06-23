import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';
import { Character } from '@/lib/types';
import CharacterButton from '@/components/admin/characters/character-button';

const CharactersList = ({ characters }: { characters: Character[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить нового персонажа</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {characters.map((character) => (
                        <CharacterButton key={character.name} character={character} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default CharactersList;
