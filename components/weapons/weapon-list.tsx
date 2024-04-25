'use client';
import { Weapon, WeaponType } from '@/lib/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import WeaponTypePicker from '@/components/characters/weapon-type-picker';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

const WeaponList = ({ weapons }: { weapons: Weapon[] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState<WeaponType | null>(null);
    const [selectedStars, setSelectedStars] = useState(0);
    const [sortOption, setSortOption] = useState<string>('appearance');

    const filteredWeapons = weapons.filter((weapon) => {
        const matchesSearch = weapon.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesWeaponType = type ? weapon.type === type : true;
        const matchesRarity = selectedStars > 0 ? weapon.rare === selectedStars.toString() : true;

        return matchesSearch && matchesWeaponType && matchesRarity;
    });

    const sortedWeapons = filteredWeapons.sort((a, b) => {
        switch (sortOption) {
            case 'rare':
                return parseInt(b.rare) - parseInt(a.rare);
            case 'appearance':
                return b.appearanceVersion - a.appearanceVersion;
            default:
                return a.title.localeCompare(b.title);
        }
    });

    return (
        <>
            <Input
                placeholder={'Введите название оружия'}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={'text-center border-gray-500'}
            />
            <div className={'flex justify-between tracking-wide'}>
                <WeaponTypePicker activeWeaponType={type} setActiveWeaponType={setType} />
                <Separator className={'h-20 bg-black self-end'} orientation={'vertical'} />
                <div>
                    <p>Редкость:</p>
                    <div className={'flex gap-2 mt-2'}>
                        {Array.from(Array(5).keys()).map((number) => (
                            <Star
                                key={number}
                                className={`size-10 transition hover:scale-105 ${selectedStars > number ? 'scale-105 fill-black' : 'scale-100'}`}
                                onClick={() =>
                                    setSelectedStars(selectedStars === number + 1 ? 0 : number + 1)
                                }
                            />
                        ))}
                    </div>
                </div>
                <Separator className={'h-20 bg-black self-end'} orientation={'vertical'} />
                <Label className={'text-base w-1/4'}>
                    Сортировать по:
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className={'border-gray-500 mt-3'}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'appearance'}>Версия выхода</SelectItem>
                            <SelectItem value={'title'}>Название</SelectItem>
                            <SelectItem value={'rare'}>Редкость</SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
            </div>
            <ScrollArea className={'h-[71%] pr-2'}>
                <div className={'flex flex-wrap pt-2 gap-2'}>
                    {sortedWeapons.map((weapon) => (
                        <Link
                            key={weapon.title}
                            href={`weapons/${weapon.title}`}
                            className={
                                'relative w-[10.45%] h-[9.8rem] flex flex-col justify-end rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
                            }
                        >
                            <Image
                                src={`common/items-backgrounds-by-rarity/background-item-${weapon.rare}-star.webp`}
                                alt={weapon.rare}
                                fill
                                className={'object-contain object-top'}
                            />
                            <Image
                                src={`weapons/portraits/${weapon.title}.webp`}
                                alt={weapon.title}
                                fill
                                className={'object-contain object-top'}
                            />
                            <div className={'w-full flex gap-0.5 py-1 items-center justify-center'}>
                                <Image
                                    src={`weapons/icons/${weapon.type}.webp`}
                                    alt={weapon.type}
                                    width={30}
                                    height={30}
                                    className={
                                        'contrast-200 brightness-150 drop-shadow-[0_1px_5px_#000000]'
                                    }
                                />
                                <p className={'text-sm whitespace-nowrap truncate'}>
                                    {weapon.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default WeaponList;
