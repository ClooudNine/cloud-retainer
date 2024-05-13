'use client';
import Image from 'next/image';
import { useState } from 'react';
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

    const filteredCharacters = characters.filter((character) => {
        const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesElement = element ? character.element === element : true;
        const matchesWeaponType = weaponType ? character.weaponType === weaponType : true;

        return matchesSearch && matchesElement && matchesWeaponType;
    });

    const sortedCharacters = filteredCharacters.sort((a, b) => {
        switch (sortOption) {
            case 'rare':
                return parseInt(b.rare) - parseInt(a.rare);
            case 'appearance':
                return b.appearanceVersion - a.appearanceVersion;
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return (
        <>
            <Input
                placeholder={'Введите имя персонажа'}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={'text-center border-gray-500 h-14 text-2xl sm:text-base sm:h-9'}
            />
            <div className={'flex flex-col justify-between tracking-wide text-3xl sm:flex-row sm:text-base'}>
                <ElementPicker activeElement={element} setActiveElement={setElement} />
                <WeaponTypePicker activeWeaponType={weaponType} setActiveWeaponType={setWeaponType} />
                <Label className={'text-3xl sm:text-base sm:w-1/4'}>
                    Сортировать по:
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className={'text-xl border-gray-500 mt-3 sm:text-base'}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={'text-xl sm:text-base'} value={'appearance'}>
                                Версия выхода
                            </SelectItem>
                            <SelectItem className={'text-xl sm:text-base'} value={'name'}>
                                Имя
                            </SelectItem>
                            <SelectItem className={'text-xl sm:text-base'} value={'rare'}>
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
                                'relative w-[calc((100%-3*0.5rem)/4)] h-[13rem] sm:w-[10.45%] sm:h-[9.8rem] flex flex-col justify-end rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
                            }
                        >
                            <Image
                                src={`common/items-backgrounds-by-rarity/background-item-${character.rare}-star.webp`}
                                alt={character.rare}
                                fill
                                className={'object-contain object-top'}
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
                                        'size-10 contrast-200 drop-shadow-[0_1px_5px_#000000] sm:size-6'
                                    }
                                />
                                <p className={'text-lg whitespace-nowrap truncate sm:text-sm'}>
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
