import BackButton from '@/components/main/back-button';
import Image from 'next/image';
import { getAllWeapons } from '@/data/weapon';
import WeaponList from '@/components/weapons/weapon-list';
import { Swords } from 'lucide-react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.weapons' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function Weapons({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations();
    const allWeapons = await getAllWeapons();

    if (!allWeapons) return <p>Weapons fetch error!</p>;

    return (
        <section className={'flex-1 flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton className={''} />
                <Swords className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>{t('main.weapons-list')}</h1>
                <Image
                    src={'common/raiden-shogun-namecard.webp'}
                    alt={'Raiden Shogun namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <WeaponList weapons={allWeapons} />
        </section>
    );
}
