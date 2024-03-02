import CharactersList from '@/components/characters/characters-list';
import { getAllCharacters } from '@/data/character';

export const dynamic = 'force-dynamic';
export default async function Characters() {
    const allCharacters = await getAllCharacters();
    return (
        <section
            className={'w-full h-full flex-1 overflow-y-scroll genshin-scrollbar px-4'}
        >
            <h1 className={'w-full text-white mt-2 py-2 text-center bg-black rounded-xl'}>
                Список персонажей
            </h1>
            <CharactersList characters={allCharacters} />
        </section>
    );
}
