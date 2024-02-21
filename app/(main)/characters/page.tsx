import { db } from '@/lib/db';
import { characters } from '@/lib/db/schema';
import CharactersList from '@/components/characters/characters-list';

export default async function Characters() {
    const allCharacters = await db.select().from(characters);
    return (
        <section
            className={'w-full h-full flex-1 overflow-y-scroll genshin-scrollbar px-4'}
        >
            <h1>Here characters!</h1>
            <CharactersList characters={allCharacters} />
        </section>
    );
}
