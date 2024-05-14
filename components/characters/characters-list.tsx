'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Character, Elements, WeaponType } from '@/lib/types';
import ElementPicker from '@/components/characters/element-picker';
import WeaponTypePicker from '@/components/characters/weapon-type-picker';
import { getCharacterAsset } from '@/lib/character';
import { toLink } from '@/lib/utils';

const CharactersList = ({ characters }: { characters: Character[] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [element, setElement] = useState<Elements | null>(null);
    const [weaponType, setWeaponType] = useState<WeaponType | null>(null);
    const [sortOption, setSortOption] = useState<string>('appearance');

    const filteredCharacters = useMemo(() => {
        return characters.filter((character) => {
            const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesElement = !element || character.element === element;
            const matchesWeaponType = !weaponType || character.weaponType === weaponType;
            return matchesSearch && matchesElement && matchesWeaponType;
        });
    }, [characters, searchQuery, element, weaponType]);

    const sortedCharacters = useMemo(() => {
        const sortOptions: Record<string, (a: Character, b: Character) => number> = {
            appearance: (a: Character, b: Character) => b.appearanceVersion - a.appearanceVersion,
            rare: (a: Character, b: Character) => parseInt(b.rare) - parseInt(a.rare),
            name: (a: Character, b: Character) => a.name.localeCompare(b.name),
        };
        return [...filteredCharacters].sort(sortOptions[sortOption]);
    }, [filteredCharacters, sortOption]);

    return (
        <>
            <Input
                placeholder={'Введите имя персонажа'}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={'text-center border-gray-500 max-xs:h-14 max-xs:text-2xl'}
            />
            <div
                className={
                    'flex flex-wrap justify-between tracking-wide max-xs:gap-2 max-xs:text-3xl max-xs:flex-col'
                }
            >
                <ElementPicker activeElement={element} setActiveElement={setElement} />
                <WeaponTypePicker activeWeaponType={weaponType} setActiveWeaponType={setWeaponType} />
                <Label className={'max-xs:text-3xl xs:w-1/4'}>
                    Сортировать по:
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className={'max-xs:text-xl border-gray-500 mt-3'}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={'max-xs:text-xl'} value={'appearance'}>
                                Версия выхода
                            </SelectItem>
                            <SelectItem className={'max-xs:text-xl'} value={'name'}>
                                Имя
                            </SelectItem>
                            <SelectItem className={'max-xs:text-xl'} value={'rare'}>
                                Редкость
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
            </div>
            <ScrollArea className={'flex-1 pr-2'}>
                <div className={'flex flex-wrap pt-2 gap-2'}>
                    {sortedCharacters.map((character) => (
                        <Link
                            key={character.name}
                            href={`characters/${toLink(character.name)}`}
                            className={
                                'relative w-[calc(25%-0.5rem)] rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5 xs:w-[calc(16.66%-0.5rem)] lg:w-[calc(10%-0.5rem)]'
                            }
                        >
                            <Image
                                src={`common/items-backgrounds-by-rarity/background-item-${character.rare}-star.webp`}
                                alt={character.rare}
                                width={256}
                                height={256}
                                className={'w-full h-auto object-top'}
                            />
                            <Image
                                src={`characters/profiles/${getCharacterAsset(character.name)}.webp`}
                                alt={character.name}
                                fill
                                className={'object-contain object-top'}
                            />
                            <div className={'w-full flex gap-0.5 py-1 items-center justify-center'}>
                                <Image
                                    src={`common/elements/${character.element}.svg`}
                                    alt={character.element}
                                    width={30}
                                    height={30}
                                    className={
                                        'size-10 contrast-200 drop-shadow-[0_1px_5px_#000000] xs:size-6'
                                    }
                                />
                                <p className={'text-lg whitespace-nowrap truncate xs:text-sm'}>
                                    {character.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default CharactersList;
