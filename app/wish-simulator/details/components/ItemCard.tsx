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
        <div className={'bg-white drop-shadow rounded-md w-[45%] h-32 xs:w-24 xs:h-full'}>
            <div className={'relative h-4/5 rounded-t-md rounded-br-3xl overflow-hidden'}>
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
                        className={'z-10 absolute w-8 top-1 left-1'}
                    />
                ) : (
                    <div
                        className={
                            'z-10 absolute size-1/4 text-base/normal text-center rounded top-0.5 left-0.5 bg-black/40 text-[#cfcfcf]'
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
                    className={'absolute bottom-0 w-full'}
                />
            </div>
            <div className={'w-full absolute flex justify-center bottom-[15%]'}>
                {Array.from(Array(Number(item.rare)).keys()).map((number) => (
                    <Image
                        key={number}
                        src={star}
                        alt={'Звезда'}
                        quality={100}
                        draggable={false}
                        className={'w-4 drop-shadow'}
                    />
                ))}
            </div>
            <p className={'w-full absolute bottom-0 text-center text-sm text-[#495366]'}>
                Ур. 1
            </p>
        </div>
    );
};

export default ItemCard;
