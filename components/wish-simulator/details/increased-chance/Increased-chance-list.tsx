import Image from 'next/image';
import { elementToColor } from '@/lib/constants';
import ItemCard from '@/components/wish-simulator/details/increased-chance/Item-card';
import clsx from 'clsx';
import { BannerTypes, Character, Rares, Weapon } from '@/lib/types';
import { useTranslations } from 'next-intl';

const IncreasedChanceList = ({
    rare,
    bannerType,
    items,
}: {
    rare: Rares;
    bannerType: BannerTypes;
    items: Character[] | Weapon[];
}) => {
    const t = useTranslations();

    const itemsListClasses = clsx('xs:h-1/2', {
        'h-[30%]': rare === '5',
        'h-[70%]': rare === '4',
    });

    const headerClasses = clsx('flex justify-center items-center h-10 xs:h-[16%]', {
        'bg-[#cfb383]': rare === '5',
        'bg-[#b5a8c9]': rare === '4',
    });

    const innerHeaderClasses = clsx('w-[99.5%] h-[90%] flex items-center gap-1 pl-12 border-2', {
        'border-[#c5a875]': rare === '5',
        'border-[#ac9dc1]': rare === '4',
    });

    return (
        <div className={itemsListClasses}>
            <div className={headerClasses}>
                <div className={innerHeaderClasses}>
                    {Array.from(Array(Number(rare)).keys()).map((number) => (
                        <Image
                            key={number}
                            src={'common/star.webp'}
                            width={40}
                            height={40}
                            alt={t('common.star')}
                            draggable={false}
                            className={'h-4/5 w-auto drop-shadow'}
                        />
                    ))}
                    <p className={'text-white ml-auto mr-1 text-base whitespace-nowrap xs:mr-[50%]'}>
                        {t('wish-simulator.getting-chance')} {rare}★:&nbsp;
                        {bannerType === 'Weapon Event Wish' ? '75,000%' : '50,000%'}
                    </p>
                </div>
            </div>
            <div className={'h-[85%] flex justify-center items-center bg-[#f9f5ee]'}>
                <div className={'relative w-[99.5%] h-[99%] flex gap-2 pl-12 py-4 border border-[#e7e1d9]'}>
                    <div className={'w-[55%] text-base xs:w-[30%] xs:text-sm'}>
                        {items.map((item) => (
                            <p
                                key={item.title}
                                style={{
                                    color: `rgb(${
                                        'name' in item
                                            ? elementToColor[item.element]
                                            : item.rare === '5'
                                              ? '193,96,40'
                                              : '161,88,225'
                                    })`,
                                }}
                                className={'whitespace-nowrap'}
                            >
                                {'name' in item ? item.name : item.title}
                            </p>
                        ))}
                    </div>
                    <div className={'w-1/2 h-fit flex max-xs:flex-wrap gap-3 xs:h-full xs:w-[70%]'}>
                        {items.map((item) => (
                            <ItemCard key={item.title} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncreasedChanceList;
