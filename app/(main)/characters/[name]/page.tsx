import { getAllCharacters, getCharacterByName } from '@/data/character';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import star from '@/public/common/star.webp';

export async function generateStaticParams() {
    const characters = await getAllCharacters();

    return characters.map((character) => ({
        name: character.name,
    }));
}
function capitalizeWords(sentence: string) {
    sentence = decodeURIComponent(sentence);
    let words = sentence.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
}

export default async function CharacterPage({ params }: { params: { name: string } }) {
    const { name } = params;
    const character = await getCharacterByName(capitalizeWords(name));

    if (!character) {
        return <p>Not found character!</p>;
    }

    return (
        <section className={'flex-1 flex justify-center items-center'}>
            <Card className={'w-fit h-fit mx-auto'}>
                <CardHeader>
                    <CardTitle>{character.name}</CardTitle>
                    <CardDescription>{character.title}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={`/characters/splash-arts/${character.name}.webp`}
                        alt={character.name}
                        width={800}
                        height={600}
                        quality={100}
                        className={'w-full object-contain'}
                    />
                    <div className={'flex items-center gap-2'}>
                        Редкость:
                        {Array.from(Array(Number(character.rare)).keys()).map(
                            (number) => (
                                <Image
                                    key={number}
                                    src={star}
                                    alt={'Звезда'}
                                    draggable={false}
                                    quality={100}
                                    className={'h-4/5 w-auto drop-shadow'}
                                />
                            )
                        )}
                    </div>
                    <div className={'flex items-center gap-2'}>
                        Стихия: {character.element}
                        <Image
                            src={`/common/elements/${character.element}.svg`}
                            alt={character.element}
                            width={40}
                            height={40}
                            quality={100}
                        />
                    </div>
                    <div className={'flex items-center gap-2'}>
                        Тип оружия: {character.weaponType}
                        <Image
                            src={`/weapons/icons/${character.weaponType}.webp`}
                            alt={character.weaponType}
                            width={40}
                            height={40}
                            quality={100}
                        />
                    </div>
                    <p>Версия появления: {character.appearanceVersion}</p>
                    <div className={'flex items-center gap-2'}>
                        В стандартном наборе?{' '}
                        <div
                            className={`rounded-xl text-white py-1 px-2 ${
                                character.inStandardWish ? 'bg-emerald-400' : 'bg-red-400'
                            }`}
                        >
                            {character.inStandardWish ? 'Да' : 'Нет'}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>
                        <Link href={'/characters'}>К списку персонажей</Link>
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}
