import Image from 'next/image';
import star from '@/public/common/star.webp';
import { Character, Weapon } from '@/lib/db/schema';

const getItemPortrait = (item: Character | Weapon) => {
    if ('name' in item) {
        return `/characters/profiles/${item.name}.webp`;
    } else {
        return `/weapons/portraits/${item.title}.webp`;
    }
};
const ItemCard = ({ item }: { item: Character | Weapon }) => {
    return (
        <div
            className={
                'relative h-[120px] w-[100px] bg-white drop-shadow rounded-md md:w-[15%] md:h-4/5'
            }
        >
            <div
                className={
                    'relative h-4/5 rounded-md rounded-br-2xl overflow-hidden md:rounded-br-3xl'
                }
            >
                <Image
                    src={`/common/items-backgrounds-by-rarity/background-item-${item.rare}-star.webp`}
                    alt={`Фон предмета ${
                        item.rare === '5' ? 'пятизвёздочной' : 'четырёхзвёздочной'
                    } редкости`}
                    fill
                />
                {'name' in item ? (
                    <Image
                        src={`/common/elements/${item.element}.svg`}
                        alt={item.element}
                        width={30}
                        height={30}
                        className={'z-10 absolute w-[30%] top-1 left-1'}
                    />
                ) : (
                    <div
                        className={
                            'absolute w-1/5 text-[3vw] text-center rounded top-1 left-1 bg-[rgba(0,0,0,0.4)] text-[#cfcfcf] md:text-[1vw]'
                        }
                    >
                        1
                    </div>
                )}
                <Image
                    src={getItemPortrait(item)}
                    alt={`Портрет ${
                        'name' in item ? `персонажа ${item.name}` : `оружия ${item.title}`
                    }`}
                    width={130}
                    height={130}
                    quality={100}
                    className={'absolute w-full h-auto bottom-0'}
                />
            </div>
            <div className={'absolute w-full flex justify-center bottom-[15%]'}>
                {Array.from(Array(Number(item.rare)).keys()).map((number) => (
                    <Image
                        key={number}
                        src={star}
                        alt={'Звезда'}
                        quality={100}
                        className={'w-[17%] h-auto drop-shadow'}
                    />
                ))}
            </div>
            <p
                className={
                    'w-full absolute bottom-0 text-[3vw] text-center text-[#495366] md:text-[1vw]'
                }
            >
                Ур. 1
            </p>
        </div>
    );
};

export default ItemCard;
