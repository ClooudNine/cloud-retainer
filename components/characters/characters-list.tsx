'use client';
import { Character, Elements, WeaponType } from '@/lib/db/schema';
import Image from 'next/image';
import { CSSProperties, useState } from 'react';
import { elementToColor } from '@/lib/constants';
import Link from 'next/link';

const CharactersList = ({ characters }: { characters: Character[] }) => {
    const elements: Elements[] = [
        'Anemo',
        'Cryo',
        'Geo',
        'Pyro',
        'Hydro',
        'Electro',
        'Dendro',
    ];

    const weaponTypes: WeaponType[] = ['Sword', 'Bow', 'Catalyst', 'Polearm', 'Claymore'];

    const sortOptions = [
        { label: 'По алфавиту', value: 'alphabetical' },
        { label: 'По редкости', value: 'rarity' },
        { label: 'По версии выхода', value: 'releaseVersion' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedElement, setSelectedElement] = useState<Elements | null>(null);
    const [selectedWeaponType, setSelectedWeaponType] = useState<WeaponType | null>(null);
    const [selectedSortOption, setSelectedSortOption] = useState<string>('alphabetical');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const handleElementClick = (element: Elements) => {
        setSelectedElement(selectedElement === element ? null : element);
    };
    const handleWeaponTypeClick = (weaponType: WeaponType) => {
        setSelectedWeaponType(selectedWeaponType === weaponType ? null : weaponType);
    };
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortOption(event.target.value);
    };

    const filteredCharacters = characters.filter((character) => {
        const matchesSearch = character.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesElement = selectedElement
            ? character.element === selectedElement
            : true;

        const matchesWeaponType = selectedWeaponType
            ? character.weaponType === selectedWeaponType
            : true;

        return matchesSearch && matchesElement && matchesWeaponType;
    });

    const sortedCharacters = filteredCharacters.sort((a, b) => {
        switch (selectedSortOption) {
            case 'rarity':
                return parseInt(b.rare) - parseInt(a.rare);
            case 'releaseVersion':
                return b.appearanceVersion - a.appearanceVersion;
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return (
        <div className={'w-full'}>
            <div className={'flex flex-col gap-2 my-2 justify-center items-center'}>
                <input
                    placeholder={'Введите имя персонажа'}
                    value={searchQuery}
                    onChange={handleInputChange}
                    className={'border-2 border-gray-300 rounded-lg py-2 w-full'}
                />
                <div className={'flex gap-2'}>
                    {elements.map((element) => (
                        <Image
                            key={element}
                            onClick={() => handleElementClick(element)}
                            src={`common/elements/${element}.svg`}
                            alt={element}
                            width={100}
                            height={100}
                            style={
                                {
                                    '--ring-color': `${elementToColor[element]}`,
                                } as CSSProperties
                            }
                            className={`rounded-xl ${
                                selectedElement === element &&
                                `ring-2 ring-[rgb(var(--ring-color))]`
                            }`}
                        />
                    ))}
                </div>
                <div className={'flex gap-2'}>
                    {weaponTypes.map((weaponType) => (
                        <Image
                            key={weaponType}
                            onClick={() => handleWeaponTypeClick(weaponType)}
                            src={`weapons/icons/${weaponType}.webp`}
                            alt={weaponType}
                            width={100}
                            height={100}
                            className={`rounded-xl ${
                                selectedWeaponType === weaponType &&
                                'ring-2 ring-blue-500'
                            }`}
                        />
                    ))}
                </div>
                <div>
                    <label>Сортировать </label>
                    <select value={selectedSortOption} onChange={handleSortChange}>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={'flex flex-wrap justify-center gap-2'}>
                {sortedCharacters.map((character) => (
                    <Link
                        href={`characters/${character.name.toLowerCase().replace(/\s+/g, '-')}`}
                        key={character.name}
                        className={
                            'flex flex-col items-center drop-shadow-2xl w-32 rounded-2xl bg-gray-300 overflow-hidden duration-500 transition hover:-translate-y-2'
                        }
                    >
                        <Image
                            src={
                                character.rare === '5'
                                    ? 'common/items-backgrounds-by-rarity/background-item-5-star.webp'
                                    : 'common/items-backgrounds-by-rarity/background-item-4-star.webp'
                            }
                            width={200}
                            height={200}
                            alt={character.name}
                            className={'-z-10 absolute w-full'}
                        />
                        <Image
                            src={`characters/profiles/${character.name}.webp`}
                            alt={character.name}
                            width={200}
                            height={200}
                            className={'w-full'}
                        />
                        <p className={'py-2 w-full text-center text-sm'}>
                            {character.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CharactersList;
