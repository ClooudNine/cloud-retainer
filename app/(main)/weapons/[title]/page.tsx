import { Metadata } from 'next';
import { ChevronsUp, Frown, Leaf, ScrollText, Swords } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getWeaponByTitle } from '@/data/weapon';
import Image from 'next/image';
import BackButton from '@/components/main/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toLink } from '@/lib/utils';
import { getCharacterAsset } from '@/lib/character';

export async function generateMetadata({
    params,
}: {
    params: { title: string };
}): Promise<Metadata> {
    return {
        title: `Cloud Retainer | Оружие - ${params.title}`,
        description: `Оружие ${params.title}. Характеристики, материалы для улучшения, кому лучше всего подходит.`,
    };
}

export default async function WeaponPage({ params }: { params: { title: string } }) {
    console.log(params.title);
    const weapon = await getWeaponByTitle(params.title.replaceAll('%20', ' '));

    if (!weapon) {
        return (
            <section className={'flex flex-col gap-4 items-center mx-auto self-center'}>
                <Frown className={'size-28'} />
                <h1 className={'text-3xl'}>Оружие не найдено!</h1>
                <Link href={'/weapons'}>
                    <Button>Назад к списку оружия</Button>
                </Link>
            </section>
        );
    }

    return (
        <section className={'flex-1 px-4 pt-1 space-y-3'}>
            <Image
                src={`weapons/splash-arts/${weapon.title}.webp`}
                alt={weapon.title}
                fill
                className={
                    '-z-10 drop-shadow-[10px_22px_1px_rgba(0,0,0,1)] animate-banner-preview-appearance object-contain pointer-events-none ml-[40%]'
                }
            />
            <Image
                src={`weapons/backgrounds/${weapon.type}-background.webp`}
                alt={'Фон оружия'}
                draggable={false}
                fill
                className={
                    '-z-20 animate-banner-preview-appearance object-contain pointer-events-none ml-[40%]'
                }
            />
            <div className={'flex gap-4 text-3xl'}>
                <BackButton />
                <Image
                    src={`weapons/icons/${weapon.type}.webp`}
                    alt={weapon.type}
                    width={125}
                    height={50}
                    className={'size-20 -mr-4 -mt-4 saturate-200'}
                />
                <div>
                    <h1>{weapon.title}</h1>
                    <h2 className={'text-gray-400 text-lg'}>{weapon.type}</h2>
                    <div className={'flex gap-0.5'}>
                        {Array.from(Array(Number(weapon.rare)).keys()).map((number) => (
                            <Image
                                key={number}
                                src={'common/star.webp'}
                                alt={'Звезда'}
                                width={25}
                                height={25}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Card className={'w-[70%] h-1/4'}>
                <CardHeader className={'py-2 items-center'}>
                    <CardTitle className={'flex items-center gap-2 text-xl'}>
                        <ScrollText className={'size-6'} /> Описание способности{' '}
                        <ScrollText className={'size-6'} />
                    </CardTitle>
                </CardHeader>
                <CardContent className={'h-3/4 pb-2 text-center leading-snug'}>
                    <ScrollArea className={'h-full italic'}>{weapon.ability}</ScrollArea>
                </CardContent>
            </Card>
            <Card className={'w-[70%] h-[30%]'}>
                <CardHeader className={'py-2 items-center'}>
                    <CardTitle className={'flex items-center gap-2 text-xl'}>
                        <ChevronsUp className={'size-6'} /> Подходит данным персонажам{' '}
                        <ChevronsUp className={'size-6'} />
                    </CardTitle>
                </CardHeader>
                <CardContent className={'pb-2 flex gap-2 h-[80%]'}>
                    {weapon.characters.map((character) => {
                        const currentCharacter = character.character;
                        return (
                            <Link
                                key={currentCharacter.name}
                                href={`/characters/${toLink(currentCharacter.name)}`}
                                className={
                                    'relative flex-1 flex flex-col items-center justify-end rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
                                }
                            >
                                <Image
                                    src={`common/items-backgrounds-by-rarity/background-item-${currentCharacter.rare}-star.webp`}
                                    alt={currentCharacter.rare}
                                    fill
                                    className={'max-h-[83%] object-cover object-top'}
                                />
                                <Image
                                    src={`characters/profiles/${getCharacterAsset(currentCharacter.name)}.webp`}
                                    alt={currentCharacter.name}
                                    fill
                                    className={'max-h-[83%] object-cover object-top'}
                                />
                                <div className={'flex gap-0.5 py-1'}>
                                    <Image
                                        src={`common/elements/${currentCharacter.element}.svg`}
                                        alt={currentCharacter.element}
                                        width={30}
                                        height={30}
                                        className={'contrast-200 drop-shadow-[0_1px_5px_#000000]'}
                                    />
                                    <p className={'text-sm whitespace-nowrap truncate'}>
                                        {currentCharacter.name}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </CardContent>
            </Card>
            <div className={'flex w-[70%] h-[25%] gap-2'}>
                <Card className={'w-[60%]'}>
                    <CardHeader className={'py-2 items-center'}>
                        <CardTitle className={'flex items-center gap-2 text-xl'}>
                            <Leaf className={'size-6'} /> Материалы <Leaf className={'size-6'} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={'flex gap-2 pb-2'}>
                        <div className={'border bg-card shadow px-1 rounded-xl text-center'}>
                            <Image
                                src={`common/materials/ascension-materials/${weapon.ascensionMaterial.name}.webp`}
                                alt={weapon.ascensionMaterial.name}
                                width={90}
                                height={90}
                                className={'rounded-full'}
                            />
                            <p>{weapon.ascensionMaterial.name}</p>
                        </div>
                        <div className={'border bg-card shadow px-1 rounded-xl text-center'}>
                            <Image
                                src={`common/materials/enhancement-materials/${weapon.firstEnhancementMaterial.name}.webp`}
                                alt={weapon.firstEnhancementMaterial.name}
                                width={90}
                                height={90}
                                className={'mx-auto'}
                            />
                            <p>{weapon.firstEnhancementMaterial.name}</p>
                        </div>
                        <div className={'border bg-card shadow px-1 rounded-xl text-center'}>
                            <Image
                                src={`common/materials/enhancement-materials/${weapon.secondEnhancementMaterial.name}.webp`}
                                alt={weapon.secondEnhancementMaterial.name}
                                width={90}
                                height={90}
                                className={'mx-auto'}
                            />
                            <p>{weapon.secondEnhancementMaterial.name}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className={'w-[40%]'}>
                    <CardHeader className={'py-2 items-center'}>
                        <CardTitle className={'flex items-center gap-2 text-xl'}>
                            <Swords className={'size-6'} /> Характеристики{' '}
                            <Swords className={'size-6'} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={'flex gap-2 pb-2 h-[70%]'}>
                        <div
                            className={
                                'flex-1 h-full flex flex-col justify-center border bg-card shadow rounded-xl text-center'
                            }
                        >
                            <h3 className={'text-2xl'}>{weapon.baseAttack}</h3>
                            <p>Сила атаки</p>
                        </div>
                        <div
                            className={
                                'flex-1 h-full border flex flex-col justify-center bg-card shadow rounded-xl text-center'
                            }
                        >
                            <h3 className={'text-2xl'}>
                                {weapon.additionalCharacteristicStat}{' '}
                                {weapon.additionalCharacteristic}%
                            </h3>
                            <p>Доп. стат</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
