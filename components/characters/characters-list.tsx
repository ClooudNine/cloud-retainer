'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
                className={'text-center border-gray-500'}
            />
            <div className={'flex justify-between tracking-wide'}>
                <ElementPicker activeElement={element} setActiveElement={setElement} />
                <Separator className={'h-20 bg-black self-end'} orientation={'vertical'} />
                <WeaponTypePicker
                    activeWeaponType={weaponType}
                    setActiveWeaponType={setWeaponType}
                />
                <Separator className={'h-20 bg-black self-end'} orientation={'vertical'} />
                <Label className={'text-base w-1/4'}>
                    Сортировать по:
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className={'border-gray-500 mt-3'}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'appearance'}>Версия выхода</SelectItem>
                            <SelectItem value={'name'}>Имя</SelectItem>
                            <SelectItem value={'rare'}>Редкость</SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
            </div>
            <ScrollArea className={'h-[71%] pr-2'}>
                <div className={'flex flex-wrap pt-2 gap-2'}>
                    {sortedCharacters.map((character) => (
                        <Link
                            key={character.name}
                            href={`characters/${toLink(character.name)}`}
                            className={
                                'relative w-[10.45%] h-[9.8rem] flex flex-col justify-end rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
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
                                    className={'contrast-200 drop-shadow-[0_1px_5px_#000000]'}
                                />
                                <p className={'text-sm whitespace-nowrap truncate'}>
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
