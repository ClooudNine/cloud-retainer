import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Character, CharacterBanner, StandardBanner } from '@/lib/db/schema';
import { getCharacterById } from '@/lib/character';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

const SelectCharacter = ({
    banner,
    characters,
}: {
    banner: CharacterBanner | StandardBanner;
    characters: Character[];
}) => {
    const [open, setOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(
        getCharacterById(banner.mainCharacterId, characters)
    );

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between col-span-3"
                >
                    {selectedCharacter?.name || 'Выбрать персонажа'}
                    <CaretSortIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Найти персонажа..." className="h-9" />
                    <ScrollArea className={'h-52'}>
                        <CommandEmpty>Персонажи не найдены</CommandEmpty>
                        <CommandGroup>
                            {characters.map((character) => (
                                <CommandItem
                                    key={character.name}
                                    value={character.name}
                                    onSelect={() => {
                                        setSelectedCharacter(
                                            character === selectedCharacter
                                                ? undefined
                                                : character
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {character.name}
                                    <Image
                                        src={`/characters/profiles/${character.name}.webp`}
                                        alt={character.name}
                                        width={100}
                                        height={100}
                                        quality={100}
                                        className={'h-12 w-auto ml-auto'}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectCharacter;
