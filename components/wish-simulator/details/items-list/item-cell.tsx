import Image from 'next/image';
import { BannerTypes, Character, Weapon } from '@/lib/types';

const ItemCell = ({
    item,
    mainItems,
    bannerType,
}: {
    item: Character | Weapon;
    mainItems?: Character[] | Weapon[];
    bannerType: BannerTypes;
}) => {
    return (
        <>
            <td className={'border border-[#dac69f] p-4'}>
                {'name' in item ? 'Персонаж' : 'Оружие'}
            </td>
            <td className={'relative border border-[#dac69f] p-4'}>
                {'name' in item ? item.name : item.title}
                {mainItems?.some((mainItem) => {
                    const isTypeCheck =
                        bannerType !== 'Weapon Event Wish'
                            ? 'name' in item
                            : 'type' in item;
                    return item.id === mainItem.id && isTypeCheck;
                }) && (
                    <Image
                        src={'wish-simulator/assets/up-icon.webp'}
                        width={20}
                        height={20}
                        alt={'Up!'}
                        draggable={false}
                        className={'absolute w-6 top-0.5 right-0.5 xs:top-2 xs:right-2'}
                    />
                )}
            </td>
        </>
    );
};

export default ItemCell;
