import CharactersList from '@/components/characters/characters-list';
import { getAllCharacters } from '@/data/character';
import BackButton from '@/components/main/back-button';
import CharacterIcon from '@/components/icons/character';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.characters' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function Characters({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations();
    const characters = await getAllCharacters(locale);

    if (!characters) return <p>{t('main.characters-error')}</p>;

    return (
        <section className={'flex-1 flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton />
                <CharacterIcon className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>{t('main.characters-list')}</h1>
                <Image
                    src={'common/xianyun-namecard.webp'}
                    alt={t('image-alts.xianyun-namecard')}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <CharactersList characters={characters} />
        </section>
    );
}
