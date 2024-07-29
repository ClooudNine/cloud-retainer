'use client';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Character, Elements, WeaponType } from '@/lib/types';
import ElementPicker from '@/components/characters/element-picker';
import WeaponTypePicker from '@/components/weapons/weapon-type-picker';
import { getCharacterAsset } from '@/lib/character';
import { useTranslations } from 'next-intl';

const sortOptions: Record<string, (a: Character, b: Character) => number> = {
    appearance: (a: Character, b: Character) => b.appearanceVersion - a.appearanceVersion,
    rare: (a: Character, b: Character) => parseInt(b.rare) - parseInt(a.rare),
    name: (a: Character, b: Character) => a.name.localeCompare(b.name),
};

const CharactersList = ({ characters }: { characters: Character[] }) => {
    const t = useTranslations();

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [element, setElement] = useState<Elements | null>(null);
    const [weaponType, setWeaponType] = useState<WeaponType | null>(null);
    const [sortOption, setSortOption] = useState<string>('appearance');

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const filteredCharacters = useMemo(() => {
        return characters.filter(
            (character) =>
                character.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (!element || character.element === element) &&
                (!weaponType || character.weaponType === weaponType)
        );
    }, [characters, searchQuery, element, weaponType]);

    const sortedCharacters = useMemo(
        () => filteredCharacters.sort(sortOptions[sortOption]),
        [filteredCharacters, sortOption]
    );

    return (
        <>
            <Input
                placeholder={t('main.type-name')}
                onChange={handleSearchChange}
                className={'text-center border-gray-500 max-lg:h-14 max-lg:text-2xl'}
            />
            <div
                className={'flex justify-between tracking-wide max-lg:gap-2 max-lg:text-3xl max-lg:flex-col'}
            >
                <ElementPicker activeElement={element} setActiveElement={setElement} />
                <WeaponTypePicker activeWeaponType={weaponType} setActiveWeaponType={setWeaponType} />
                <Label className={'max-lg:text-3xl lg:w-1/4'}>
                    {t('main.sorted-by')}:
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className={'max-lg:text-xl border-gray-500 mt-4'}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={'max-lg:text-xl'} value={'appearance'}>
                                {t('main.appearance-version')}
                            </SelectItem>
                            <SelectItem className={'max-lg:text-xl'} value={'name'}>
                                {t('main.name')}
                            </SelectItem>
                            <SelectItem className={'max-lg:text-xl'} value={'rare'}>
                                {t('main.rare')}
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
                            href={`characters/${character.slug}`}
                            className={
                                'relative w-[calc(25%-0.5rem)] rounded-xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5 xs:w-[calc(16.66%-0.5rem)] xl:w-[calc(10%-0.5rem)]'
                            }
                        >
                            <Image
                                src={`common/backgrounds-by-rarity/${character.rare}-star.webp`}
                                alt={character.rare}
                                width={256}
                                height={256}
                            />
                            <Image
                                src={`characters/profiles/${getCharacterAsset(character.slug)}.webp`}
                                alt={character.name}
                                fill
                                className={'object-contain object-top'}
                            />
                            <div className={'flex gap-0.5 py-1 items-center justify-center'}>
                                <Image
                                    src={`common/elements/${character.element}.svg`}
                                    alt={t(`elements.${character.element}`)}
                                    width={30}
                                    height={30}
                                    className={
                                        'size-10 contrast-200 drop-shadow-[0_1px_5px_#000000] lg:size-6'
                                    }
                                />
                                <p className={'text-lg truncate lg:text-sm'}>{character.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default CharactersList;
