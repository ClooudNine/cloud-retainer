import Image from 'next/image';
import BackButton from '@/components/main/back-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowRight,
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
import { Metadata } from 'next';
import { getCharacterBySlug } from '@/data/character';
import { getCharacterAsset } from '@/lib/character';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import RarityStars from '@/components/main/rarity-stars';
import CharacteristicCard from '@/components/characters/characteristic-card';
import MaterialCard from '@/components/characters/material-card';
import InformationCard from '@/components/characters/information-card';
import TalentModal from '@/components/characters/talent-modal';
import ConstellationModal from '@/components/characters/constellation-modal';
import { elementToColor } from '@/lib/constants';
import { CSSProperties, Fragment } from 'react';
import ArtifactCard from '@/components/characters/artifact-card';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
    params: { locale, name },
}: {
    params: { locale: string; name: string };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'metadata.character-page' });
    const character = await getCharacterBySlug(name, locale);

    const title = character ? t('title', { name: character.name }) : t('error-title');

    const description = character ? t('description', { name: character.name }) : t('error-description');

    return { title, description };
}

export default async function CharacterPage({
    params: { locale, name },
}: {
    params: { locale: string; name: string };
}) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations();
    const character = await getCharacterBySlug(name, locale);

    if (!character) {
        return (
            <section className={'space-y-4 text-center m-auto'}>
                <Frown className={'mx-auto size-44 xs:size-28'} />
                <h1 className={'text-5xl xs:text-3xl'}>{t('main.character-not-found')}</h1>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'max-xs:p-8 max-xs:text-2xl max-xs:rounded-xl',
                        })
                    )}
                    href={'/characters'}
                >
                    {t('main.back-to-characters-list')}
                </Link>
            </section>
        );
    }

    const tabs = {
        main: t('main.main-information'),
        talents: t('main.talents'),
        constellations: t('main.constellations'),
        build: t('main.build'),
    };

    const characteristicData = [
        {
            title: t('main.weapon-type'),
            icon: (
                <Image
                    src={`weapons/icons/${character.weaponType}.webp`}
                    alt={t(`weapon-types.${character.weaponType}`)}
                    width={80}
                    height={80}
                    className={'size-20 mx-auto xl:size-12'}
                />
            ),
            stat: t(`weapon-types.${character.weaponType}`),
            className: '',
        },
        {
            title: t('main.base-attack'),
            icon: <Swords className={'size-20 mx-auto xl:size-12'} />,
            stat: character.baseAttack,
            className: '',
        },
        {
            title: t('main.base-hp'),
            stat: character.baseHp,
            icon: <Cross className={'size-20 mx-auto xl:size-12'} />,
            className: '',
        },
        {
            title: t('main.appearance-version'),
            icon: character.appearanceVersion.version,
            stat: character.appearanceVersion.date.toLocaleDateString(),
            className: 'p-4 size-fit mx-auto border-2 border-black rounded-xl xl:p-2 xl:border-4',
        },
        {
            title: t('main.standard'),
            icon: character.inStandardWish ? t('main.yes') : t('main.no'),
            stat: character.inStandardWish ? (
                <Check className={'size-12 xl:size-6'} />
            ) : (
                <X className={'size-12 xl:size-6'} />
            ),
            className: `p-4 size-fit mx-auto text-white rounded-xl ${
                character.inStandardWish ? 'bg-green-500' : 'bg-red-500'
            } xl:p-3`,
        },
    ];

    const materialData = [
        {
            name: character.boss.name,
            icon: (
                <div className={'flex justify-center items-center gap-2'}>
                    <Image
                        src={`common/bosses/profiles/${character.boss.name}.webp`}
                        alt={character.boss.name}
                        width={90}
                        height={90}
                        className={'size-28 rounded-full xl:size-16'}
                    />
                    <ArrowRight className={'size-16 xl:size-8'} />
                    <Image
                        src={`common/bosses/drop/${character.boss.drop.name}.webp`}
                        alt={character.boss.drop.name}
                        width={90}
                        height={90}
                        className={'size-28 xl:size-16'}
                    />
                </div>
            ),
        },
        {
            name: character.talentMaterial.name,
            icon: (
                <Image
                    src={`common/materials/books/${character.talentMaterial.name}.webp`}
                    alt={character.talentMaterial.name}
                    width={90}
                    height={90}
                    className={'size-32 mx-auto xl:size-16'}
                />
            ),
        },
        {
            name: character.localSpecialty.name,
            icon: (
                <Image
                    src={`common/materials/local-specialities/${character.localSpecialty.name}.webp`}
                    alt={character.localSpecialty.name}
                    width={90}
                    height={90}
                    className={'size-32 mx-auto xl:size-16'}
                />
            ),
        },
        {
            name: character.enhancementMaterial.name,
            icon: (
                <Image
                    src={`common/materials/enhancement-materials/${character.enhancementMaterial.name}.webp`}
                    alt={character.enhancementMaterial.name}
                    width={90}
                    height={90}
                    className={'size-32 mx-auto xl:size-16'}
                />
            ),
        },
    ];

    return (
        <section
            style={
                {
                    '--element-color': elementToColor[character.element],
                } as CSSProperties
            }
            className={
                'overflow-y-auto event-scrollbar flex flex-col gap-2 px-4 pt-8 max-xs:h-3/4 xs:pt-4 max-xl:items-center xl:flex-1'
            }
        >
            <div className={'flex gap-4 text-5xl xs:text-3xl'}>
                <BackButton className={'h-1/2'} />
                <Image
                    src={`common/elements/${character.element}.svg`}
                    alt={t(`elements.${character.element}`)}
                    width={75}
                    height={75}
                    className={'-mr-4 -mt-4 saturate-200 size-20'}
                />
                <div>
                    <h1>{character.name}</h1>
                    <h2 className={'text-gray-400 text-xl xs:text-lg'}>{character.title}</h2>
                    <RarityStars rare={character.rare} />
                </div>
            </div>
            <Image
                src={`characters/splash-arts/${getCharacterAsset(character.slug)}.webp`}
                alt={character.name}
                width={2048}
                height={1024}
                className={
                    '-z-10 animate-banner-preview-appearance object-contain object-right-bottom max-xs:max-w-none max-xs:w-[150%] xl:absolute xl:left-[40%] xl:size-full'
                }
            />
            <Tabs defaultValue={'main'} className={'flex-1 xl:w-[65%]'}>
                <TabsList
                    className={
                        'grid w-full h-min gap-2 grid-cols-2 bg-gray-200 max-xl:grid-rows-2 xl:grid-cols-4'
                    }
                >
                    {Object.entries(tabs).map(([value, label]) => (
                        <TabsTrigger key={value} className={'max-xl:text-2xl'} value={value}>
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={'main'} className={'h-[calc(100%-2.25rem-(0.375rem*4))] space-y-1.5'}>
                    <InformationCard
                        title={t('main.description')}
                        icon={<ScrollText />}
                        contentClasses={'text-center italic max-xl:text-2xl'}
                        content={character.description}
                    />
                    <InformationCard
                        title={t('main.characteristics')}
                        icon={<Zap />}
                        contentClasses={'flex flex-wrap gap-2 max-xl:text-2xl'}
                        content={characteristicData.map((characteristic) => (
                            <CharacteristicCard
                                key={characteristic.title}
                                title={characteristic.title}
                                icon={characteristic.icon}
                                stat={characteristic.stat}
                                className={characteristic.className}
                            />
                        ))}
                        footerContent={t('main.characteristics-warning')}
                    />
                    <InformationCard
                        title={t('main.materials')}
                        icon={<Leaf />}
                        contentClasses={'flex flex-wrap truncate justify-between gap-2 max-xl:text-2xl'}
                        content={materialData.map((material) => (
                            <MaterialCard
                                key={material.name}
                                title={material.name}
                                icon={material.icon}
                                width={'w-[calc(50%-0.5rem)]'}
                            />
                        ))}
                    />
                </TabsContent>
                <TabsContent value={'talents'} className={'h-[calc(100%-2.75rem)] space-y-1.5'}>
                    <h3
                        className={
                            'flex items-center justify-center text-center gap-2 bg-card shadow rounded-lg text-destructive py-2 max-xl:flex-col max-xl:text-2xl'
                        }
                    >
                        <Info className={'h-full w-auto'} /> {t('main.talent-more-info')}
                    </h3>
                    {character.talents.map((talent) => (
                        <TalentModal
                            key={talent.title}
                            talent={talent}
                            element={character.element}
                            weaponType={character.weaponType}
                            characterName={character.name}
                        />
                    ))}
                </TabsContent>
                <TabsContent value={'constellations'} className={'h-[calc(100%-3rem)] space-y-1.5'}>
                    <div className={'flex gap-2 h-full max-xl:flex-col-reverse'}>
                        <div className={'flex flex-wrap gap-1 xl:w-3/5'}>
                            {character.constellations
                                .sort((c1, c2) => c1.level - c2.level)
                                .map((constellation) => (
                                    <ConstellationModal
                                        key={constellation.title}
                                        constellation={constellation}
                                        element={character.element}
                                        characterName={character.name}
                                    />
                                ))}
                        </div>
                        <div
                            className={
                                'flex flex-col items-center justify-center bg-card shadow rounded-xl xl:w-2/5'
                            }
                        >
                            <Image
                                src={`characters/constellations/${character.constellation}.webp`}
                                alt={t(`characters.${character.name}.constellation`)}
                                width={512}
                                height={512}
                                className={'w-1/2 drop-shadow-[0_1px_1px_#000000] saturate-200 xl:w-full'}
                            />
                            <h3
                                className={
                                    'flex items-center justify-center text-center gap-2 max-xl:text-2xl'
                                }
                            >
                                <Sparkle className={'size-12 xl:size-6'} /> {t('main.constellation')}:{' '}
                                {t(`characters.${character.name}.constellation`)}
                                <Sparkle className={'size-12 xl:size-6'} />
                            </h3>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value={'build'} className={'h-[calc(100%-3.75rem)] space-y-1.5'}>
                    <InformationCard
                        title={t('main.weapons-top')}
                        icon={<Swords className={'h-full w-auto'} />}
                        contentClasses={'flex flex-wrap gap-2'}
                        content={character.weapons
                            .sort((w1, w2) => w1.rating - w2.rating)
                            .map((ratingWeapon) => {
                                const weapon = ratingWeapon.weapon;
                                return (
                                    <Link
                                        key={weapon.title}
                                        href={`/weapons/${weapon.slug}`}
                                        className={
                                            'max-xl:w-[32%] xl:flex-1 h-36 rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
                                        }
                                    >
                                        <div className={'relative w-full h-3/4'}>
                                            <p
                                                className={
                                                    'z-10 absolute top-2 left-2 px-2 rounded-full border-2 border-white text-white'
                                                }
                                            >
                                                {ratingWeapon.rating}
                                            </p>
                                            <Image
                                                src={`common/items-backgrounds-by-rarity/background-item-${weapon.rare}-star.webp`}
                                                alt={weapon.rare}
                                                fill
                                                className={'object-cover'}
                                            />
                                            <Image
                                                src={`weapons/portraits/${weapon.title}.webp`}
                                                alt={t(`weapons.${weapon.title}.title`)}
                                                fill
                                                className={'object-contain'}
                                            />
                                        </div>
                                        <p
                                            className={
                                                'h-1/4 flex justify-center items-center text-center text-xl xl:text-sm'
                                            }
                                        >
                                            {t(`weapons.${weapon.title}.title`)}
                                        </p>
                                    </Link>
                                );
                            })}
                    />
                    <InformationCard
                        title={t('main.artifacts-top')}
                        icon={<Crown className={'h-full w-auto'} />}
                        contentClasses={'flex gap-2'}
                        content={character.artifacts
                            .sort((a1, a2) => a1.rating - a2.rating)
                            .map((ratingArtifact) => (
                                <ArtifactCard
                                    key={
                                        ratingArtifact.firstArtifactSet.title +
                                        ' ' +
                                        ratingArtifact.secondArtifactSet.title
                                    }
                                    firstArtifactSet={ratingArtifact.firstArtifactSet}
                                    secondArtifactSet={ratingArtifact.secondArtifactSet}
                                    rating={ratingArtifact.rating}
                                />
                            ))}
                        footerContent={t('main.artifact-warning')}
                    />
                    <InformationCard
                        title={t('main.talent-order')}
                        icon={<ChevronsUp className={'h-full w-auto'} />}
                        contentClasses={'flex justify-around items-center'}
                        content={character.talents
                            .filter((talent) => talent.priority !== null)
                            .sort((t1, t2) => Number(t1.priority) - Number(t2.priority))
                            .map((talent, index) => (
                                <Fragment key={talent.title}>
                                    <div className={'relative max-xl:text-xl'}>
                                        <p
                                            className={
                                                'absolute top-2 -left-2 px-2 rounded-full border-2 border-black'
                                            }
                                        >
                                            {talent.priority}
                                        </p>
                                        <Image
                                            key={talent.title}
                                            src={`characters/talents/${
                                                talent.type === 'Normal Attack'
                                                    ? character.weaponType + ' ' + character.element
                                                    : talent.title
                                            }.webp`}
                                            alt={t(
                                                `characters.${character.name}.talents.${talent.title}.title`
                                            )}
                                            width={80}
                                            height={80}
                                            className={'size-28 mx-auto xl:size-14'}
                                        />
                                        <p>{t(`talent-types.${talent.type}`)}</p>
                                    </div>
                                    {index !== 2 && <ArrowRight className={'size-12'} />}
                                </Fragment>
                            ))}
                    />
                </TabsContent>
            </Tabs>
        </section>
    );
}
