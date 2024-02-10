import Image from 'next/image';
import star from '@/public/common/star.webp';
import ItemCell from '@/app/wish-simulator/details/components/itemsListSection/ItemCell';
import { BannerTypes, Character, Rares, Weapon } from '@/lib/db/schema';
import clsx from 'clsx';

const getBaseChances = (
    bannerType: BannerTypes
): Partial<{
    [key in Rares]: { baseChance: string; includingGuarantee: string };
}> => {
    if (bannerType !== 'Weapon Event Wish') {
        return {
            5: { baseChance: '0,600%', includingGuarantee: '1,600%' },
            4: { baseChance: '5,100%', includingGuarantee: '13,000%' },
            3: { baseChance: '94,300%', includingGuarantee: '85,400%' },
        };
    } else {
        return {
            5: { baseChance: '0,700%', includingGuarantee: '1,850%' },
            4: { baseChance: '6,000%', includingGuarantee: '14,500%' },
            3: { baseChance: '93,300%', includingGuarantee: '83,650%' },
        };
    }
};

const ItemsTable = ({
    rare,
    items,
    mainItems,
    bannerType,
}: {
    rare: Rares;
    items: (Character | Weapon)[];
    mainItems?: Character[] | Weapon[] | null;
    bannerType: BannerTypes;
}) => {
    const headerClasses = clsx('mt-2 flex justify-center items-center', {
        'bg-[#cfb383]': rare === '5',
        'bg-[#b6a8c9]': rare === '4',
        'bg-[#a9bcca]': rare === '3',
    });

    const innerHeaderClasses = clsx(
        'flex items-center py-1 pl-[5%] w-[99.5%] h-[90%] gap-1 border-2',
        {
            'border-[#c5a875]': rare === '5',
            'border-[#ae9fc3]': rare === '4',
            'border-[#9fb4c1]': rare === '3',
        }
    );

    const chances = getBaseChances(bannerType);

    return (
        <>
            <div className={headerClasses}>
                <div className={innerHeaderClasses}>
                    {Array.from(Array(Number(rare)).keys()).map((number) => (
                        <Image
                            key={number}
                            src={star}
                            alt={'Звезда'}
                            quality={100}
                            draggable={false}
                            className={'w-5 drop-shadow'}
                        />
                    ))}
                    <p className={'text-white text-base ml-4'}>
                        Базовый шанс получения предмета {rare}★:{' '}
                        {chances[rare]?.baseChance} (Включая гарантию:{' '}
                        {chances[rare]?.includingGuarantee})
                    </p>
                </div>
            </div>
            <table
                className={
                    'bg-[#ede1ca] text-[#595252] border border-[#dac69f] text-base/tight'
                }
            >
                <thead>
                    <tr>
                        <th className={'w-[15%] border border-[#dac69f] font-normal p-2'}>
                            Тип
                        </th>
                        <th className={'w-[35%] border border-[#dac69f] font-normal p-2'}>
                            Имя
                        </th>
                        <th className={'w-[15%] border border-[#dac69f] font-normal p-2'}>
                            Тип
                        </th>
                        <th className={'w-[35%] border border-[#dac69f] font-normal p-2'}>
                            Имя
                        </th>
                    </tr>
                </thead>
                <tbody className={'bg-[#f4f1ec] text-center'}>
                    {items.map((item, index) => {
                        const nextItem = items[index + 1];
                        if (index % 2 === 0) {
                            return (
                                <tr key={index}>
                                    <ItemCell
                                        item={item}
                                        mainItems={mainItems}
                                        bannerType={bannerType}
                                    />
                                    {nextItem && (
                                        <ItemCell
                                            item={nextItem}
                                            mainItems={mainItems}
                                            bannerType={bannerType}
                                        />
                                    )}
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ItemsTable;
