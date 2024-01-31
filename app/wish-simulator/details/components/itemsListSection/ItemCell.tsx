import Image from 'next/image';
import up from '@/public/wish-simulator/assets/up-icon.webp';
import { BannerTypes, Character, Weapon } from '@/lib/db/schema';

const ItemCell = ({
    item,
    mainItems,
    bannerType,
}: {
    item: Character | Weapon;
    mainItems?: Character[] | Weapon[] | null;
    bannerType: BannerTypes;
}) => {
    return (
        <>
            <td className={'border border-[#dac69f] p-[2cqw]'}>
                {'name' in item ? 'Персонаж' : 'Оружие'}
            </td>
            <td className={'relative border border-[#dac69f] p-[2cqw]'}>
                {'name' in item ? item.name : item.title}
                {mainItems?.some((mainItem) => {
                    const isTypeCheck =
                        bannerType !== 'Weapon Event Wish'
                            ? 'name' in item
                            : 'type' in item;
                    return item.id === mainItem.id && isTypeCheck;
                }) && (
                    <Image
                        src={up}
                        alt={'Up!'}
                        quality={100}
                        draggable={false}
                        className={
                            'absolute w-[15%] top-0.5 right-0.5 sm:w-[9%] sm:top-2 sm:right-2'
                        }
                    />
                )}
            </td>
        </>
    );
};

export default ItemCell;
