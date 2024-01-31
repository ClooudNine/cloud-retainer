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
                'bg-white drop-shadow rounded-md w-[45%] h-[20cqw] sm:w-[8cqw] sm:h-full'
            }
        >
            <div
                className={
                    'relative h-4/5 rounded-t-md rounded-br-[3cqw] overflow-hidden'
                }
            >
                <Image
                    src={`/common/items-backgrounds-by-rarity/background-item-${item.rare}-star.webp`}
                    alt={`Фон предмета ${
                        item.rare === '5' ? 'пятизвёздочной' : 'четырёхзвёздочной'
                    } редкости`}
                    fill
                    quality={100}
                    draggable={false}
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
                            'z-10 absolute size-1/4 text-[2cqw] text-center leading-[1.8] rounded top-0.5 left-0.5 bg-black bg-opacity-40 text-[#cfcfcf] sm:text-[1cqw]'
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
                    draggable={false}
                    className={'absolute bottom-0'}
                />
            </div>
            <div className={'absolute flex justify-center bottom-[15%]'}>
                {Array.from(Array(Number(item.rare)).keys()).map((number) => (
                    <Image
                        key={number}
                        src={star}
                        alt={'Звезда'}
                        quality={100}
                        draggable={false}
                        className={'w-[17%] drop-shadow'}
                    />
                ))}
            </div>
            <p
                className={
                    'w-full absolute bottom-0 text-center text-[2.5cqw] text-[#495366] sm:text-[1.2cqw]'
                }
            >
                Ур. 1
            </p>
        </div>
    );
};

export default ItemCard;
