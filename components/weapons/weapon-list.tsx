'use client';
import { Weapon, WeaponType } from '@/lib/types';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import WeaponTypePicker from '@/components/weapons/weapon-type-picker';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/navigation';
import Image from 'next/image';
import RarePicker from '@/components/weapons/rare-picker';
import { useTranslations } from 'next-intl';

const WeaponList = ({ weapons }: { weapons: Weapon[] }) => {
    const t = useTranslations();

    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState<WeaponType | null>(null);
    const [selectedStars, setSelectedStars] = useState(0);
    const [sortOption, setSortOption] = useState<string>('appearance');

    const filteredWeapons = useMemo(() => {
        return weapons.filter((weapon) => {
            const matchesSearch = t(`weapons.${weapon.title}.title`)
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesWeaponType = type ? weapon.type === type : true;
            const matchesRarity = selectedStars > 0 ? weapon.rare === selectedStars.toString() : true;

            return matchesSearch && matchesWeaponType && matchesRarity;
        });
    }, [searchQuery, selectedStars, t, type, weapons]);

    const sortedWeapons = useMemo(() => {
        const sortOptions: Record<string, (a: Weapon, b: Weapon) => number> = {
            appearance: (a: Weapon, b: Weapon) => b.appearanceVersion - a.appearanceVersion,
            rare: (a: Weapon, b: Weapon) => parseInt(b.rare) - parseInt(a.rare),
            title: (a: Weapon, b: Weapon) =>
                t(`weapons.${a.title}.title`).localeCompare(t(`weapons.${b.title}.title`)),
        };
        return [...filteredWeapons].sort(sortOptions[sortOption]);
    }, [filteredWeapons, sortOption, t]);

    return (
        <>
            <Input
                placeholder={t('main.type-weapon')}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={'text-center border-gray-500 max-xs:h-14 max-xs:text-2xl'}
            />
            <div
                className={
                    'flex flex-wrap justify-between tracking-wide max-xs:gap-2 max-xs:text-3xl max-xs:flex-col'
                }
            >
                <RarePicker stars={selectedStars} setStars={setSelectedStars} />
                <WeaponTypePicker activeWeaponType={type} setActiveWeaponType={setType} />
                <Label className={'max-xs:text-3xl xs:w-1/4'}>
                    {t('main.sorted-by')}:
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className={'max-xs:text-xl border-gray-500 mt-3'}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className={'max-xs:text-xl'} value={'appearance'}>
                                {t('main.appearance-version')}
                            </SelectItem>
                            <SelectItem className={'max-xs:text-xl'} value={'title'}>
                                {t('main.weapon-title')}
                            </SelectItem>
                            <SelectItem className={'max-xs:text-xl'} value={'rare'}>
                                {t('main.rare')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
            </div>
            <ScrollArea className={'flex-1 pr-2'}>
                <div className={'flex flex-wrap pt-2 gap-2'}>
                    {sortedWeapons.map((weapon) => (
                        <Link
                            key={weapon.title}
                            href={`weapons/${weapon.slug}`}
                            className={
                                'relative w-[calc(25%-0.5rem)] rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5 xs:w-[calc(16.66%-0.5rem)] lg:w-[calc(10%-0.5rem)]'
                            }
                        >
                            <Image
                                src={`common/items-backgrounds-by-rarity/background-item-${weapon.rare}-star.webp`}
                                alt={weapon.rare}
                                width={256}
                                height={256}
                                className={'w-full'}
                            />
                            <Image
                                src={`weapons/portraits/${weapon.title}.webp`}
                                alt={t(`weapons.${weapon.title}.title`)}
                                fill
                                className={'object-contain object-top'}
                            />
                            <div className={'w-full flex gap-0.5 py-1 items-center justify-center'}>
                                <Image
                                    src={`weapons/icons/${weapon.type}.webp`}
                                    alt={t(`weapon-types.${weapon.type}`)}
                                    width={30}
                                    height={30}
                                    className={
                                        'size-10 contrast-200 brightness-150 drop-shadow-[0_1px_5px_#000000] xs:size-6'
                                    }
                                />
                                <p className={'text-lg whitespace-nowrap truncate xs:text-sm'}>
                                    {t(`weapons.${weapon.title}.title`)}
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
