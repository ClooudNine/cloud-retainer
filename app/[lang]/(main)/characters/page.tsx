import CharactersList from '@/components/characters/characters-list';
import { getAllCharacters } from '@/data/character';
import BackButton from '@/components/main/back-button';
import CharacterIcon from '@/components/icons/character';
import Image from 'next/image';

export const metadata = {
    title: 'Cloud Retainer | Персонажи',
    description: `Список всех игровых персонажей Genshin Impact. 
    Здесь представлена подробная информация о них: описание, базовые характеристики, 
    сборки, созвездия, таланты. Доступен фильтр по стихиям и типу оружия.`,
};

export default async function Characters() {
    const allCharacters = await getAllCharacters();

    if (!allCharacters) return <p>Characters fetch error!</p>;

    return (
        <section className={'flex-1 flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton className={''} />
                <CharacterIcon className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>Список персонажей</h1>
                <Image
                    src={'common/xianyun-namecard.webp'}
                    alt={'Xianyun namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <CharactersList characters={allCharacters} />
        </section>
    );
}
