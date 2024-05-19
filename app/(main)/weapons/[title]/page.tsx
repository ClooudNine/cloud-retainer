import { Metadata } from 'next';
import { ChevronsUp, Frown, Leaf, ScrollText, Swords } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getWeaponBySlug } from '@/data/weapon';
import Image from 'next/image';
import BackButton from '@/components/main/back-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { getCharacterAsset } from '@/lib/character';
import RarityStars from '@/components/main/rarity-stars';
import InformationCard from '@/components/characters/information-card';
import MaterialCard from '@/components/characters/material-card';

export async function generateMetadata({ params }: { params: { title: string } }): Promise<Metadata> {
    const weapon = await getWeaponBySlug(params.title);

    if (!weapon) {
        return {
            title: `Cloud Retainer | Оружие - Оружие не найдено!`,
            description: `Оружие не найдено! Проверьте правильность написания запроса.`,
        };
    }

    return {
        title: `Cloud Retainer | Оружие - ${weapon.title}`,
        description: `Оружие ${weapon.title}. Характеристики, материалы для улучшения, кому лучше всего подходит.`,
    };
}

export default async function WeaponPage({ params }: { params: { title: string } }) {
    const weapon = await getWeaponBySlug(params.title);

    if (!weapon) {
        return (
            <section className={'space-y-4 text-center m-auto'}>
                <Frown className={'mx-auto size-44 xs:size-28'} />
                <h1 className={'text-5xl xs:text-3xl'}>Оружие не найдено!</h1>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'max-xs:p-8 max-xs:text-2xl max-xs:rounded-xl',
                        })
                    )}
                    href={'/weapons'}
                >
                    Назад к списку оружия
                </Link>
            </section>
        );
    }

    return (
        <section
            className={
                'w-full overflow-x-hidden flex flex-col gap-2 px-4 pt-8 max-xs:h-3/4 xs:pt-4 max-xl:items-center xl:flex-1'
            }
        >
            <div className={'flex gap-4 text-5xl xs:text-3xl'}>
                <BackButton className={'h-1/2'} />
                <Image
                    src={`weapons/icons/${weapon.type}.webp`}
                    alt={weapon.type}
                    width={75}
                    height={75}
                    className={'-mr-4 -mt-4 saturate-200 size-20'}
                />
                <div>
                    <h1>{weapon.title}</h1>
                    <h2 className={'text-gray-400 text-xl xs:text-lg'}>{weapon.type}</h2>
                    <RarityStars rare={weapon.rare} />
                </div>
            </div>
            <div
                className={
                    '-z-10 relative size-full min-h-[40rem] animate-banner-preview-appearance xl:absolute xl:left-[40%]'
                }
            >
                <Image
                    src={`weapons/backgrounds/${weapon.type}-background.webp`}
                    alt={`Фон оружия ${weapon.type}`}
                    fill
                    className={'object-contain'}
                />
                <Image
                    src={`weapons/splash-arts/${weapon.title}.webp`}
                    alt={weapon.title}
                    fill
                    className={'object-contain'}
                />
            </div>
            <InformationCard
                cardClasses={'xl:flex-1 xl:w-[70%]'}
                title={'Описание способности'}
                icon={<ScrollText className={'h-full w-auto'} />}
                contentClasses={'h-3/4'}
                content={
                    <ScrollArea className={'h-full text-center italic max-xl:text-2xl'}>
                        {weapon.ability}
                    </ScrollArea>
                }
            />
            <InformationCard
                cardClasses={'w-full xl:flex-1 xl:w-[70%]'}
                title={'Подходит данным персонажам'}
                icon={<ChevronsUp className={'h-full w-auto'} />}
                contentClasses={'h-fit flex flex-wrap gap-2 xl:h-[calc(100%-2.5rem)]'}
                content={weapon.characters.map((character) => {
                    const currentCharacter = character.character;
                    return (
                        <Link
                            key={currentCharacter.name}
                            href={`/characters/${currentCharacter.slug}`}
                            className={
                                'rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5 max-xs:w-[32%] xs:flex-1 max-xl:h-48 '
                            }
                        >
                            <div className={'relative w-full h-3/4'}>
                                <Image
                                    src={`common/items-backgrounds-by-rarity/background-item-${currentCharacter.rare}-star.webp`}
                                    alt={currentCharacter.rare}
                                    fill
                                    className={'object-cover'}
                                />
                                <Image
                                    src={`characters/profiles/${getCharacterAsset(currentCharacter.name)}.webp`}
                                    alt={currentCharacter.name}
                                    fill
                                    className={'object-contain object-bottom'}
                                />
                            </div>
                            <div className={'h-1/4 flex items-center justify-center gap-1'}>
                                <Image
                                    src={`common/elements/${currentCharacter.element}.svg`}
                                    alt={currentCharacter.element}
                                    width={30}
                                    height={30}
                                    className={
                                        'size-10 contrast-200 drop-shadow-[0_1px_5px_#000000] xl:size-6'
                                    }
                                />
                                <p className={'text-lg truncate xl:text-sm'}>{currentCharacter.name}</p>
                            </div>
                        </Link>
                    );
                })}
            />
            <div className={'flex gap-2 w-full max-xl:flex-col xl:w-[70%] xl:flex-1'}>
                <InformationCard
                    cardClasses={'h-full xl:w-3/5'}
                    title={'Материалы'}
                    icon={<Leaf className={'h-full w-auto'} />}
                    contentClasses={'h-3/4 flex justify-between gap-2 max-xl:text-2xl'}
                    content={
                        <>
                            <MaterialCard
                                title={weapon.ascensionMaterial.name}
                                icon={
                                    <Image
                                        src={`common/materials/ascension-materials/${weapon.ascensionMaterial.name}.webp`}
                                        alt={weapon.ascensionMaterial.name}
                                        width={90}
                                        height={90}
                                        className={'size-32 xl:size-16'}
                                    />
                                }
                            />
                            <MaterialCard
                                title={weapon.firstEnhancementMaterial.name}
                                icon={
                                    <Image
                                        src={`common/materials/enhancement-materials/${weapon.firstEnhancementMaterial.name}.webp`}
                                        alt={weapon.firstEnhancementMaterial.name}
                                        width={90}
                                        height={90}
                                        className={'size-32 xl:size-16'}
                                    />
                                }
                            />
                            <MaterialCard
                                title={weapon.secondEnhancementMaterial.name}
                                icon={
                                    <Image
                                        src={`common/materials/enhancement-materials/${weapon.secondEnhancementMaterial.name}.webp`}
                                        alt={weapon.secondEnhancementMaterial.name}
                                        width={90}
                                        height={90}
                                        className={'size-32 xl:size-16'}
                                    />
                                }
                            />
                        </>
                    }
                />
                <InformationCard
                    cardClasses={'h-full xl:w-2/5'}
                    title={'Характеристики'}
                    icon={<Swords className={'h-full w-auto'} />}
                    contentClasses={'h-fit flex justify-between gap-2 text-center max-xl:text-2xl xl:h-3/4'}
                    content={
                        <>
                            <div
                                className={
                                    'flex-1 border bg-card shadow rounded-xl content-center max-xl:py-4'
                                }
                            >
                                <h3 className={'text-2xl'}>{weapon.baseAttack}</h3>
                                Сила атаки
                            </div>
                            <div
                                className={
                                    'flex-1 border bg-card shadow rounded-xl content-center max-xl:py-4'
                                }
                            >
                                <h3 className={'text-2xl'}>
                                    {weapon.additionalCharacteristicStat} {weapon.additionalCharacteristic}%
                                </h3>
                                Доп. хар-ка
                            </div>
                        </>
                    }
                />
            </div>
        </section>
    );
}
