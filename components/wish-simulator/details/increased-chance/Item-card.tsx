import Image from 'next/image';
import { getItemPortrait } from '@/lib/wish-simulator';
import { Character, Weapon } from '@/lib/types';

const ItemCard = ({ item }: { item: Character | Weapon }) => {
    return (
        <div className={'bg-white drop-shadow rounded-md w-[45%] h-32 xs:w-24 xs:h-full'}>
            <div className={'relative h-4/5 rounded-t-md rounded-br-3xl overflow-hidden'}>
                <Image
                    src={`common/items-backgrounds-by-rarity/background-item-${item.rare}-star.webp`}
                    alt={`Фон предмета редкости ${item.rare}`}
                    fill
                    draggable={false}
                />
                {'name' in item ? (
                    <Image
                        src={`common/elements/${item.element}.svg`}
                        alt={item.element}
                        width={30}
                        height={30}
                        className={'z-10 absolute w-6 top-0.5 left-0.5'}
                    />
                ) : (
                    <div
                        className={
                            'absolute size-6 text-base/normal text-center rounded top-0.5 left-0.5 bg-black/40 text-[#cfcfcf]'
                        }
                    >
                        1
                    </div>
                )}
                <Image
                    src={getItemPortrait(item)}
                    alt={'name' in item ? item.name : item.title}
                    width={130}
                    height={130}
                    draggable={false}
                    className={'absolute bottom-0 w-full'}
                />
            </div>
            <div className={'w-full absolute flex justify-center bottom-[15%]'}>
                {Array.from(Array(Number(item.rare)).keys()).map((number) => (
                    <Image
                        key={number}
                        src={'common/star.webp'}
                        width={40}
                        height={40}
                        alt={'Звезда'}
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
