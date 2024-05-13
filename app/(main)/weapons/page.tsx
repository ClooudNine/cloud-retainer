import BackButton from '@/components/main/back-button';
import Image from 'next/image';
import { getAllWeapons } from '@/data/weapon';
import WeaponList from '@/components/weapons/weapon-list';
import { Swords } from 'lucide-react';

export default async function Weapons() {
    const allWeapons = await getAllWeapons();

    if (allWeapons === null) {
        return <p>Characters fetch error!</p>;
    }

    return (
        <section className={'flex-1 px-4 pt-4 space-y-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton />
                <Swords />
                <h1 className={'-ml-2 text-3xl'}>Список оружия</h1>
                <Image
                    src={'common/raiden-shogun-namecard.webp'}
                    alt={'Raiden Shogun namecard'}
                    width={500}
                    height={300}
                    className={'absolute right-0'}
                />
            </div>
            <WeaponList weapons={allWeapons} />
        </section>
    );
}
