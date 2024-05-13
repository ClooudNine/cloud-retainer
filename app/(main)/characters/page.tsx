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

    if (allCharacters === null) {
        return <p>Characters fetch error!</p>;
    }

    return (
        <section className={'h-[75%] flex flex-col gap-4 px-4 pt-10 sm:pt-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton />
                <CharacterIcon className={''} />
                <h1 className={'-ml-2 text-3xl'}>Список персонажей</h1>
                <Image
                    src={'common/xianyun-namecard.webp'}
                    alt={'Xianyun namecard'}
                    width={500}
                    height={300}
                    className={'-z-10 absolute h-full w-auto right-0'}
                />
            </div>
            <CharactersList characters={allCharacters} />
        </section>
    );
}
