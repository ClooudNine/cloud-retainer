import Image from 'next/image';
import BackButton from '@/components/main/back-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowRight,
    ArrowRightCircle,
    Check,
    ChevronsUp,
    Cross,
    Crown,
    Frown,
    Info,
    Leaf,
    ScrollText,
    Sparkle,
    Swords,
    X,
    Zap,
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import { getCharacterByName } from '@/data/character';
import { getCharacterAsset } from '@/lib/character';
import { elementToColor } from '@/lib/constants';
import { CSSProperties } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn, toTitle } from '@/lib/utils';
import RarityStars from '@/components/main/rarity-stars';

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
    const correctName = toTitle(params.name);

    return {
        title: `Cloud Retainer | Персонажи - ${correctName}`,
        description: `Персонаж ${correctName}. Основная информация, характеристики, таланты, созвездия, сборки.`,
    };
}

export default async function CharacterPage({ params }: { params: { name: string } }) {
    const correctName = toTitle(params.name);
    const character = await getCharacterByName(correctName);

    if (!character) {
        return (
            <section
                className={'flex flex-col gap-4 items-center justify-center my-auto mx-auto self-center'}
            >
                <Frown className={'size-44 sm:size-28'} />
                <h1 className={'text-5xl sm:text-3xl'}>Персонаж не найден!</h1>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'max-sm:p-8 max-sm:text-2xl max-sm:rounded-xl',
                        })
                    )}
                    href={'/characters'}
                >
                    Назад к списку персонажей
                </Link>
            </section>
        );
    }

    return (
        <section className={'flex-1 flex flex-col px-4 pt-4 space-y-4 sm:pt-1'}>
            <Image
                src={`characters/splash-arts/${getCharacterAsset(character.name)}.webp`}
                alt={character.name}
                fill
                className={
                    '-z-10 -mt-[20%] animate-banner-preview-appearance object-contain pointer-events-none sm:ml-[40%]'
                }
            />
            <div className={'flex justify-center gap-4 text-5xl sm:text-3xl'}>
                <BackButton />
                <Image
                    src={`common/elements/${character.element}.svg`}
                    alt={character.element}
                    width={75}
                    height={75}
                    className={'-mr-4 -mt-4 saturate-200 size-20'}
                />
                <div>
                    <h1>{character.name}</h1>
                    <h2 className={'text-gray-400 text-xl sm:text-lg'}>{character.title}</h2>
                    <RarityStars rare={character.rare} />
                </div>
            </div>
            <Tabs defaultValue={'main'} className={'flex-1 w-full xs:w-[65%]'}>
                <TabsList className={'grid w-full grid-cols-4 bg-gray-200'}>
                    <TabsTrigger value={'main'}>Основная информация</TabsTrigger>
                    <TabsTrigger value={'talents'}>Таланты</TabsTrigger>
                    <TabsTrigger value={'constellations'}>Созвездия</TabsTrigger>
                    <TabsTrigger value={'build'}>Сборка</TabsTrigger>
                </TabsList>
                <TabsContent className={'h-full space-y-1.5'} value={'main'}>
                    <Card className={'h-[30%]'}>
                        <CardHeader className={'py-2 items-center'}>
                            <CardTitle className={'flex items-center gap-2 text-xl'}>
                                <ScrollText className={'size-6'} /> Описание{' '}
                                <ScrollText className={'size-6'} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'h-3/4 pb-2 text-center leading-snug'}>
                            <ScrollArea className={'h-full italic'}>{character.description}</ScrollArea>
                        </CardContent>
                    </Card>
                    <Card className={'h-2/5'}>
                        <CardHeader className={'py-2 items-center'}>
                            <CardTitle className={'flex items-center gap-2 text-xl'}>
                                <Zap className={'size-6'} /> Характеристики <Zap className={'size-6'} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'p-2 flex justify-between'}>
                            <Card>
                                <CardHeader className={'p-2 text-center'}>
                                    <CardTitle>Тип оружия</CardTitle>
                                </CardHeader>
                                <CardContent className={'pb-0'}>
                                    <Image
                                        src={`weapons/icons/${character.weaponType}.webp`}
                                        alt={character.weaponType}
                                        width={80}
                                        height={80}
                                        className={'size-12 mx-auto'}
                                    />
                                </CardContent>
                                <CardFooter className={'p-2 justify-center'}>
                                    {character.weaponType}
                                </CardFooter>
                            </Card>
                            <Card className={'flex flex-col items-center justify-between p-2'}>
                                <CardHeader className={'p-0'}>
                                    <CardTitle>Базовая атака</CardTitle>
                                </CardHeader>
                                <CardContent className={'p-0'}>
                                    <Swords className={'size-12'} />
                                </CardContent>
                                <CardFooter className={'p-0'}>{character.baseAttack}</CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className={'p-2'}>
                                    <CardTitle>Базовое HP</CardTitle>
                                </CardHeader>
                                <CardContent className={'p-0'}>
                                    <Cross className={'size-12 mx-auto'} />
                                </CardContent>
                                <CardFooter className={'p-2 justify-center'}>{character.baseHp}</CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className={'p-2 text-center'}>
                                    <CardTitle>Версия выхода</CardTitle>
                                </CardHeader>
                                <CardContent
                                    className={'mx-auto size-12 border-4 border-black rounded-xl p-2'}
                                >
                                    {character.appearanceVersion.version}
                                </CardContent>
                                <CardFooter className={'p-2 justify-center'}>
                                    {character.appearanceVersion.date.toLocaleDateString()}
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className={'p-2'}>
                                    <CardTitle>Стандарт?</CardTitle>
                                </CardHeader>
                                <CardContent
                                    className={`flex justify-center items-center p-0 mx-auto text-white rounded-xl size-12 ${character.inStandardWish ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {character.inStandardWish ? 'Да' : 'Нет'}
                                </CardContent>
                                <CardFooter className={'p-2 justify-center'}>
                                    {character.inStandardWish ? (
                                        <Check className={'size-6'} />
                                    ) : (
                                        <X className={'size-6'} />
                                    )}
                                </CardFooter>
                            </Card>
                        </CardContent>
                        <CardFooter className={'pb-2 text-destructive justify-center'}>
                            Характеристики указаны для персонажа с 90-ым уровнем
                        </CardFooter>
                    </Card>
                    <Card className={'h-[30%]'}>
                        <CardHeader className={'py-2 items-center'}>
                            <CardTitle className={'flex items-center gap-2 text-xl'}>
                                <Leaf className={'size-6'} /> Материалы <Leaf className={'size-6'} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'flex justify-between pb-2'}>
                            <div className={'border bg-card shadow p-2 rounded-xl'}>
                                <div className={'flex justify-center items-center gap-2'}>
                                    <Image
                                        src={`common/bosses/profiles/${character.boss.name}.webp`}
                                        alt={character.boss.name}
                                        width={90}
                                        height={90}
                                        className={'size-16 rounded-full'}
                                    />
                                    <ArrowRight className={'size-8'} />
                                    <Image
                                        src={`common/bosses/drop/${character.boss.drop.name}.webp`}
                                        alt={character.boss.drop.name}
                                        width={90}
                                        height={90}
                                        className={'size-16'}
                                    />
                                </div>
                                <p>{character.boss.name}</p>
                            </div>
                            <div className={'border bg-card shadow p-2 rounded-xl'}>
                                <Image
                                    src={`common/materials/books/${character.talentMaterial.name}.webp`}
                                    alt={character.talentMaterial.name}
                                    width={90}
                                    height={90}
                                    className={'size-16 mx-auto'}
                                />
                                <p>{character.talentMaterial.name}</p>
                            </div>
                            <div className={'border bg-card shadow p-2 rounded-xl'}>
                                <Image
                                    src={`common/materials/local-specialities/${character.localSpecialty.name}.webp`}
                                    alt={character.localSpecialty.name}
                                    width={90}
                                    height={90}
                                    className={'size-16 mx-auto'}
                                />
                                <p>{character.localSpecialty.name}</p>
                            </div>
                            <div className={'border bg-card shadow p-2 rounded-xl'}>
                                <Image
                                    src={`common/materials/enhancement-materials/${character.enhancementMaterial.name}.webp`}
                                    alt={character.enhancementMaterial.name}
                                    width={90}
                                    height={90}
                                    className={'size-16 mx-auto'}
                                />
                                <p>{character.enhancementMaterial.name}</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value={'talents'} className={'h-full space-y-1.5'}>
                    <h3
                        className={
                            'flex items-center justify-center gap-2 bg-card shadow mx-auto rounded-lg text-destructive p-2'
                        }
                    >
                        <Info className={'size-6'} /> Для получения подробной информации нажмите на талант
                    </h3>
                    {character.talents.map((talent) => (
                        <AlertDialog key={talent.title}>
                            <AlertDialogTrigger asChild>
                                <Card
                                    style={
                                        {
                                            '--element-color': elementToColor[character.element],
                                        } as CSSProperties
                                    }
                                    className={
                                        'group flex items-center justify-between transition duration-500 hover:border-[rgb(var(--element-color))] hover:bg-[rgb(var(--element-color))] hover:translate-x-3 hover:text-white'
                                    }
                                >
                                    <CardHeader className={'py-2 items-center'}>
                                        <CardTitle>
                                            <Image
                                                src={`characters/talents/${talent.type === 'Normal Attack' ? character.weaponType + ' ' + character.element : talent.title}.webp`}
                                                alt={talent.title}
                                                width={80}
                                                height={80}
                                                className={'transition duration-500 group-hover:animate-flip'}
                                            />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className={'py-2 text-center'}>
                                        <p>{talent.title}</p>
                                        <p className={'text-muted-foreground'}>{talent.type}</p>
                                    </CardContent>
                                    <CardFooter className={'py-2'}>
                                        <ArrowRightCircle className={'size-8 group-hover:stroke-white'} />
                                    </CardFooter>
                                </Card>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className={'flex justify-between'}>
                                        {talent.title}
                                        <Image
                                            src={`characters/talents/${talent.type === 'Normal Attack' ? character.weaponType + ' ' + character.element : talent.title}.webp`}
                                            alt={talent.title}
                                            width={80}
                                            height={80}
                                            className={'absolute top-2 right-2'}
                                        />
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {character.name} - {talent.type}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div
                                    style={
                                        {
                                            '--element-color': elementToColor[character.element],
                                        } as CSSProperties
                                    }
                                    dangerouslySetInnerHTML={{ __html: talent.description }}
                                    className={'[&_em]:not-italic [&_em]:text-[rgb(var(--element-color))]'}
                                ></div>
                                <AlertDialogFooter>
                                    <AlertDialogAction>Назад</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    ))}
                </TabsContent>
                <TabsContent value={'constellations'} className={'h-full space-y-1.5'}>
                    <div className={'flex gap-2 h-full'}>
                        <div className={'w-3/5 flex flex-wrap gap-1 justify-between'}>
                            {character.constellations
                                .sort((c1, c2) => c1.level - c2.level)
                                .map((constellation) => (
                                    <AlertDialog key={constellation.title}>
                                        <AlertDialogTrigger asChild>
                                            <Card
                                                style={
                                                    {
                                                        '--element-color': elementToColor[character.element],
                                                    } as CSSProperties
                                                }
                                                className={
                                                    'w-[49.5%] group transition duration-500 hover:border-[rgb(var(--element-color))] hover:bg-[rgb(var(--element-color))] hover:scale-105 hover:text-white'
                                                }
                                            >
                                                <CardHeader className={'py-2 items-center'}>
                                                    <CardTitle>
                                                        <Image
                                                            src={`characters/constellations/${constellation.title}.webp`}
                                                            alt={constellation.title}
                                                            width={80}
                                                            height={80}
                                                            className={
                                                                'size-16 transition duration-500 group-hover:animate-flip'
                                                            }
                                                        />
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className={'py-2 text-center'}>
                                                    <p>{constellation.title}</p>
                                                    <p className={'text-muted-foreground'}>
                                                        Level {constellation.level}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className={'flex justify-between'}>
                                                    {constellation.title}
                                                    <Image
                                                        src={`characters/constellations/${constellation.title}.webp`}
                                                        alt={constellation.title}
                                                        width={80}
                                                        height={80}
                                                        className={'absolute top-2 right-2'}
                                                    />
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Level {constellation.level}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div
                                                style={
                                                    {
                                                        '--element-color': elementToColor[character.element],
                                                    } as CSSProperties
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: constellation.description,
                                                }}
                                                className={
                                                    '[&_em]:not-italic [&_em]:text-[rgb(var(--element-color))]'
                                                }
                                            ></div>
                                            <AlertDialogFooter>
                                                <AlertDialogAction>Назад</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ))}
                        </div>
                        <div className={'relative bg-card w-2/5 h-full shadow rounded-xl'}>
                            <Image
                                src={`characters/constellations/${character.constellation}.webp`}
                                alt={character.constellation}
                                fill
                                className={
                                    'drop-shadow-[0_1px_1px_rgba(0,0,0,1)] object-contain saturate-200'
                                }
                            />
                            <h3 className={'flex items-center justify-center gap-2 mt-[150%]'}>
                                <Sparkle className={'size-6'} /> Созвездие: {character.constellation}{' '}
                                <Sparkle className={'size-6'} />
                            </h3>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value={'build'} className={'h-full space-y-1.5'}>
                    <Card>
                        <CardHeader className={'py-2'}>
                            <CardTitle className={'flex items-center gap-2 text-xl'}>
                                <Swords className={'size-6'} /> Топ оружия <Swords className={'size-6'} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'flex gap-4 pb-2'}>
                            {character.weapons
                                .sort((w1, w2) => w1.rating - w2.rating)
                                .map((ratingWeapon) => {
                                    const weapon = ratingWeapon.weapon;
                                    return (
                                        <Link
                                            key={weapon.title}
                                            href={`/weapons/${weapon.title}`}
                                            className={
                                                'flex-1 h-44 flex flex-col justify-end relative rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
                                            }
                                        >
                                            <p
                                                className={
                                                    'z-10 absolute top-2 left-2 flex justify-center items-center p-1 size-5 rounded-full ring-2 ring-white text-white'
                                                }
                                            >
                                                {ratingWeapon.rating}
                                            </p>
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
                                            <div
                                                className={
                                                    'h-1/4 flex justify-center items-center text-center text-sm'
                                                }
                                            >
                                                {weapon.title}
                                            </div>
                                        </Link>
                                    );
                                })}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className={'py-2'}>
                            <CardTitle className={'flex items-center gap-2 text-xl'}>
                                <Crown className={'size-6'} /> Топ артефактов <Crown className={'size-6'} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'flex gap-4 pb-2'}>
                            {character.artifacts
                                .sort((a1, a2) => a1.rating - a2.rating)
                                .map((ratingArtifact) => {
                                    const firstSet = ratingArtifact.firstArtifactSet;
                                    const secondSet = ratingArtifact.secondArtifactSet;
                                    return (
                                        <div
                                            key={firstSet.title}
                                            className={
                                                'flex-1 h-44 flex flex-col justify-end relative rounded-2xl bg-gray-300 overflow-hidden'
                                            }
                                        >
                                            <p
                                                className={
                                                    'z-10 absolute top-2 left-2 flex justify-center items-center p-1 size-5 rounded-full ring-2 ring-white text-white'
                                                }
                                            >
                                                {ratingArtifact.rating}
                                            </p>
                                            <Image
                                                src={`common/items-backgrounds-by-rarity/background-item-5-star.webp`}
                                                alt={'5'}
                                                fill
                                                className={'object-contain object-top'}
                                            />
                                            <Image
                                                src={`common/artifacts/${firstSet.title}.webp`}
                                                alt={firstSet.title}
                                                fill
                                                className={'object-contain object-top'}
                                            />
                                            <div
                                                className={
                                                    'h-1/4 flex justify-center items-center text-center text-sm'
                                                }
                                            >
                                                {firstSet.title}
                                            </div>
                                        </div>
                                    );
                                })}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className={'py-2'}>
                            <CardTitle className={'flex items-center gap-2 text-xl'}>
                                <ChevronsUp className={'size-6'} /> Порядок прокачки талантов{' '}
                                <ChevronsUp className={'size-6'} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'flex justify-around items-center pb-2'}>
                            {character.talents
                                .filter((talent) => talent.priority !== null)
                                .sort((t1, t2) => Number(t1.priority) - Number(t2.priority))
                                .map((talent, index) => (
                                    <>
                                        <div className={'relative'}>
                                            <p
                                                className={
                                                    'z-10 absolute top-2 left-2 flex justify-center items-center p-1 size-5 rounded-full ring-2 ring-black'
                                                }
                                            >
                                                {talent.priority}
                                            </p>
                                            <Image
                                                key={talent.title}
                                                src={`characters/talents/${talent.type === 'Normal Attack' ? character.weaponType + ' ' + character.element : talent.title}.webp`}
                                                alt={talent.title}
                                                width={80}
                                                height={80}
                                                className={'mx-auto'}
                                            />
                                            <p>{talent.type}</p>
                                        </div>
                                        {index !== 2 && <ArrowRight className={'size-12'} />}
                                    </>
                                ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    );
}
