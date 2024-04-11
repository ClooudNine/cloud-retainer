import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCharacterById } from '@/lib/character';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

const CharacterPicker = () => {
    return (
        <Popover modal>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                        )}
                    >
                        {field.value
                            ? getCharacterById(field.value, characters)?.name
                            : 'Выбрать персонажа'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Найти персонажа..." />
                    <ScrollArea className={'h-72'}>
                        <CommandEmpty>Персонаж не найден</CommandEmpty>
                        <CommandGroup>
                            {characters
                                .filter((character) => character.rare === '5')
                                .map((character) => (
                                    <CommandItem
                                        value={character.name}
                                        key={character.name}
                                        onSelect={() => {
                                            form.setValue(
                                                'mainCharacterId',
                                                character.id
                                            );
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                character.id === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        {character.name}
                                        <Image
                                            src={`/characters/profiles/${character.name}.webp`}
                                            alt={character.name}
                                            width={100}
                                            height={100}
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

export default CharacterPicker;
