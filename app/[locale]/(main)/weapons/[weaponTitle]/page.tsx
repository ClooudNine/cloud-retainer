import { Metadata } from 'next';
import { ChevronsUp, Frown, Leaf, ScrollText, Swords } from 'lucide-react';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { getWeaponBySlug } from '@/data/weapon';
import Image from 'next/image';
import BackButton from '@/components/main/back-button';
import { cn } from '@/lib/utils';
import { getCharacterAsset } from '@/lib/character';
import RarityStars from '@/components/main/rarity-stars';
import InformationCard from '@/components/characters/information-card';
import MaterialCard from '@/components/characters/material-card';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
    params: { locale, weaponTitle },
}: {
    params: { locale: string; weaponTitle: string };
}): Promise<Metadata> {
    const t = await getTranslations({ locale });
    const weapon = await getWeaponBySlug(weaponTitle);

    const title = weapon
        ? t('metadata.weapon-page.title', { title: t(`weapons.${weapon.title}.title`) })
        : t('metadata.weapon-page.error-title');

    const description = weapon
        ? t('metadata.weapon-page.description', { title: t(`characters.${weapon.title}.title`) })
        : t('metadata.weapon-page.error-description');

    return { title, description };
}

export default async function WeaponPage({
    params: { locale, weaponTitle },
}: {
    params: { locale: string; weaponTitle: string };
}) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations();
    console.log(weaponTitle);
    const weapon = await getWeaponBySlug(weaponTitle);

    if (!weapon) {
        return (
            <section className={'space-y-4 text-center m-auto'}>
                <Frown className={'mx-auto size-44 xs:size-28'} />
                <h1 className={'text-5xl xs:text-3xl'}>{t('main.weapon-not-found')}</h1>
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
                    {t('main.back-to-weapons-list')}
                </Link>
            </section>
        );
    }

    return (
        <section
            className={
                'w-full overflow-y-auto event-scrollbar flex flex-col gap-2 px-4 pt-8 max-xs:h-3/4 xs:pt-4 max-xl:items-center xl:flex-1'
            }
        >
            <div className={'flex gap-4 text-5xl xs:text-3xl'}>
                <BackButton className={'h-1/2'} />
                <Image
                    src={`weapons/icons/${weapon.type}.webp`}
                    alt={t(`weapon-types.${weapon.type}`)}
                    width={75}
                    height={75}
                    className={'-mr-4 -mt-4 saturate-200 size-20'}
                />
                <div>
                    <h1>{t(`weapons.${weapon.title}.title`)}</h1>
                    <h2 className={'text-gray-400 text-xl xs:text-lg'}>{t(`weapon-types.${weapon.type}`)}</h2>
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
                    alt={t(`weapon-types.${weapon.type}`)}
                    fill
                    className={'object-contain'}
                />
                <Image
                    src={`weapons/splash-arts/${weapon.title}.webp`}
                    alt={t(`weapons.${weapon.title}.title`)}
                    fill
                    className={'object-contain'}
                />
            </div>
            <InformationCard
                cardClasses={'w-full xl:w-[70%]'}
                title={t('main.ability-description')}
                icon={<ScrollText className={'h-full w-auto'} />}
                contentClasses={'text-center italic max-xl:text-2xl'}
                content={t(`weapons.${weapon.title}.ability`)}
            />
            <InformationCard
                cardClasses={'w-full xl:w-[70%]'}
                title={t('main.suitable-characters')}
                icon={<ChevronsUp className={'h-full w-auto'} />}
                contentClasses={'h-fit flex flex-wrap gap-2'}
                content={weapon.characters.map((character) => {
                    const currentCharacter = character.character;
                    return (
                        <Link
                            key={currentCharacter.name}
                            href={`/characters/${currentCharacter.slug}`}
                            className={
                                'h-44 rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5 max-xs:w-[32%] xs:flex-1'
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
                                    alt={t(`characters.${currentCharacter.name}.name`)}
                                    fill
                                    className={'object-contain object-bottom'}
                                />
                            </div>
                            <div className={'h-1/4 flex items-center justify-center gap-1'}>
                                <Image
                                    src={`common/elements/${currentCharacter.element}.svg`}
                                    alt={t(`elements.${currentCharacter.element}`)}
                                    width={30}
                                    height={30}
                                    className={
                                        'size-10 contrast-200 drop-shadow-[0_1px_5px_#000000] xl:size-6'
                                    }
                                />
                                <p className={'text-lg truncate xl:text-sm'}>
                                    {t(`characters.${currentCharacter.name}.name`)}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            />
            <InformationCard
                cardClasses={'w-full xl:w-[70%]'}
                title={t('main.materials')}
                icon={<Leaf className={'h-full w-auto'} />}
                contentClasses={'h-3/4 flex justify-between gap-2 max-xl:text-2xl'}
                content={
                    <>
                        <MaterialCard
                            title={t(`materials.${weapon.ascensionMaterial.name}`)}
                            icon={
                                <Image
                                    src={`common/materials/ascension-materials/${weapon.ascensionMaterial.name}.webp`}
                                    alt={t(`materials.${weapon.ascensionMaterial.name}`)}
                                    width={90}
                                    height={90}
                                    className={'mx-auto size-32 xl:size-16'}
                                />
                            }
                            width={'w-1/3'}
                        />
                        <MaterialCard
                            title={t(`materials.${weapon.firstEnhancementMaterial.name}`)}
                            icon={
                                <Image
                                    src={`common/materials/enhancement-materials/${weapon.firstEnhancementMaterial.name}.webp`}
                                    alt={t(`materials.${weapon.ascensionMaterial.name}`)}
                                    width={90}
                                    height={90}
                                    className={'mx-auto size-32 xl:size-16'}
                                />
                            }
                            width={'w-1/3'}
                        />
                        <MaterialCard
                            title={t(`materials.${weapon.secondEnhancementMaterial.name}`)}
                            icon={
                                <Image
                                    src={`common/materials/enhancement-materials/${weapon.secondEnhancementMaterial.name}.webp`}
                                    alt={t(`materials.${weapon.secondEnhancementMaterial.name}`)}
                                    width={90}
                                    height={90}
                                    className={'mx-auto size-32 xl:size-16'}
                                />
                            }
                            width={'w-1/3'}
                        />
                    </>
                }
            />
            <InformationCard
                cardClasses={'w-full xl:w-[70%]'}
                title={t('main.characteristics')}
                icon={<Swords className={'h-full w-auto'} />}
                contentClasses={'flex justify-between gap-4 text-center max-xl:text-2xl'}
                content={
                    <>
                        <div className={'flex-1 border bg-card shadow rounded-xl content-center py-4'}>
                            <h3 className={'text-2xl'}>{weapon.baseAttack}</h3>
                            {t('main.attack-power')}
                        </div>
                        <div className={'flex-1 border bg-card shadow rounded-xl content-center py-4'}>
                            <h3 className={'text-2xl'}>
                                {weapon.additionalCharacteristicStat}{' '}
                                {t(`additional-characteristics.${weapon.additionalCharacteristic}`)}%
                            </h3>
                            {t('main.additional-stat')}
                        </div>
                    </>
                }
            />
        </section>
    );
}
