import Image from 'next/image';
import star from '@/public/common/star.webp';
import { elementToColor } from '@/lib/common';
import { CSSProperties } from 'react';
import ItemCard from '@/app/wish-simulator/details/components/ItemCard';
import { BannerTypes, Character, Rares, Weapon } from '@/lib/db/schema';
import clsx from 'clsx';
const IncreasedChanceList = ({
    rare,
    bannerType,
    items,
}: {
    rare: Rares;
    bannerType: BannerTypes;
    items: Character[] | Weapon[] | null;
}) => {
    const headerClasses = clsx('h-[20px] flex justify-center items-center md:h-1/5', {
        'bg-[#cfb383]': rare === '5',
        'bg-[#b5a8c9]': rare !== '5',
    });

    const innerHeaderClasses = clsx(
        'w-[99.5%] h-[90%] flex items-center gap-1 pl-2 border-2 md:pl-8',
        {
            'border-[#c5a875]': rare === '5',
            'border-[#ac9dc1]': rare !== '5',
        }
    );

    return (
        <div className={'h-1/2'}>
            <div className={headerClasses}>
                <div className={innerHeaderClasses}>
                    {Array.from(Array(Number(rare)).keys()).map((number) => (
                        <Image
                            key={number}
                            src={star}
                            alt={'Звезда'}
                            draggable={false}
                            className={'h-[70%] w-auto drop-shadow'}
                        />
                    ))}
                    <p
                        className={
                            'whitespace-nowrap ml-auto mr-[55%] text-white text-[2.5vw] md:text-[1.1vw]'
                        }
                    >
                        Шанс получения {rare}★:&nbsp;
                        {bannerType === 'Weapon Event Wish' ? '75,000%' : '50,000%'}
                    </p>
                </div>
            </div>
            <div className={'flex justify-center items-center h-[80%] bg-[#f9f5ee]'}>
                <div
                    className={
                        'relative w-[99.5%] h-[99%] flex gap-6 md:gap-10 border border-[#e7e1d9]'
                    }
                >
                    <div
                        className={'pl-4 pt-2 w-1/2 md:pl-6 lg:pt-4 lg:pl-10 md:w-[30%]'}
                    >
                        {items?.map((item) => (
                            <p
                                key={item.title}
                                style={
                                    {
                                        '--item-color':
                                            'name' in item
                                                ? elementToColor[item.element]
                                                : item.rare === '5'
                                                  ? '193, 96, 40'
                                                  : '161,88,225',
                                    } as CSSProperties
                                }
                                className={
                                    'text-[rgb(var(--item-color))] text-[3vw] md:text-[1vw]'
                                }
                            >
                                {'name' in item ? item.name : item.title}
                            </p>
                        ))}
                    </div>
                    <div className={'flex flex-wrap items-center gap-4 w-3/4'}>
                        {items?.map((item) => <ItemCard key={item.title} item={item} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncreasedChanceList;
