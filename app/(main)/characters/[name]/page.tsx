import { getCharacterByName } from '@/data/character';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export default async function CharacterPage({ params }: { params: { name: string } }) {
    const { name } = params;
    const correctName = name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const character = await getCharacterByName(correctName);

    if (!character) {
        return <p>Not found character!</p>;
    }

    return (
        <section className={'flex-1'}>
            <Image
                src={`characters/splash-arts/${character.name}.webp`}
                alt={character.name}
                fill
                className={'object-contain ml-[40%]'}
            />
            <h1 className={'flex items-center text-3xl'}>
                <div className={'size-16'}></div>
                <Image
                    src={`common/elements/${character.element}.svg`}
                    alt={character.element}
                    width={80}
                    height={80}
                />
                {character.name}
            </h1>
        </section>
    );
}
